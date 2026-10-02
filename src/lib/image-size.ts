// Reads real pixel dimensions for an image in public/ at build time, so
// <img> tags can carry explicit width/height and avoid layout shift while
// loading — without this, the browser doesn't know the image's aspect
// ratio until the file itself starts arriving.
import { join } from 'node:path';
import sharp from 'sharp';

const publicDir = join(process.cwd(), 'public');

const dimensionCache = new Map<string, Promise<{ width: number; height: number }>>();

export function getPublicImageSize(publicPath: string): Promise<{ width: number; height: number }> {
  const cached = dimensionCache.get(publicPath);
  if (cached) return cached;

  const promise = (async () => {
    const filePath = join(publicDir, publicPath);
    const { width, height } = await sharp(filePath).metadata();
    if (!width || !height) throw new Error(`Could not read dimensions for ${publicPath}`);
    return { width, height };
  })();

  dimensionCache.set(publicPath, promise);
  return promise;
}

// The compressed sibling scripts/compress-images.mjs generates next to each
// source image in public/images/curated (same path, .webp extension).
export function toWebpPath(publicPath: string): string {
  return publicPath.replace(/\.(png|jpe?g)$/i, '.webp');
}
