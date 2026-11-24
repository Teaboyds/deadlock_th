import { expect, test } from '@playwright/test';

test('the hero leads to the Commands tab', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Deadlock TH' })).toBeVisible();
  await page.getByRole('main').getByRole('link', { name: 'ดูคำสั่ง console' }).click();
  await expect(page).toHaveURL(/\/commands\/?$/);
});

test('the command count on the landing page matches the Commands page', async ({ page }) => {
  await page.goto('/commands');
  const cards = await page.locator('article[data-command-card]').count();

  await page.goto('/');
  const stat = page.getByRole('region', { name: 'สรุป' }).getByRole('group', { name: 'คำสั่ง' });
  await expect(stat).toContainText(String(cards));
});

test('the landing page has a card per tab; tabs without content say coming soon', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('region', { name: 'แท็บทั้งหมด' });

  const commands = tabs.getByRole('link', { name: /Commands/ });
  await expect(commands).toHaveAttribute('href', '/commands');
  await expect(commands).not.toContainText('Coming soon');

  for (const name of ['Items', 'Heroes']) {
    const card = tabs.getByRole('link', { name: new RegExp(name) });
    await expect(card).toContainText('Coming soon');
  }
});

test('the landing footer says the site is fan-made and not affiliated with Valve', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('contentinfo')).toContainText('Valve');
});
