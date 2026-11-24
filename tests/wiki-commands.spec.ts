import { expect, test } from '@playwright/test';

const groupLabels = [
  'ฝึกซ้อม',
  'Bot / NPC / Trooper',
  'แมพ / ล็อบบี้ / เซิร์ฟเวอร์',
  'HUD / ข้อมูล',
  'Bind / ตั้งปุ่ม',
  'อื่น ๆ',
];

test('all six command groups render', async ({ page }) => {
  await page.goto('/commands');
  for (const label of groupLabels) {
    await expect(page.getByRole('region', { name: label, exact: true })).toBeVisible();
  }
});

for (const name of ['kingme', 'hud_damagemeter', 'citadel_create_unit', 'citadel_ability_cooldown_max']) {
  test(`wiki cheat command ${name} shows the cheat badge`, async ({ page }) => {
    await page.goto('/commands');
    const card = page.getByRole('article', { name, exact: true });
    await expect(card).toBeVisible();
    await expect(card.getByText('ต้องเปิด cheats')).toBeVisible();
    await expect(card.getByText('deadlock.wiki')).toBeVisible();
  });
}

for (const name of ['changelevel', 'citadel_hero_testing_enabled', 'kill']) {
  test(`wiki command ${name} has no cheat badge`, async ({ page }) => {
    await page.goto('/commands');
    const card = page.getByRole('article', { name, exact: true });
    await expect(card).toBeVisible();
    await expect(card.getByText('ต้องเปิด cheats')).toHaveCount(0);
  });
}

test('rows that differ only by value are merged into one card', async ({ page }) => {
  await page.goto('/commands');
  const cards = page.getByRole('article', { name: 'citadel_rapid_stamina_regen', exact: true });
  await expect(cards).toHaveCount(1);
});

test('wiki commands land in their command group', async ({ page }) => {
  await page.goto('/commands');
  await expect(
    page
      .getByRole('region', { name: 'Bot / NPC / Trooper', exact: true })
      .getByRole('article', { name: 'bot_kick_all', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('region', { name: 'HUD / ข้อมูล', exact: true })
      .getByRole('article', { name: 'citadel_minimap_zip_line_thickness', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('region', { name: 'แมพ / ล็อบบี้ / เซิร์ฟเวอร์', exact: true })
      .getByRole('article', { name: 'map', exact: true }),
  ).toBeVisible();
});
