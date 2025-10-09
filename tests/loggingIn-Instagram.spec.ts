import { test, expect } from '@playwright/test';

test('Instagram login button enables when credentials are provided', async ({ page }) => {
  const username = process.env.INSTAGRAM_USERNAME 
  const password = process.env.INSTAGRAM_PASSWORD 

  const response = await page.goto('https://www.instagram.com/accounts/login/');

  test.skip(response?.status() === 429, 'Instagram rate-limited this session with HTTP 429.');

  await page.waitForLoadState('domcontentloaded');

  const rateLimitedBanner = page.getByText('Too Many Requests', { exact: false });
  const rateLimitVisible = (await rateLimitedBanner.count()) > 0 && (await rateLimitedBanner.first().isVisible());
  if (rateLimitVisible) {
    test.skip(true, 'Instagram displayed the "Too Many Requests" page.');
  }

  const usernameField = page.getByLabel('Phone number, username, or email');
  const passwordField = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Log in', exact: true });

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeDisabled();

  await usernameField.fill(username);
  await expect(loginButton).toBeDisabled();

  await passwordField.fill(password);
  await expect(loginButton).toBeEnabled();

  if (process.env.INSTAGRAM_USERNAME && process.env.INSTAGRAM_PASSWORD) {
    await loginButton.click();
    await expect(page).not.toHaveURL(/accounts\/login/);
  }

  // Assert ß
  await expect(page.getByRole('button', { name: 'Save info' })).toBeVisible();

});
