import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: resolve(__dirname, '.env.playwright') });
dotenv.config();

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
    headless: false, // Show the browser during testing
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
