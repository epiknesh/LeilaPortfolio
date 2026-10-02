// Generates a one-page "project sheet" PDF per case study — a clean, single-project
// leave-behind (title, hero image, metadata, description, palette) distinct from the
// full resume download. Requires the Astro dev server running at localhost:4321.
//
// Reads each project's data straight off the already-rendered live page (via DOM
// queries) rather than re-importing the TS data files from plain Node, which would
// need a TS loader we don't otherwise need as a dependency.
//
// Output: one PDF per project, written to E:\LeilaPortfolio-curated-assets\project-sheets\
// (same drive as the other generated/curated assets, for the same disk-space reason —
// see PROJECT_CONTEXT.md "Known Issues"), then junctioned into public/ alongside the
// existing curated-images junction so Astro can serve them for download links.

import { chromium } from 'playwright';
import fs from 'node:fs';

const SLUGS = [
  'myst-fragrance', 'myst-social-identity', 'myst-scent-launch', 'casa-colina',
  'alterkitektura-2024', 'gabriela-youth', 'strawberry-season', 'up-arki-2026',
  'balikbuhay-womens-center', 'kalyekultura', 'exploration-portraiture',
  'ruin-and-reverie', '3d-architectural-visualization',
];

const OUT_DIR = 'E:/LeilaPortfolio-curated-assets/project-sheets';
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

for (const slug of SLUGS) {
  await page.goto(`http://localhost:4321/work/${slug}/`, { waitUntil: 'networkidle' });

  const data = await page.evaluate(() => {
    const title = document.querySelector('.project-title')?.textContent?.trim() ?? '';
    const subtitle = document.querySelector('.project-subtitle')?.textContent?.trim() ?? '';
    const projectType = document.querySelector('.meta-grid > div:nth-child(1) p:not(.label)')?.textContent?.trim() ?? '';
    const industry = document.querySelector('.meta-grid > div:nth-child(2) p:not(.label)')?.textContent?.trim() ?? '';
    const deliverables = document.querySelector('.meta-grid > div:nth-child(3) p:not(.label)')?.textContent?.trim() ?? '';
    const description = Array.from(document.querySelectorAll('.description-copy > p:not(.process-text)'))
      .map((p) => p.textContent?.trim())
      .filter(Boolean);
    const heroImg = document.querySelector('.hero-image')?.getAttribute('src') ?? '';
    const swatches = Array.from(document.querySelectorAll('.swatch')).map((s) => ({
      hex: s.getAttribute('data-swatch') ?? '',
      name: s.querySelector('.swatch-name')?.textContent?.trim() ?? '',
    }));
    return { title, subtitle, projectType, industry, deliverables, description, heroImg, swatches };
  });

  const heroAbsUrl = data.heroImg ? new URL(data.heroImg, 'http://localhost:4321').href : '';

  const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    background: #EDE8E0;
    color: #211F1C;
    padding: 48px 56px;
  }
  .eyebrow {
    font-family: 'Courier New', monospace;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #5A564F;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #00000022;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 34px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.01em;
    margin: 0 0 4px 0;
  }
  .subtitle {
    font-style: italic;
    color: #5A564F;
    font-size: 13px;
    margin-bottom: 18px;
  }
  .meta-row {
    display: flex;
    gap: 32px;
    font-family: 'Courier New', monospace;
    font-size: 9px;
    border-top: 1px solid #00000022;
    border-bottom: 1px solid #00000022;
    padding-block: 10px;
    margin-bottom: 20px;
  }
  .meta-row .col { flex: 1; }
  .meta-row .label { text-transform: uppercase; letter-spacing: 0.1em; color: #5A564F; margin-bottom: 3px; }
  .hero { width: 100%; max-height: 320px; object-fit: contain; background: #E3DDD3; display: block; margin-bottom: 20px; border: 1px solid #00000022; }
  .description p { font-size: 11px; line-height: 1.6; margin: 0 0 10px 0; max-width: 64ch; }
  .palette { display: flex; gap: 10px; margin-top: 20px; }
  .swatch { width: 64px; }
  .chip { height: 40px; border: 1px solid #00000022; }
  .swatch .name { font-family: 'Courier New', monospace; font-size: 7px; margin-top: 4px; }
  .swatch .hex { font-family: 'Courier New', monospace; font-size: 7px; color: #5A564F; }
  .footer {
    position: absolute;
    bottom: 40px;
    left: 56px;
    right: 56px;
    font-family: 'Courier New', monospace;
    font-size: 8px;
    color: #5A564F;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #00000022;
    padding-top: 10px;
  }
</style></head>
<body>
  <div class="eyebrow">
    <span>leila karlene banta — project sheet</span>
    <span>graphic design portfolio</span>
  </div>
  <h1>${data.title}</h1>
  ${data.subtitle ? `<p class="subtitle">${data.subtitle}</p>` : ''}
  <div class="meta-row">
    <div class="col"><div class="label">Project Type</div><div>${data.projectType}</div></div>
    <div class="col"><div class="label">Industry</div><div>${data.industry}</div></div>
    <div class="col"><div class="label">Deliverables</div><div>${data.deliverables}</div></div>
  </div>
  ${heroAbsUrl ? `<img class="hero" src="${heroAbsUrl}" />` : ''}
  <div class="description">${data.description.map((p) => `<p>${p}</p>`).join('')}</div>
  <div class="palette">
    ${data.swatches.map((s) => `<div class="swatch"><div class="chip" style="background:${s.hex}"></div><div class="name">${s.name}</div><div class="hex">${s.hex}</div></div>`).join('')}
  </div>
  <div class="footer">
    <span>leila.banta@gmail.com &middot; +63 920 953 1002</span>
    <span>leilabanta.com</span>
  </div>
</body></html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPath = `${OUT_DIR}/${slug}.pdf`;
  await page.pdf({ path: outPath, format: 'A4', printBackground: true });
  console.log(`Generated ${outPath}`);
}

await browser.close();
console.log('done');
