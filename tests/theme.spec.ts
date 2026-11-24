import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 360, height: 740 } });

for (const path of ['/', '/commands']) {
  test(`${path} fits a 360px phone screen without sideways scrolling`, async ({ page }) => {
    await page.goto(path);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test(`${path} keeps a 16px side gutter at 360px`, async ({ page }) => {
    await page.goto(path);
    const box = await page.getByRole('heading', { level: 1 }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(16);
    expect(box!.x + box!.width).toBeLessThanOrEqual(360 - 16);
  });
}
