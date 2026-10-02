import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://leilabanta.com',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  image: {
    // Project images live as plain files in public/ (not src/-imported
    // modules) so the CMS can upload new ones without a code change —
    // Astro treats any string `src` passed to <Image>/getImage() as a
    // "remote" image regardless of whether it's actually local, so an
    // explicit allow-pattern is required before it will run them through
    // its (sharp-based) optimizer instead of passing the URL through as-is.
    remotePatterns: [{ pathname: '/images/curated/**' }],
  },
});
