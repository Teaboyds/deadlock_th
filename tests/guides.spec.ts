import { expect, test } from '@playwright/test';

const sections = {
  console: 'เปิด console',
  autoexec: 'รันคำสั่งอัตโนมัติตอนเปิดเกม (autoexec)',
  hosting: 'เปิด custom game',
  bots: 'เพิ่ม Bot',
};

test('the four prose sections render around the command groups', async ({ page }) => {
  await page.goto('/commands');
  for (const name of Object.values(sections)) {
    await expect(page.getByRole('region', { name, exact: true })).toBeVisible();
  }

  // Opening the console comes before the command groups; the rest come after.
  const headings = await page.locator('main h2, main h3').allTextContents();
  const index = (text: string) => headings.indexOf(text);
  expect(index(sections.console)).toBeGreaterThanOrEqual(0);
  expect(index(sections.console)).toBeLessThan(index('ฝึกซ้อม'));
  expect(index('อื่น ๆ')).toBeLessThan(index(sections.autoexec));
  expect(index(sections.autoexec)).toBeLessThan(index(sections.hosting));
  expect(index(sections.hosting)).toBeLessThan(index(sections.bots));
});

test('the opening section says where commands work and how to enable cheats', async ({ page }) => {
  await page.goto('/commands');
  const section = page.getByRole('region', { name: sections.console, exact: true });
  await expect(section).toContainText('F7');
  await expect(section).toContainText('Dev command console');
  await expect(section).toContainText('Explore NYC');
  await expect(section.locator('code', { hasText: /^sv_cheats true$/ })).toBeVisible();
});

test('prose shows commands, paths and launch options verbatim as code', async ({ page }) => {
  await page.goto('/commands');
  const expected: Record<keyof typeof sections, string[]> = {
    console: ['sv_cheats true'],
    autoexec: [
      '<installation path>\\steamapps\\common\\Deadlock\\game\\citadel\\cfg',
      'autoexec.cfg',
      '-console -exec autoexec',
    ],
    hosting: [
      'map dl_midtown',
      'status',
      'connect [A:1:XXXXXXXXXX:XXXXX]',
      'changeteam 0',
      'changelevel dl_midtown',
    ],
    bots: [
      'exec citadel_botmatch_practice_6v6',
      'citadel_spawn_practice_bots false',
      'citadel_spawn_practice_bots_count 12',
      'map street_test',
      'citadel_spawn_practice_bots true',
    ],
  };
  for (const [key, codes] of Object.entries(expected)) {
    const section = page.getByRole('region', { name: sections[key as keyof typeof sections], exact: true });
    for (const text of codes) {
      await expect(section.locator('code').filter({ hasText: text }).first()).toHaveText(text);
    }
  }
});

test('the footer lists both sources with revisions, links and the translation date', async ({ page }) => {
  await page.goto('/commands');
  const footer = page.locator('footer.sources-footer');
  await expect(footer).toBeVisible();

  await expect(footer.getByRole('link', { name: 'deadlock.wiki' })).toHaveAttribute(
    'href',
    'https://deadlock.wiki/Console_commands',
  );
  await expect(footer.getByRole('link', { name: 'oldid=236265' })).toHaveAttribute('href', /oldid=236265/);

  await expect(footer.getByRole('link', { name: 'Valve Developer Wiki' })).toHaveAttribute(
    'href',
    'https://developer.valvesoftware.com/wiki/List_of_Deadlock_console_commands_and_variables',
  );
  await expect(footer.getByRole('link', { name: 'oldid=509699' })).toHaveAttribute('href', /oldid=509699/);

  await expect(footer).toContainText('2026-11-24');
});

test.describe('copying commands from the prose', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('a runnable command in a prose step has a copy button that copies it exactly', async ({ page }) => {
    await page.goto('/commands');
    const section = page.getByRole('region', { name: sections.bots, exact: true });
    await section.getByRole('button', { name: 'คัดลอก citadel_spawn_practice_bots_count 12' }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('citadel_spawn_practice_bots_count 12');
  });

  test('file paths and bare names in the prose get no copy button', async ({ page }) => {
    await page.goto('/commands');
    const section = page.getByRole('region', { name: sections.autoexec, exact: true });
    const labels = await section.getByRole('button').evaluateAll((buttons) => buttons.map((b) => b.getAttribute('aria-label')));
    expect(labels).toEqual(['คัดลอก -console -exec autoexec']);
  });
});
