import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 7'] });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('.filter-bar')?.scrollIntoView());
await page.waitForTimeout(200);

const pill = page.locator('[data-filter-pill][data-filter-category="editorial-print"]');
const box = await pill.boundingBox();
const cx = box.x + box.width / 2;
const cy = box.y + box.height / 2;

// Full press-hold-release sequence dispatched from within the SAME evaluate
// call's closure, using real timers via an async function so the 500ms
// threshold genuinely elapses inside the page's own event loop.
await page.evaluate(({ x, y }) => {
  return new Promise((resolve) => {
    const el = document.elementFromPoint(x, y);
    el.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, pointerId: 1, isPrimary: true }));
    setTimeout(() => {
      el.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, pointerId: 1, isPrimary: true }));
      resolve(null);
    }, 650);
  });
}, { x: cx, y: cy });

await page.waitForTimeout(300);

const activeAfter = await page.locator('[data-filter-pill].is-active').all();
const activeCategories = await Promise.all(activeAfter.map((p) => p.getAttribute('data-filter-category')));
console.log('Active categories after real long-press sequence (should be only editorial-print):', activeCategories);

console.log('JS errors:', errors.length ? errors : 'none');
await browser.close();
console.log('done');
