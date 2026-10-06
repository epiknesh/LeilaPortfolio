// Runs before every build (see package.json "prebuild"). Astro's built-in
// image optimizer only works on images imported as src/ modules or fetched
// from a true external URL at build time — it does NOT process plain files
// sitting in public/, which is where project images live so the CMS can
// upload new ones without any code change. This script fills that gap by
// generating a compressed WebP sibling next to every source image; it's
// idempotent (skips images that already have an up-to-date .webp) so it
// stays fast on every deploy after the first, and new CMS uploads just get
// picked up and compressed automatically on their next deploy.
import { readdir, stat, mkdir } from 'node:fs/promises';
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
  let compressed = 0;
  let thumbsGenerated = 0;
  let skipped = 0;
  let failed = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const sourcePath of files) {
    const webpPath = sourcePath.replace(/\.(png|jpe?g)$/i, '.webp');
    const thumbPath = toThumbPath(webpPath);

    const needsFull = await needsCompression(sourcePath, webpPath);
    const needsThumb = await needsCompression(sourcePath, thumbPath);

    if (!needsFull && !needsThumb) {
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
      await mkdir(dirname(webpPath), { recursive: true });

      const metadata = await sharp(sourcePath).metadata();
      const before = (await stat(sourcePath)).size;

      if (needsFull) {
        const resizeWidth = metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;
        await sharp(sourcePath)
          .resize({ width: resizeWidth, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpPath);
        const after = (await stat(webpPath)).size;
        totalBefore += before;
        totalAfter += after;
        compressed++;
      }

      if (needsThumb) {
        const thumbResizeWidth = metadata.width && metadata.width > THUMB_WIDTH ? THUMB_WIDTH : undefined;
        await sharp(sourcePath)
          .resize({ width: thumbResizeWidth, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(thumbPath);
        thumbsGenerated++;
      }
    } catch (err) {
      failed++;
      console.warn(`[compress-images] SKIPPED (not a valid/readable image): ${sourcePath} — ${err.message}`);
    }
  }

  const savedPct = totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;
  console.log(
    `[compress-images] ${compressed} compressed, ${thumbsGenerated} thumbnails generated, ${skipped} already up to date` +
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
