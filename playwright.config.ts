import { defineConfig, devices } from '@playwright/test';

// Tests run against the built site (`npm test` builds first), served by `astro preview`.
// PORT and OUT_DIR let parallel runs use their own server and build folder.
const port = Number(process.env.PORT ?? 4321);
export default defineConfig({
  testDir: './tests',
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx astro preview --port ${port} --ignore-lock`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
