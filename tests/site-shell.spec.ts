import { expect, test } from '@playwright/test';

test('home page shows a card for the Commands tab that links to it', async ({ page }) => {
  await page.goto('/');
  const card = page.getByRole('link', { name: /Commands/ }).and(page.locator('main a'));
  await expect(card).toBeVisible();
  await card.click();
  await expect(page).toHaveURL(/\/commands\/?$/);
});

for (const path of ['/', '/commands']) {
  test(`tab menu on ${path} lists only the Commands tab`, async ({ page }) => {
    await page.goto(path);
    const menu = page.getByRole('navigation', { name: 'แท็บ' });
    await expect(menu.getByRole('link')).toHaveText(['Commands']);
  });
}

test('tab menu marks Commands as the current tab on the Commands page', async ({ page }) => {
  await page.goto('/commands');
  const menu = page.getByRole('navigation', { name: 'แท็บ' });
  await expect(menu.getByRole('link', { name: 'Commands' })).toHaveAttribute('aria-current', 'page');
});

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
