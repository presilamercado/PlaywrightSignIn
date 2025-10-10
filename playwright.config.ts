import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: resolve(__dirname, '.env.playwright') });
dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests', // Path to your tests folder
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000 // Timeout for expect() assertions
  },
  fullyParallel: true, // Run tests in parallel
  retries: 1, // Retry failed tests once
  reporter: 'html', // Generate HTML report
  use: {
    baseURL: 'https://example.com', // Your app's base URL
    headless: isCI ? true : false, // Run headless in CI to avoid X server dependency
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // Take screenshots on failure
    video: 'on', // Record video for every test
    trace: 'retain-on-failure', // Keep trace on failure
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  outputDir: 'test-results/', // Folder for screenshots, traces, etc.
});