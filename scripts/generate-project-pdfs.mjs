// Generates a one-page "project sheet" PDF per project, read directly from
// each project's Markdown frontmatter + body — not scraped from a running
// dev server, so it's always in sync with whatever is actually published
// (previously this was a manually-run, one-off script that baked in
// whatever the live page looked like at the moment it was last run, and
// silently went stale as content changed through the CMS afterward).
// Runs as part of every build (see package.json "prebuild"), so a fresh
// set of PDFs ships with every deploy automatically.
import { readdirSync, readFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';
import yaml from 'js-yaml';

const PROJECTS_DIR = join(process.cwd(), 'src', 'content', 'projects');
const CATEGORIES_DIR = join(process.cwd(), 'src', 'content', 'categories');
const PUBLIC_DIR = join(process.cwd(), 'public');
const OUT_DIR = join(PUBLIC_DIR, 'project-sheets');

function readFrontmatter(filePath) {
  // CRLF line endings show up here depending on what last wrote the file
  // (git's core.autocrlf locally vs. Sveltia CMS's own saves) — normalize
  // before matching so this doesn't silently break on one or the other.
  const raw = readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`No frontmatter found in ${filePath}`);
  const data = yaml.load(match[1]) ?? {};
  const body = match[2].trim();
  return { data, body };
}

function loadProjects() {
  return readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const id = f.replace(/\.md$/, '');
      const { data, body } = readFrontmatter(join(PROJECTS_DIR, f));
      const description = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      return { id, ...data, description };
    });
}

