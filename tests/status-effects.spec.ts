import { expect, test, type Page } from '@playwright/test';

const effect = (page: Page, name: string) => page.getByRole('article', { name, exact: true });

test('a debuff shows its label, Thai meaning and source', async ({ page }) => {
  await page.goto('/status-effects');
  const stun = page.getByRole('region', { name: 'Debuff' }).getByRole('article', { name: 'Stun', exact: true });
  await expect(stun).toContainText('Debuff');
  await expect(stun).toContainText('ทำอะไรไม่ได้');
  await expect(stun.getByRole('link', { name: 'deadlock.wiki' })).toHaveAttribute('href', 'https://deadlock.wiki/Status_Effects');
});

test('buffs, debuffs and ways to counter debuffs each have a group', async ({ page }) => {
  await page.goto('/status-effects');
  await expect(page.getByRole('region', { name: 'Buff' }).getByRole('article', { name: 'Unstoppable' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'วิธีรับมือ Debuff' }).getByRole('article', { name: 'Purge' })).toBeVisible();
});

test('other names of an effect are listed', async ({ page }) => {
  await page.goto('/status-effects');
  await expect(effect(page, 'Time Stop')).toContainText('Time Slow');
});

test('hero-specific effects are left out', async ({ page }) => {
  await page.goto('/status-effects');
  await expect(page.getByRole('main')).not.toContainText('Rabbit Hex');
});

test('search filters the effects', async ({ page }) => {
  await page.goto('/status-effects');
  await page.getByRole('searchbox', { name: 'ค้นหา Status Effect' }).fill('stun');
  await expect(effect(page, 'Stun')).toBeVisible();
  await expect(effect(page, 'Burn')).toBeHidden();
});

test.describe('on a wide screen', () => {
  test.use({ viewport: { width: 1400, height: 900 } });

  test('the contents sidebar lists the groups and effects', async ({ page }) => {
    await page.goto('/status-effects');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    await expect(contents.getByRole('link', { name: 'Debuff', exact: true })).toBeVisible();
    await contents.getByRole('link', { name: 'Silence', exact: true }).click();
    await expect(page).toHaveURL(/#effect-silence$/);
  });
});

test('buffs are marked green and debuffs red', async ({ page }) => {
  await page.goto('/status-effects');
  const badgeColor = (name: string, label: string) =>
    effect(page, name)
      .getByText(label, { exact: true })
      .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(await badgeColor('Unstoppable', 'Buff')).toBe('rgb(11, 163, 114)');
  expect(await badgeColor('Stun', 'Debuff')).toBe('rgb(202, 64, 28)');
});
