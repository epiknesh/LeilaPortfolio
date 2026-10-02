import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://leilabanta.com',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  image: {
    // Allow local raster images from the assets pipeline to be optimized via Astro's built-in image service.
  },
});
