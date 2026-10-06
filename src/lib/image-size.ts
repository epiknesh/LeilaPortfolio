// Reads real pixel dimensions for an image in public/ at build time, so
// <img> tags can carry explicit width/height and avoid layout shift while
// loading — without this, the browser doesn't know the image's aspect
// ratio until the file itself starts arriving.
import { join } from 'node:path';
import sharp from 'sharp';

const publicDir = join(process.cwd(), 'public');

const dimensionCache = new Map<string, Promise<{ width: number; height: number }>>();

// Falls back to a plausible default instead of throwing when an image is
// missing or unreadable — a single bad reference (an upload that failed
// partway, a file renamed/deleted after a project's data still points at
// the old name, a non-image file saved with an image extension) used to
// throw all the way up through Astro's build and fail the ENTIRE site, not
// just the one project with the bad reference. That's happened for real —
// see the build failures for alterkitektura-2024 ("unsupported image
// format") and ruin-and-reverie ("Input file is missing") once Sveltia CMS
// went live, both from an otherwise-unrelated project taking the whole
// deploy down with it. A warning in the build log plus a reasonable
// fallback (square-ish, will just letterbox/crop oddly, not crash) is a
// much safer failure mode for a site a non-developer is actively editing.
const FALLBACK_SIZE = { width: 1200, height: 900 };

export function getPublicImageSize(publicPath: string): Promise<{ width: number; height: number }> {
  const cached = dimensionCache.get(publicPath);
  if (cached) return cached;

  const promise = (async () => {
    const filePath = join(publicDir, publicPath);
    try {
      const { width, height } = await sharp(filePath).metadata();
      if (!width || !height) throw new Error('no dimensions in metadata');
      return { width, height };
    } catch (err) {
      console.warn(`[image-size] Could not read "${publicPath}" (${(err as Error).message}) — using fallback dimensions. Check this file exists and is a valid image.`);
      return FALLBACK_SIZE;
    }
  })();

  dimensionCache.set(publicPath, promise);
  return promise;
}

// The compressed sibling scripts/compress-images.mjs generates next to each
// source image in public/images/curated (same path, .webp extension).
export function toWebpPath(publicPath: string): string {
  return publicPath.replace(/\.(png|jpe?g)$/i, '.webp');
}
