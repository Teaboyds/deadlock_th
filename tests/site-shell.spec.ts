import { expect, test } from '@playwright/test';

const tabs = [
  { label: 'Heroes', path: '/heroes', comingSoon: true },
  { label: 'Items', path: '/items', comingSoon: false },
  { label: 'Commands', path: '/commands', comingSoon: false },
];

for (const path of ['/', ...tabs.map((t) => t.path)]) {
  test(`tab menu on ${path} lists every tab`, async ({ page }) => {
    await page.goto(path);
    const menu = page.getByRole('navigation', { name: 'แท็บ' });
    await expect(menu.getByRole('link')).toHaveText(tabs.map((t) => t.label));
  });
}

for (const tab of tabs) {
  test(`tab menu marks ${tab.label} as the current tab on its page`, async ({ page }) => {
    await page.goto(tab.path);
    const menu = page.getByRole('navigation', { name: 'แท็บ' });
    await expect(menu.getByRole('link', { name: tab.label })).toHaveAttribute('aria-current', 'page');
    await expect(menu.locator('[aria-current="page"]')).toHaveCount(1);
  });
}

for (const tab of tabs.filter((t) => t.comingSoon)) {
  test(`the ${tab.label} tab says it is coming soon`, async ({ page }) => {
    await page.goto(tab.path);
    await expect(page.getByRole('heading', { level: 1, name: tab.label })).toBeVisible();
    await expect(page.getByRole('main').getByText('Coming soon')).toBeVisible();
  });
}

test('the header bar stays at the top of the screen while scrolling', async ({ page }) => {
  await page.goto('/commands');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const menu = page.getByRole('navigation', { name: 'แท็บ' });
  await expect(menu).toBeInViewport();
  const box = await page.getByRole('banner').boundingBox();
  expect(box?.y).toBe(0);
});

test('the header bar spans the full width of the screen', async ({ page }) => {
  await page.goto('/commands');
  const box = await page.getByRole('banner').boundingBox();
  const width = await page.evaluate(() => document.documentElement.clientWidth);
  expect(box?.x).toBe(0);
  expect(box?.width).toBe(width);
});

test('a heading reached by an in-page link is not hidden behind the header bar', async ({ page }) => {
  await page.goto('/commands#guide-autoexec');
  const header = await page.getByRole('banner').boundingBox();
  const heading = await page.locator('#guide-autoexec').boundingBox();
  expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
});

for (const path of ['/', '/commands']) {
  test(`the header bar on ${path} stands apart from the cards below it`, async ({ page }) => {
    await page.goto(path);
    const bar = await page.getByRole('banner').evaluate((el) => getComputedStyle(el).backgroundColor);
    const card = await page.locator('.tab-cards a, .command-card').first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bar).not.toBe(card);
  });
}
