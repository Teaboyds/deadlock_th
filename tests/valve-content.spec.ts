import { expect, test } from '@playwright/test';

const bindLine = 'bind m "toggle volume 0 0.5"';

test('the Bind group opens with a syntax guide that links to the autoexec section', async ({ page }) => {
  await page.goto('/commands');
  const group = page.getByRole('region', { name: 'Bind / ตั้งปุ่ม', exact: true });
  const guide = group.getByRole('region', { name: 'วิธีเขียน bind', exact: true });

  await expect(guide).toBeVisible();
  for (const term of ['bind', 'unbind', 'toggle', 'alias', 'autoexec.cfg']) {
    await expect(guide.locator('code', { hasText: term }).first()).toBeVisible();
  }
  await expect(guide.getByText('ยังไม่ได้ทดสอบ')).toBeVisible();
  await guide.getByRole('link', { name: /autoexec/ }).click();
  await expect(page).toHaveURL(/#guide-autoexec$/);
});

test('an example bind written by the site is untested and warns that it may not work', async ({ page }) => {
  await page.goto('/commands');
  const group = page.getByRole('region', { name: 'Bind / ตั้งปุ่ม', exact: true });
  const card = group.getByRole('article', { name: bindLine });

  await expect(card).toBeVisible();
  await expect(card.getByText('เขียนโดยเว็บนี้')).toBeVisible();
  await expect(card.getByText('ยังไม่ได้ทดสอบ')).toBeVisible();
  await expect(card.getByText('ไม่ได้ติด flag release')).toBeVisible();
});

test.describe('copying an example bind', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('copies the whole bind line exactly', async ({ page }) => {
    await page.goto('/commands');
    await page.getByRole('article', { name: bindLine }).getByRole('button', { name: `คัดลอก ${bindLine}` }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(bindLine);
  });

  test('the syntax guide example keeps straight quotes when copied', async ({ page }) => {
    await page.goto('/commands');
    const guide = page.getByRole('region', { name: 'วิธีเขียน bind', exact: true });
    await guide.getByRole('button', { name: `คัดลอก ${bindLine}` }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(bindLine);
  });
});

test('a command taken from the Valve list shows its source and is untested', async ({ page }) => {
  await page.goto('/commands');
  const card = page.getByRole('region', { name: 'ฝึกซ้อม' }).getByRole('article', { name: 'citadel_bot_zig_zag' });

  await expect(card.getByText('Valve Developer Wiki')).toBeVisible();
  await expect(card.getByText('ยังไม่ได้ทดสอบ')).toBeVisible();
});

test('a wiki command the Valve list contradicts stays as the wiki has it', async ({ page }) => {
  await page.goto('/commands');
  const card = page.getByRole('article', { name: 'bot_kick_all' });

  await expect(card.getByText('deadlock.wiki')).toBeVisible();
  await expect(card.getByText('ยังไม่ได้ทดสอบ')).toHaveCount(0);
  await expect(card.getByText('ต้องเปิด cheats')).toHaveCount(0);
});
