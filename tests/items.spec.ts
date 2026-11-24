import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { parse } from 'yaml';

// Which categories have items comes from the content, so adding items doesn't break these tests.
const content = parse(readFileSync('src/content/items.yaml', 'utf-8')) as Record<string, { category: string }>;
const categories = ['Weapon', 'Vitality', 'Spirit'];
const itemCount = (category: string) => Object.values(content).filter((i) => i.category === category).length;

const row800 = (page: Page) => page.getByRole('region', { name: /800/ });

test('the Items tab offers the three item categories; empty ones say coming soon', async ({ page }) => {
  await page.goto('/items');
  const list = page.getByRole('region', { name: 'หมวด Item' });
  await expect(list.getByRole('link')).toHaveText(categories.map((c) => new RegExp(c)));
  for (const category of categories) {
    const card = list.getByRole('link', { name: new RegExp(category) });
    if (itemCount(category) === 0) await expect(card).toContainText('Coming soon');
    else await expect(card).not.toContainText('Coming soon');
  }
});

test('the Weapon page lists every Weapon item in rows by cost, each with its icon', async ({ page }) => {
  await page.goto('/items');
  await page.getByRole('link', { name: /Weapon/ }).click();
  await expect(page).toHaveURL(/\/items\/weapon\/?$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Weapon' })).toBeVisible();

  await expect(row800(page).getByRole('link', { name: 'Close Quarters', exact: true })).toBeVisible();
  const links = page.getByRole('main').getByRole('region').getByRole('link');
  await expect(links).toHaveCount(itemCount('Weapon'));
  for (const link of await links.all()) {
    // The icon beside the name is decorative, so the link is named once.
    await expect(link.locator('img, [data-item-icon]')).toBeVisible();
  }
});

test('a category without data says it is coming soon', async ({ page }) => {
  const empty = categories.find((c) => itemCount(c) === 0);
  test.skip(!empty, 'every category has items');
  await page.goto(`/items/${empty!.toLowerCase()}`);
  await expect(page.getByRole('heading', { level: 1, name: empty })).toBeVisible();
  await expect(page.getByRole('main').getByText('Coming soon')).toBeVisible();
});

test('an item page shows cost, stats, passive, what it builds into and its wiki link', async ({ page }) => {
  await page.goto('/items/weapon');
  await row800(page).getByRole('link', { name: 'Close Quarters' }).click();
  await expect(page).toHaveURL(/\/items\/weapon\/close-quarters\/?$/);

  const main = page.getByRole('main');
  await expect(main.getByRole('heading', { level: 1, name: 'Close Quarters' })).toBeVisible();
  await expect(main.getByRole('img', { name: 'Close Quarters' })).toBeVisible();
  await expect(main).toContainText('800');
  await expect(main).toContainText('+20% Melee Resist');
  await expect(main).toContainText('15m Close Range');
  await expect(main.getByRole('list', { name: 'ใช้รวมเป็น' })).toContainText('Point Blank');
  await expect(main.getByRole('link', { name: 'deadlock.wiki' })).toHaveAttribute(
    'href',
    'https://deadlock.wiki/Close_Quarters',
  );
  await main.getByRole('link', { name: 'Weapon' }).click();
  await expect(page).toHaveURL(/\/items\/weapon\/?$/);
});

test('only standard-match values are shown, never Street Brawl ones', async ({ page }) => {
  for (const path of ['/items/weapon', '/items/weapon/close-quarters']) {
    await page.goto(path);
    await expect(page.getByRole('main')).not.toContainText('Street Brawl');
  }
  await expect(page.getByRole('main')).not.toContainText('+30% Melee Resist');
});

test('Monster Rounds lists the Hero abilities it affects', async ({ page }) => {
  await page.goto('/items/weapon/monster-rounds');
  await expect(page.getByRole('main').getByRole('table')).toContainText('Lil Helpers');
});

test('the Items tab stays current on category and item pages', async ({ page }) => {
  for (const path of ['/items', '/items/weapon', '/items/weapon/rapid-rounds']) {
    await page.goto(path);
    await expect(page.getByRole('navigation', { name: 'แท็บ' }).getByRole('link', { name: 'Items' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  }
});

test('the Weapon page footer shows the Items page revision', async ({ page }) => {
  await page.goto('/items/weapon');
  await expect(page.locator('footer.sources-footer').getByRole('link', { name: 'oldid=244252' })).toHaveAttribute(
    'href',
    /oldid=244252/,
  );
});

test.describe('item popup on the category page', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('hovering an item shows its cost, stats and passive', async ({ page }) => {
    await page.goto('/items/weapon');
    const link = row800(page).getByRole('link', { name: 'Close Quarters' });
    const popup = page.getByRole('tooltip').filter({ hasText: 'Close Quarters' });
    await expect(popup).toBeHidden();

    await link.hover();
    await expect(popup).toBeVisible();
    await expect(popup).toContainText('800');
    await expect(popup).toContainText('+20% Melee Resist');
    await expect(popup).toContainText('15m Close Range');
  });

  test('keyboard focus shows the popup too', async ({ page }) => {
    await page.goto('/items/weapon');
    await row800(page).getByRole('link', { name: 'Headshot Booster' }).focus();
    await expect(page.getByRole('tooltip').filter({ hasText: 'Headshot Booster' })).toBeVisible();
  });

  test('the popup stays inside the screen for items at the right edge', async ({ page }) => {
    await page.goto('/items/weapon');
    const viewport = page.viewportSize()!;
    for (const link of await row800(page).getByRole('link').all()) {
      await link.hover();
      const name = (await link.textContent())!.trim();
      const box = (await page.getByRole('tooltip').filter({ hasText: name }).boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    }
  });
});
