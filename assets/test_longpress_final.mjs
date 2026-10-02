import { chromium, devices } from 'playwright';

const browser = await chromium.launch();

// --- Touch device tests ---
const touchContext = await browser.newContext({ ...devices['Pixel 7'] });
const touchPage = await touchContext.newPage();
const touchErrors = [];
touchPage.on('pageerror', (e) => touchErrors.push(e.message));

await touchPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await touchPage.evaluate(() => document.querySelector('.filter-bar')?.scrollIntoView());
await touchPage.waitForTimeout(300);

// Test: long-press solos the category
const pill1 = touchPage.locator('[data-filter-pill][data-filter-category="editorial-print"]');
const box1 = await pill1.boundingBox();
await pill1.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: box1.x + box1.width / 2, clientY: box1.y + box1.height / 2, bubbles: true });
await touchPage.waitForTimeout(650);
await pill1.dispatchEvent('pointerup', { pointerType: 'touch', clientX: box1.x + box1.width / 2, clientY: box1.y + box1.height / 2, bubbles: true });
await touchPage.waitForTimeout(300);
let active = await touchPage.locator('[data-filter-pill].is-active').all();
let cats = await Promise.all(active.map((p) => p.getAttribute('data-filter-category')));
console.log('TEST 1 - Long-press solos category (expect only editorial-print):', cats);

// Reset
await touchPage.locator('[data-filter-reset]').click();
await touchPage.waitForTimeout(300);

// Test: short tap (well under 500ms) should NOT solo, just toggle normally
const pill2 = touchPage.locator('[data-filter-pill][data-filter-category="branding-identity"]');
const box2 = await pill2.boundingBox();
await pill2.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: box2.x + box2.width / 2, clientY: box2.y + box2.height / 2, bubbles: true });
await touchPage.waitForTimeout(100); // well under 500ms
await pill2.dispatchEvent('pointerup', { pointerType: 'touch', clientX: box2.x + box2.width / 2, clientY: box2.y + box2.height / 2, bubbles: true });
await pill2.dispatchEvent('click', { bubbles: true });
await touchPage.waitForTimeout(300);
active = await touchPage.locator('[data-filter-pill].is-active').count();
console.log('TEST 2 - Short tap toggles normally (expect 5 of 6 active, started at 6):', active);

// Reset
await touchPage.locator('[data-filter-reset]').click();
await touchPage.waitForTimeout(300);

// Test: moving finger during hold cancels the long-press
const pill3 = touchPage.locator('[data-filter-pill][data-filter-category="creative-direction"]');
const box3 = await pill3.boundingBox();
const startX = box3.x + box3.width / 2;
const startY = box3.y + box3.height / 2;
await pill3.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: startX, clientY: startY, bubbles: true });
await touchPage.waitForTimeout(200);
await pill3.dispatchEvent('pointermove', { pointerType: 'touch', clientX: startX + 30, clientY: startY, bubbles: true }); // exceeds 10px tolerance
await touchPage.waitForTimeout(500); // past the 500ms mark, but press was cancelled
await pill3.dispatchEvent('pointerup', { pointerType: 'touch', clientX: startX + 30, clientY: startY, bubbles: true });
await touchPage.waitForTimeout(300);
active = await touchPage.locator('[data-filter-pill].is-active').all();
cats = await Promise.all(active.map((p) => p.getAttribute('data-filter-category')));
console.log('TEST 3 - Movement cancels long-press, no solo (expect all 6 still active, unaffected):', cats.length);

console.log('Touch errors:', touchErrors.length ? touchErrors : 'none');
await touchContext.close();

// --- Desktop: right-click still works ---
const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const desktopPage = await desktopContext.newPage();
await desktopPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const pill4 = desktopPage.locator('[data-filter-pill][data-filter-category="3d-architectural"]');
await pill4.click({ button: 'right' });
await desktopPage.waitForTimeout(400);
active = await desktopPage.locator('[data-filter-pill].is-active').all();
cats = await Promise.all(active.map((p) => p.getAttribute('data-filter-category')));
console.log('TEST 4 - Right-click still solos on desktop (expect only 3d-architectural):', cats);

await desktopContext.close();
await browser.close();
console.log('done');
