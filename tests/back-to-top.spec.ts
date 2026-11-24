import { expect, test } from '@playwright/test';

test('the back-to-top button appears after scrolling down and sits at the bottom right', async ({ page }) => {
  await page.goto('/commands');
  const button = page.getByRole('link', { name: 'กลับขึ้นด้านบน' });
  await expect(button).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 2000));
  await expect(button).toBeVisible();

  const box = (await button.boundingBox())!;
  const viewport = page.viewportSize()!;
  expect(box.x + box.width).toBeGreaterThan(viewport.width - 60);
  expect(box.y + box.height).toBeGreaterThan(viewport.height - 60);
});

test('the back-to-top button scrolls to the top of the page', async ({ page }) => {
  await page.goto('/commands');
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.getByRole('link', { name: 'กลับขึ้นด้านบน' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole('link', { name: 'กลับขึ้นด้านบน' })).toBeHidden();
});