function loadCategories() {
  const map = new Map();
  readdirSync(CATEGORIES_DIR)
    .filter((f) => f.endsWith('.md'))
    .forEach((f) => {
      const id = f.replace(/\.md$/, '');
      const { data } = readFrontmatter(join(CATEGORIES_DIR, f));
      map.set(id, data.title ?? id);
    });
  return map;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const MIME_TYPES = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

// Inlines a public-relative image (e.g. "/images/curated/foo.png") as a
// base64 data: URI rather than referencing it as a separate file:// or
// http:// resource. This isn't just a convenience — a page loaded via
// page.setContent() has no real origin, and Chromium's security model
// flatly refuses to load file:// resources into a page in that state
// ("Not allowed to load local resource", confirmed directly, not a path-
// construction bug) — there's no dev server running at build time to
// fall back to http:// either. Inlining as a data URI sidesteps the
// restriction entirely: the image bytes travel with the HTML itself, no
// separate resource load happens at all.
function resolvePublicAsset(publicRelativePath) {
  const cleanedPath = publicRelativePath.replace(/^\/+/, '');
  let diskPath = join(PUBLIC_DIR, cleanedPath);
  // Prefer the compressed .webp sibling that scripts/compress-images.mjs
  // generates (it runs earlier in the same prebuild chain, so it's always
  // present by now) — the raw source PNGs can be several MB each, which
  // would otherwise make a 10+-image project sheet balloon to 50+MB once
  // every image is inlined as base64.
  const webpPath = diskPath.replace(/\.(png|jpe?g)$/i, '.webp');
  if (webpPath !== diskPath && existsSync(webpPath)) diskPath = webpPath;

  const mime = MIME_TYPES[extname(diskPath).toLowerCase()] ?? 'application/octet-stream';
  const base64 = readFileSync(diskPath).toString('base64');
  return `data:${mime};base64,${base64}`;
}

function buildHtml(project, categoryTitles) {
  const heroAbsUrl = project.hero ? resolvePublicAsset(project.hero) : '';
  const galleryUrls = (project.gallery ?? []).map((g) => resolvePublicAsset(g.image));

  return `<!doctype html>
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
  .badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  .badge {
    font-family: 'Courier New', monospace;
    font-size: 8px;
    letter-spacing: 0.06em;
    text-transform: lowercase;
    padding: 4px 10px;
    border: 1px solid #00000022;
    border-radius: 2px;
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
  .palette { display: flex; gap: 10px; margin-top: 20px; margin-bottom: 20px; }
  .swatch { width: 64px; }
  .chip { height: 40px; border: 1px solid #00000022; }
  .swatch .name { font-family: 'Courier New', monospace; font-size: 7px; margin-top: 4px; }
  .swatch .hex { font-family: 'Courier New', monospace; font-size: 7px; color: #5A564F; }
  .gallery-label {
    font-family: 'Courier New', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #5A564F;
    border-top: 1px solid #00000022;
    padding-top: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .gallery img { width: 100%; height: 140px; object-fit: cover; border: 1px solid #00000022; display: block; }
  .footer {
    margin-top: 30px;
    padding-top: 10px;
    border-top: 1px solid #00000022;
    font-family: 'Courier New', monospace;
    font-size: 8px;
    color: #5A564F;
    display: flex;
    justify-content: space-between;
  }
</style></head>
<body>
  <div class="eyebrow">
    <span>leila karlene banta — project sheet</span>
    <span>graphic design portfolio</span>
  </div>
  <h1>${escapeHtml(project.title)}</h1>
  ${project.subtitle ? `<p class="subtitle">${escapeHtml(project.subtitle)}</p>` : ''}
  ${categoryTitles.length ? `<div class="badges">${categoryTitles.map((t) => `<span class="badge">${escapeHtml(t.toLowerCase())}</span>`).join('')}</div>` : ''}
  <div class="meta-row">
    <div class="col"><div class="label">Project Type</div><div>${escapeHtml(project.projectType)}</div></div>
    <div class="col"><div class="label">Industry</div><div>${escapeHtml(project.industry)}</div></div>
    <div class="col"><div class="label">Deliverables</div><div>${escapeHtml((project.deliverables ?? []).join(', '))}</div></div>
  </div>
  ${heroAbsUrl ? `<img class="hero" src="${heroAbsUrl}" />` : ''}
  <div class="description">${project.description.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</div>
  <div class="palette">
    ${(project.palette ?? []).map((s) => `<div class="swatch"><div class="chip" style="background:${s.hex}"></div><div class="name">${escapeHtml(s.name ?? '')}</div><div class="hex">${escapeHtml(s.hex)}</div></div>`).join('')}
  </div>
  ${galleryUrls.length ? `
  <div class="gallery-label">gallery</div>
  <div class="gallery">${galleryUrls.map((url) => `<img src="${url}" />`).join('')}</div>
  ` : ''}
  <div class="footer">
    <span>leila.banta@gmail.com &middot; +63 920 953 1002</span>
    <span>leilabanta.com</span>
  </div>
</body></html>`;
}

function cleanStalePdfs(projects) {
  if (!existsSync(OUT_DIR)) return;
  const validIds = new Set(projects.map((p) => p.id));
  for (const file of readdirSync(OUT_DIR)) {
    if (!file.endsWith('.pdf')) continue;
    const id = file.replace(/\.pdf$/, '');
    if (!validIds.has(id)) {
      rmSync(join(OUT_DIR, file));
      console.log(`[generate-project-pdfs] removed stale ${file} (project no longer exists)`);
    }
  }
}

async function run() {
  mkdirSync(OUT_DIR, { recursive: true });
  const projects = loadProjects();
  const categories = loadCategories();
  cleanStalePdfs(projects);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

  for (const project of projects) {
    const categoryTitles = (project.categories ?? []).map((slug) => categories.get(slug) ?? slug);
    const html = buildHtml(project, categoryTitles);
    await page.setContent(html, { waitUntil: 'networkidle' });
    const outPath = join(OUT_DIR, `${project.id}.pdf`);
    await page.pdf({ path: outPath, format: 'A4', printBackground: true });
    console.log(`[generate-project-pdfs] ${project.id}.pdf`);
  }

  await browser.close();
  console.log(`[generate-project-pdfs] done, ${projects.length} PDFs`);
}

run().catch((err) => {
  console.error('[generate-project-pdfs] failed:', err);
  process.exit(1);
});
