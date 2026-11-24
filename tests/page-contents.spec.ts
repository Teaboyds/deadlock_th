import { expect, test } from '@playwright/test';

test('the Commands page lists its sections as shortcuts, in page order', async ({ page }) => {
  await page.goto('/commands');
  const contents = page.getByRole('navigation', { name: 'สารบัญ' });
  await expect(contents.getByRole('link')).toHaveText([
    'เปิด console',
    'ฝึกซ้อม',
    'Bot / NPC / Trooper',
    'แมพ / ล็อบบี้ / เซิร์ฟเวอร์',
    'HUD / ข้อมูล',
    'Bind / ตั้งปุ่ม',
    'อื่น ๆ',
    'รันคำสั่งอัตโนมัติตอนเปิดเกม (autoexec)',
    'เปิด custom game',
    'เพิ่ม Bot',
  ]);
});

test('a shortcut jumps to its section, clear of the header bar', async ({ page }) => {
  await page.goto('/commands');
  await page.getByRole('navigation', { name: 'สารบัญ' }).getByRole('link', { name: 'Bind / ตั้งปุ่ม' }).click();
  await expect(page).toHaveURL(/#group-binds$/);

  const heading = page.getByRole('heading', { name: 'Bind / ตั้งปุ่ม', level: 2 });
  await expect(heading).toBeInViewport();
  const header = await page.getByRole('banner').boundingBox();
  const box = await heading.boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
});

test.describe('on a wide screen', () => {
  test.use({ viewport: { width: 1400, height: 900 } });

  test('the contents sit in a sidebar to the left of the content and stay on screen', async ({ page }) => {
    await page.goto('/commands');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    const sidebar = (await contents.boundingBox())!;
    const card = (await page.locator('.command-card').first().boundingBox())!;
    expect(sidebar.x + sidebar.width).toBeLessThan(card.x);

    await page.evaluate(() => window.scrollTo(0, 4000));
    await expect(contents.getByRole('link', { name: 'เปิด console' })).toBeInViewport();
  });

  test('the contents mark the section being read', async ({ page }) => {
    await page.goto('/commands');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    await contents.getByRole('link', { name: 'Bind / ตั้งปุ่ม' }).click();
    await expect(contents.getByRole('link', { name: 'Bind / ตั้งปุ่ม' })).toHaveAttribute('aria-current', 'location');
    await expect(contents.locator('[aria-current="location"]')).toHaveCount(1);
  });

  test('links to command groups hidden by the search are disabled', async ({ page }) => {
    await page.goto('/commands');
    await page.getByRole('searchbox', { name: 'ค้นหาคำสั่ง' }).fill('bot_kick_all');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    await expect(contents.getByRole('link', { name: 'Bot / NPC / Trooper' })).not.toHaveAttribute('aria-disabled', 'true');
    await expect(contents.getByRole('link', { name: 'ฝึกซ้อม' })).toHaveAttribute('aria-disabled', 'true');
    await expect(contents.getByRole('link', { name: 'เปิด console' })).not.toHaveAttribute('aria-disabled', 'true');

    await page.getByRole('searchbox', { name: 'ค้นหาคำสั่ง' }).fill('');
    await expect(contents.getByRole('link', { name: 'ฝึกซ้อม' })).not.toHaveAttribute('aria-disabled', 'true');
  });
});
