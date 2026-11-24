import { expect, test } from '@playwright/test';

test('a cheat command card shows its details inside its command group', async ({ page }) => {
  await page.goto('/commands');
  const group = page.getByRole('region', { name: 'ฝึกซ้อม' });
  const card = group.getByRole('article', { name: 'citadel_ability_cooldown_max' });

  await expect(card).toBeVisible();
  await expect(card.getByText('ต้องเปิด cheats')).toBeVisible();
  await expect(card.getByText('deadlock.wiki')).toBeVisible();
  await expect(card.getByText('ตั้งคูลดาวน์ทุกสกิล')).toBeVisible();
  await expect(card.getByRole('note', { name: 'ใช้ฝึกอะไร' })).toBeVisible();
});

test('a non-cheat command card has no cheat badge', async ({ page }) => {
  await page.goto('/commands');
  const card = page.getByRole('article', { name: 'changelevel' });

  await expect(card).toBeVisible();
  await expect(card.getByText('ต้องเปิด cheats')).toHaveCount(0);
});
