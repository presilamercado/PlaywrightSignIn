import { test, expect } from '@playwright/test';

test('Instagram sign up form fill', async ({ page }) => {
  await page.goto('https://www.instagram.com/accounts/emailsignup/');

  // Wait for the form to load
  await page.waitForSelector('input[name="emailOrPhone"]');

  // Fill out the form
  await page.fill('input[name="emailOrPhone"]', 'ellaplaywright@gmail.com');
  await page.fill('input[name="fullName"]', 'Ella Playwright');
  await page.fill('input[name="username"]', 'ella.playwright');
  await page.fill('input[name="password"]', 'ellaPlaywright123');

  // Click Sign Up (Instagram may block or rate-limit actual form submission)
  //getByRole('button', { name: 'Sign up' })
  await page.click('button[type="submit"]');



  // Assert the inputs have correct values
  expect(await page.inputValue('input[name="emailOrPhone"]')).toBe('ellaplaywright@gmail.com');
  await page.getByRole('button', { name: 'Sign up' }).click()
  await page.waitForTimeout(3000);

  // Optional: Take a screenshot of the filled form
  await page.screenshot({ path: 'signup-form.png' });
});




