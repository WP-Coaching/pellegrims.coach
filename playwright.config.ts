import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel where possible. */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Use fewer workers on CI, unrestricted locally. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3005",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Global test timeout */
  timeout: 60000,

  /* Configure projects for major browsers */
  projects: [
    {
      name: "admin-chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /tests\/admin\/.*\.spec\.ts/,
      workers: 1,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /tests\/frontend\/.*\.spec\.ts/,
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: /tests\/frontend\/.*\.spec\.ts/,
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testMatch: /tests\/frontend\/.*\.spec\.ts/,
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: /tests\/frontend\/.*\.spec\.ts/,
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        // Mobile Safari specific settings for better test stability
        actionTimeout: 30000, // Increased timeout for Mobile Safari
        navigationTimeout: 60000, // Longer navigation timeout
        // Additional time for Mobile Safari to process interactions
        launchOptions: {
          slowMo: process.env.CI ? 100 : 0, // Slow down interactions in CI for Mobile Safari
        },
      },
      retries: process.env.CI ? 3 : 1, // More retries for Mobile Safari in CI
      testMatch: /tests\/frontend\/.*\.spec\.ts/,
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command:
      "bash -lc 'set -euo pipefail; trap \"rm -f e2e-test.db*\" EXIT; rm -f e2e-test.db*; export PAYLOAD_ENV=test PAYLOAD_ADMIN_EMAIL=test@example.com PAYLOAD_ADMIN_PASSWORD=test; npm run migrate && npm run seed && npm run build && PORT=3005 npm start'",
    url: "http://localhost:3005",
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "pipe",
  },
});
