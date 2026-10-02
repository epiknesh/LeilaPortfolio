import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 7'] });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => console.log('CONSOLE:', m.text()));

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('.filter-bar')?.scrollIntoView());
await page.waitForTimeout(200);

// Add instrumentation directly to verify pointerdown/timer fires
await page.evaluate(() => {
  const pill = document.querySelector('[data-filter-pill][data-filter-category="editorial-print"]');
  window.__events = [];
  ['pointerdown', 'pointerup', 'pointermove', 'pointercancel', 'click', 'contextmenu'].forEach((type) => {
    pill.addEventListener(type, () => window.__events.push(type), true);
  });
});

const targetPill = page.locator('[data-filter-pill][data-filter-category="editorial-print"]');
const box = await targetPill.boundingBox();
const cx = box.x + box.width / 2;
const cy = box.y + box.height / 2;

// Use CDP Input.dispatchTouchEvent via Playwright's touchscreen for a realistic press-hold-release
await page.evaluate(({ x, y }) => {
  const el = document.elementFromPoint(x, y);
  const pd = new PointerEvent('pointerdown', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, pointerId: 1, isPrimary: true });
  el.dispatchEvent(pd);
}, { x: cx, y: cy });

await page.waitForTimeout(700);

const eventsAfterHold = await page.evaluate(() => window.__events);
console.log('Events fired during the hold (before pointerup):', eventsAfterHold);

const activeDuringHold = await page.locator('[data-filter-pill].is-active').all();
const activeCatsNow = await Promise.all(activeDuringHold.map((p) => p.getAttribute('data-filter-category')));
console.log('Active categories DURING hold (after 700ms, before release):', activeCatsNow);

await page.evaluate(({ x, y }) => {
  const el = document.elementFromPoint(x, y);
  el.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true, cancelable: true, pointerId: 1, isPrimary: true }));
}, { x: cx, y: cy });

await page.waitForTimeout(300);
const eventsFinal = await page.evaluate(() => window.__events);
console.log('All events after release:', eventsFinal);

const activeFinal = await page.locator('[data-filter-pill].is-active').all();
const activeCatsFinal = await Promise.all(activeFinal.map((p) => p.getAttribute('data-filter-category')));
console.log('Final active categories:', activeCatsFinal);

console.log('JS errors:', errors.length ? errors : 'none');
await browser.close();
console.log('done');
