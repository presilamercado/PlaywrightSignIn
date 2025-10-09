import { test, expect } from '@playwright/test';

test('Instagram login button enables when credentials are provided', async ({ page }) => {
  const username = process.env.INSTAGRAM_USERNAME 
  const password = process.env.INSTAGRAM_PASSWORD 

  await page.goto('https://www.instagram.com/accounts/login/');

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
