// Reads real pixel dimensions for an image in public/ at build time, so
// <img> tags can carry explicit width/height and avoid layout shift while
// loading — without this, the browser doesn't know the image's aspect
// ratio until the file itself starts arriving.
import { join } from 'node:path';
import sharp from 'sharp';

const publicDir = join(process.cwd(), 'public');

export type PublicImageInfo = { width: number; height: number; ok: boolean };

const dimensionCache = new Map<string, Promise<PublicImageInfo>>();

// A single bad reference (an upload that failed partway, a file renamed/
// deleted after a project's data still points at the old name, a non-image
// file saved with an image extension) used to throw all the way up through
// Astro's build and fail the ENTIRE site, not just the one project with
// the bad reference — confirmed for real via two live build failures
// (alterkitektura-2024: "unsupported image format"; ruin-and-reverie:
// "Input file is missing") once Sveltia CMS went live and Leila started
// uploading directly. `ok: false` lets each page decide how to show that
// visibly (a "missing image" placeholder) instead of either crashing the
// whole build or silently rendering nothing wrong at all — a non-developer
// actively editing content needs some signal on the page itself that an
// image reference broke, not just a build-log warning nobody will read.
const FALLBACK_SIZE = { width: 1200, height: 900 };

export function getPublicImageSize(publicPath: string): Promise<PublicImageInfo> {
  const cached = dimensionCache.get(publicPath);
  if (cached) return cached;

  const promise = (async () => {
    const filePath = join(publicDir, publicPath);
    try {
      const { width, height } = await sharp(filePath).metadata();
      if (!width || !height) throw new Error('no dimensions in metadata');
      return { width, height, ok: true };
    } catch (err) {
      console.warn(`[image-size] Could not read "${publicPath}" (${(err as Error).message}) — rendering a missing-image placeholder instead.`);
      return { ...FALLBACK_SIZE, ok: false };
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
