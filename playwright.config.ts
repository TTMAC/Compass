import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    // `astro preview` is unsupported by the @astrojs/netlify adapter, so serve
    // the production build in ./dist with a minimal static server. This is
    // faithful to prod output; the dev server's toolbar and dev-only behaviour
    // skew the tests (extra <h1>s, cross-origin fetches). Run `npm run build`
    // first; in CI the e2e job restores the dist artifact before this runs.
    command: "node scripts/serve-dist.mjs",
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
