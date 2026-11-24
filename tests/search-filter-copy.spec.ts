import { expect, test, type Page } from '@playwright/test';

const groupNames = [
  'ฝึกซ้อม',
  'Bot / NPC / Trooper',
  'แมพ / ล็อบบี้ / เซิร์ฟเวอร์',
  'HUD / ข้อมูล',
  'Bind / ตั้งปุ่ม',
  'อื่น ๆ',
];

const card = (page: Page, name: string) => page.getByRole('article', { name, exact: true });
const searchBox = (page: Page) => page.getByRole('searchbox', { name: 'ค้นหาคำสั่ง' });
const cheatFilter = (page: Page, option: string) =>
  page.getByRole('group', { name: 'คำสั่ง cheat' }).getByRole('radio', { name: option, exact: true });
const emptyState = (page: Page) => page.getByText('ไม่พบคำสั่งที่ตรงกับการค้นหา');

test.describe('search and cheat filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/commands');
  });

  test('search matches the English command name, ignoring case and surrounding spaces', async ({ page }) => {
    await searchBox(page).fill('  BOT_KICK_ALL ');

    await expect(card(page, 'bot_kick_all')).toBeVisible();
    await expect(card(page, 'changelevel')).toBeHidden();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeHidden();
    await expect(page.getByRole('region', { name: 'ฝึกซ้อม' })).toBeHidden();
    await expect(emptyState(page)).toBeHidden();
  });

  test('search matches a Thai word in the translation', async ({ page }) => {
    await searchBox(page).fill('โหลดแมพใหม่');

    await expect(card(page, 'changelevel')).toBeVisible();
    await expect(card(page, 'bot_kick_all')).toBeHidden();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeHidden();
  });

  test('a search with no match shows the empty state and hides every command group', async ({ page }) => {
    await searchBox(page).fill('zzz-no-such-command');

    await expect(emptyState(page)).toBeVisible();
    for (const name of groupNames) {
      await expect(page.getByRole('region', { name, exact: true })).toBeHidden();
    }

    await searchBox(page).fill('');
    await expect(emptyState(page)).toBeHidden();
    await expect(card(page, 'changelevel')).toBeVisible();
  });

  test('the cheat filter shows all, cheat-only or non-cheat commands', async ({ page }) => {
    await expect(cheatFilter(page, 'ทั้งหมด')).toBeChecked();

    await cheatFilter(page, 'เฉพาะคำสั่ง cheat').check();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeVisible();
    await expect(card(page, 'changelevel')).toBeHidden();
    await expect(card(page, 'bot_kick_all')).toBeHidden();

    await cheatFilter(page, 'ไม่ใช้ cheat').check();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeHidden();
    await expect(card(page, 'changelevel')).toBeVisible();
    await expect(card(page, 'bot_kick_all')).toBeVisible();

    await cheatFilter(page, 'ทั้งหมด').check();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeVisible();
    await expect(card(page, 'changelevel')).toBeVisible();
    await expect(card(page, 'bot_kick_all')).toBeVisible();
  });

  test('search and cheat filter combine', async ({ page }) => {
    await searchBox(page).fill('bot_kick_all');
    await cheatFilter(page, 'เฉพาะคำสั่ง cheat').check();
    await expect(card(page, 'bot_kick_all')).toBeHidden();
    await expect(emptyState(page)).toBeVisible();

    await cheatFilter(page, 'ไม่ใช้ cheat').check();
    await expect(card(page, 'bot_kick_all')).toBeVisible();
    await expect(emptyState(page)).toBeHidden();

    await searchBox(page).fill('ตั้งคูลดาวน์ทุกสกิล');
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeHidden();
    await cheatFilter(page, 'เฉพาะคำสั่ง cheat').check();
    await expect(card(page, 'citadel_ability_cooldown_max')).toBeVisible();
  });
});

test.describe('copy button', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('copies the exact command name and confirms briefly', async ({ page }) => {
    await page.goto('/commands');
    const button = card(page, 'citadel_ability_cooldown_max').getByRole('button', {
      name: 'คัดลอก citadel_ability_cooldown_max',
    });

    await button.click();

    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('citadel_ability_cooldown_max');
    await expect(button).toHaveText('คัดลอกแล้ว');
    await expect(button).toHaveText('คัดลอก', { timeout: 5000 });
  });

  test('every command card has a copy button', async ({ page }) => {
    await page.goto('/commands');
    const cards = page.locator('[data-command-card]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).getByRole('button', { name: /^คัดลอก / })).toBeVisible();
    }
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the full list renders and the dead controls stay hidden', async ({ page }) => {
    await page.goto('/commands');

    for (const name of ['citadel_ability_cooldown_max', 'changelevel', 'bot_kick_all']) {
      await expect(card(page, name)).toBeVisible();
    }
    await expect(searchBox(page)).toBeHidden();
    await expect(page.getByRole('button', { name: /^คัดลอก / })).toHaveCount(0);
  });
});
