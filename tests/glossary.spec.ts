import { expect, test, type Page } from '@playwright/test';

const term = (page: Page, name: string) => page.getByRole('article', { name, exact: true });

test('a term shows its Thai meaning, explanation, source and where to get it', async ({ page }) => {
  await page.goto('/glossary');
  const fireRate = page.getByRole('region', { name: 'อาวุธ' }).getByRole('article', { name: 'Fire Rate', exact: true });

  await expect(fireRate).toContainText('จำนวนกระสุนที่ยิงออกไปต่อวินาที');
  await expect(fireRate.getByRole('link', { name: 'deadlock.wiki' })).toHaveAttribute('href', 'https://deadlock.wiki/Fire_Rate');
  await fireRate.getByRole('list', { name: 'Item ที่ให้ค่านี้' }).getByRole('link', { name: /Rapid Rounds/ }).click();
  await expect(page).toHaveURL(/\/items\/weapon\/rapid-rounds\/?$/);
});

test('a term named after the shop label lists the wiki names as aliases', async ({ page }) => {
  await page.goto('/glossary');
  await expect(term(page, 'Max Ammo')).toContainText('Clip Size');
});

test('the defence group opens with the Damage Resistance overview', async ({ page }) => {
  await page.goto('/glossary');
  const group = page.getByRole('region', { name: 'ป้องกัน' });
  await expect(group.getByRole('article').first()).toHaveAccessibleName('Damage Resistance');
  await expect(group.getByRole('article', { name: 'Bullet Resist' })).toBeVisible();
});

test('explanations carry no formulas', async ({ page }) => {
  await page.goto('/glossary');
  for (const formula of ['Total Resist', 'Final Damage', 'Max HP=', '×']) {
    await expect(page.getByRole('main')).not.toContainText(formula);
  }
});

test('search finds a term by alias or by its Thai meaning', async ({ page }) => {
  await page.goto('/glossary');
  const search = page.getByRole('searchbox', { name: 'ค้นหาคำศัพท์' });

  await search.fill('clip size');
  await expect(term(page, 'Max Ammo')).toBeVisible();
  await expect(term(page, 'Fire Rate')).toBeHidden();

  await search.fill('ต่อวินาที');
  await expect(term(page, 'Fire Rate')).toBeVisible();
  await expect(term(page, 'Max Ammo')).toBeHidden();

  await search.fill('zzzz');
  await expect(page.getByRole('status')).toContainText('ไม่พบคำศัพท์');
});

test('a stat on an item page links to its term', async ({ page }) => {
  await page.goto('/items/weapon/rapid-rounds');
  await page.getByRole('main').getByRole('link', { name: 'Fire Rate' }).click();
  await expect(page).toHaveURL(/\/glossary#term-fire-rate$/);
  await expect(term(page, 'Fire Rate')).toBeInViewport();
});

test.describe('on a wide screen', () => {
  test.use({ viewport: { width: 1400, height: 900 } });

  test('a contents sidebar lists the groups and their terms and marks the one being read', async ({ page }) => {
    await page.goto('/glossary');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    await expect(contents.getByRole('link', { name: 'อาวุธ' })).toBeVisible();
    await expect(contents.getByRole('link', { name: 'Fire Rate' })).toBeVisible();

    await contents.getByRole('link', { name: 'Melee Resist' }).click();
    await expect(page).toHaveURL(/#term-melee-resist$/);
    await expect(contents.getByRole('link', { name: 'Melee Resist' })).toHaveAttribute('aria-current', 'location');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(contents.getByRole('link', { name: 'อาวุธ' })).toBeInViewport();
  });

  test('links to terms hidden by the search are disabled', async ({ page }) => {
    await page.goto('/glossary');
    await page.getByRole('searchbox', { name: 'ค้นหาคำศัพท์' }).fill('clip size');
    const contents = page.getByRole('navigation', { name: 'สารบัญ' });
    await expect(contents.getByRole('link', { name: 'Fire Rate' })).toHaveAttribute('aria-disabled', 'true');
    await expect(contents.getByRole('link', { name: 'Max Ammo' })).not.toHaveAttribute('aria-disabled', 'true');
  });
});

test('the back-to-top button appears on the Glossary after scrolling', async ({ page }) => {
  await page.goto('/glossary');
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.getByRole('link', { name: 'กลับขึ้นด้านบน' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
