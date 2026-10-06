// Runs before every build (see package.json "prebuild"). Astro's built-in
// image optimizer only works on images imported as src/ modules or fetched
// from a true external URL at build time — it does NOT process plain files
// sitting in public/, which is where project images live so the CMS can
// upload new ones without any code change. This script fills that gap by
// generating a compressed WebP sibling next to every source image; it's
// idempotent (skips images that already have an up-to-date .webp) so it
// stays fast on every deploy after the first, and new CMS uploads just get
// picked up and compressed automatically on their next deploy.
import { readdir, readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = join(process.cwd(), 'public', 'images', 'curated');
const SOURCE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
// Anything wider than this gets downscaled — none of this site's layouts
// (3-col grid, hero at max 72vh, lightbox) ever need more than this across
// any realistic display, including retina.
const MAX_WIDTH = 2000;
// Every image used to compress to ONLY this one 2000px size regardless of
// where it's displayed — a homepage grid tile or gallery thumbnail shown
// at maybe 400-600px on screen was still downloading and decoding the
// full 2000px version. A dedicated, much smaller thumbnail variant (at
// 2x for retina, since tiles are small) cuts that waste dramatically; the
// full 2000px .webp is kept as-is for the lightbox's actual zoomed view.
const THUMB_WIDTH = 640;
// 640px is too small for most of the places tiles are actually shown: a
// full-width gallery tile is ~1400 CSS px on a laptop, and cards are
// ~900-1100 device px on retina/phones. So EVERY image also gets a 1200px
// mid-size variant, and the page picks thumb / mid / full via srcset +
// sizes (see toTileSrcSet in src/lib/image-size.ts — keep widths in sync).
const MID_WIDTH = 1200;
// Project heroes span the full viewport, so they additionally get a
// 1600px variant (toHeroSrcSet) — only for images actually used as a
// project hero (read from the content files below). Variants are only
// written when the source is wider than the variant.
const HERO_EXTRA_WIDTHS = [1600];
const PROJECTS_DIR = join(process.cwd(), 'src', 'content', 'projects');
const PUBLIC_DIR = join(process.cwd(), 'public');

async function findHeroSources() {
  const heroes = new Set();
  let entries = [];
  try {
    entries = await readdir(PROJECTS_DIR);
  } catch {
    return heroes;
  }
  for (const name of entries) {
    if (!name.endsWith('.md')) continue;
    const raw = (await readFile(join(PROJECTS_DIR, name), 'utf8')).replace(/\r\n/g, '\n');
    const match = raw.match(/^hero:\s*["']?(.+?)["']?\s*$/m);
    if (match) heroes.add(join(PUBLIC_DIR, match[1]));
  }
  return heroes;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (SOURCE_EXTS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function needsCompression(sourcePath, outputPath) {
  try {
    const [sourceStat, outputStat] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return sourceStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true; // output doesn't exist yet
  }
}

function toThumbPath(webpPath) {
  return webpPath.replace(/\.webp$/, '-thumb.webp');
}

async function run() {
  const files = await walk(SOURCE_DIR);
  const heroSources = await findHeroSources();
  let compressed = 0;
  let thumbsGenerated = 0;
  let heroVariantsGenerated = 0;
  let skipped = 0;
  let failed = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const sourcePath of files) {
    const webpPath = sourcePath.replace(/\.(png|jpe?g)$/i, '.webp');
    const thumbPath = toThumbPath(webpPath);

    const needsFull = await needsCompression(sourcePath, webpPath);
    const needsThumb = await needsCompression(sourcePath, thumbPath);
    const heroVariantsNeeded = [];
    const variantWidths = heroSources.has(sourcePath) ? [MID_WIDTH, ...HERO_EXTRA_WIDTHS] : [MID_WIDTH];
    for (const w of variantWidths) {
      const variantPath = webpPath.replace(/\.webp$/, `-${w}.webp`);
      if (await needsCompression(sourcePath, variantPath)) heroVariantsNeeded.push({ w, variantPath });
    }

    if (!needsFull && !needsThumb && heroVariantsNeeded.length === 0) {
      skipped++;
      continue;
    }

    // One corrupt/truncated upload or non-image file saved with an image
    // extension used to throw out of this loop entirely and fail the
    // WHOLE site build over a single bad file among hundreds — this has
    // happened for real since Leila started uploading through the CMS.
    // Skip just that file (it'll fall through to the uncompressed
    // original, or getPublicImageSize's own fallback, rather than taking
    // the entire deploy down) and keep going.
    try {
      // Header-only read (cheap). A source narrower than a variant would
      // just yield a pointless upscaled duplicate of the full file, and the
      // page's srcset skips variants that don't exist — so those are dropped
      // here, and a file with nothing left to do is skipped without ever
      // being decoded (narrow sources otherwise re-qualified every build).
      const metadata = await sharp(sourcePath).metadata();
      const variants = heroVariantsNeeded.filter(({ w }) => metadata.width && metadata.width > w);
      if (!needsFull && !needsThumb && variants.length === 0) {
        skipped++;
        continue;
      }

      await mkdir(dirname(webpPath), { recursive: true });
      const before = (await stat(sourcePath)).size;

      // Decode the (often 4000px+, multi-MB) source ONCE, downscaled to the
      // 2000px ceiling, and derive every output from those raw pixels. Each
      // output used to re-decode the full original; every build on Vercel
      // starts with no generated files, so with 3-4 outputs per image that
      // redundant decoding roughly doubled the build time (~3.5min -> 6.5min).
      const { data, info } = await sharp(sourcePath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .raw()
        .toBuffer({ resolveWithObject: true });
      const derive = () => sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } });

      const jobs = [];
      if (needsFull) jobs.push(derive().webp({ quality: 82 }).toFile(webpPath));
      if (needsThumb) {
        jobs.push(derive().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(thumbPath));
      }
      for (const { w, variantPath } of variants) {
        jobs.push(derive().resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(variantPath));
      }
      await Promise.all(jobs);

      if (needsFull) {
        totalBefore += before;
        totalAfter += (await stat(webpPath)).size;
        compressed++;
      }
      if (needsThumb) thumbsGenerated++;
      heroVariantsGenerated += variants.length;
    } catch (err) {
      failed++;
      console.warn(`[compress-images] SKIPPED (not a valid/readable image): ${sourcePath} — ${err.message}`);
    }
  }

  const savedPct = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  console.log(
    `[compress-images] ${compressed} compressed, ${thumbsGenerated} thumbnails + ${heroVariantsGenerated} mid/hero variants generated, ${skipped} already up to date` +
      (failed > 0 ? `, ${failed} skipped (invalid)` : '') +
      (compressed > 0 ? ` (${(totalBefore / 1e6).toFixed(1)}MB -> ${(totalAfter / 1e6).toFixed(1)}MB, -${savedPct}%)` : '')
  );
}

run().catch((err) => {
  // A failure here means something broke outside the per-file try/catch
  // above (e.g. the source directory itself is missing) — a real,
  // unrecoverable problem, not a single bad upload, so still fail the
  // build in that case.
  console.error('[compress-images] failed:', err);
  process.exit(1);
});
