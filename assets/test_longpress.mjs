import { chromium, devices } from 'playwright';

const browser = await chromium.launch();

// Test 1: touch device — long press should solo the category
const touchContext = await browser.newContext({ ...devices['Pixel 7'] });
const touchPage = await touchContext.newPage();
const errors = [];
touchPage.on('pageerror', (e) => errors.push(e.message));

await touchPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await touchPage.evaluate(() => document.querySelector('.filter-bar')?.scrollIntoView());
await touchPage.waitForTimeout(200);

const targetPill = touchPage.locator('[data-filter-pill][data-filter-category="editorial-print"]');
const box = await targetPill.boundingBox();

// Simulate a long press via touchscreen dispatch (down, wait, up)
await touchPage.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
// tap() is too quick for long-press; use pointer-level simulation instead
await touchPage.evaluate(({ x, y }) => {
  const el = document.elementFromPoint(x, y);
  el.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true }));
}, { x: box.x + box.width / 2, y: box.y + box.height / 2 });

await touchPage.waitForTimeout(650); // wait past the 500ms long-press threshold

await touchPage.evaluate(({ x, y }) => {
  const el = document.elementFromPoint(x, y);
  el.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', clientX: x, clientY: y, bubbles: true }));
}, { x: box.x + box.width / 2, y: box.y + box.height / 2 });

await touchPage.waitForTimeout(500);

const activeAfter = await touchPage.locator('[data-filter-pill].is-active').all();
const activeCategories = await Promise.all(activeAfter.map((p) => p.getAttribute('data-filter-category')));
console.log('Active categories after long-press on touch device (should be only editorial-print):', activeCategories);

const touchHintVisible = await touchPage.locator('.filter-hint-touch').isVisible();
const mouseHintVisible = await touchPage.locator('.filter-hint-mouse').isVisible();
console.log('Touch hint visible on touch device:', touchHintVisible, '| mouse hint visible:', mouseHintVisible);

console.log('JS errors (touch):', errors.length ? errors : 'none');
await touchContext.close();

// Test 2: desktop — a quick click (well under 500ms) should NOT solo, just toggle normally
const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const desktopPage = await desktopContext.newPage();
await desktopPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

const mouseHintVisibleDesktop = await desktopPage.locator('.filter-hint-mouse').isVisible();
const touchHintVisibleDesktop = await desktopPage.locator('.filter-hint-touch').isVisible();
console.log('Mouse hint visible on desktop:', mouseHintVisibleDesktop, '| touch hint visible:', touchHintVisibleDesktop);

const pill2 = desktopPage.locator('[data-filter-pill]').nth(1);
await pill2.click(); // normal quick click
await desktopPage.waitForTimeout(300);
const activePills2 = await desktopPage.locator('[data-filter-pill].is-active').count();
console.log('Active pills after one normal quick click (should be 5, started at 6):', activePills2);

await desktopContext.close();
await browser.close();
console.log('done');
