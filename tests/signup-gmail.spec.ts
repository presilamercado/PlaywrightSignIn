
import { test, expect } from '@playwright/test';

test.skip('Gmail sign up - fill form only', async ({ page }) => {
  // Navigate to Gmail sign-up page
  await page.goto('https://www.instagram.com/');

  await expect(page.getByRole('textbox', { name: 'First name' })).toBeVisible();

  // Fill basic fields
  await page.getByRole('textbox', { name: 'First name' }).fill("Ella")
  await page.getByRole('textbox', { name: 'Last name (optional)' }).fill("Playwright")
  await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();



  await page.getByRole('button', { name: 'Next' }).click()
  await page.waitForTimeout(5000); // waits for 60 seconds


  //return
  // await page.fill('input[name="firstName"]', 'Ella');
  // await page.fill('input[name="lastName"]', 'Playwright');
  // await page.fill('input[name="Username"]', 'ella.playwright'); // unique username
  await page.fill('input[name="Passwd"]', 'ellaPlaywright!123');
  await page.fill('input[name="ConfirmPasswd"]', 'testPlaywright');

  // email :  ella.playwright@yahoo.com
  // password : ellaPlaywright!123 // testPlaywright!123
  // username :ella.playwright

  // // Click the "Next" button
  //await page.getByRole('button', { name: 'Next' }).click();

  // // Optional: Take a screenshot after clicking nextß
  await page.waitForTimeout(1000); // waits for 60 seconds
  await page.getByRole('combobox', { name: 'Month' }).locator('div').click()
  await page.getByRole('option', { name: 'October' }).click()
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Day' }).fill("28")
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Year' }).fill("1960")


  await page.getByRole('combobox', { name: 'Gender' }).click();
  await page.getByRole('option', { name: 'Female' }).click();

  await page.getByRole('button', { name: 'Next' }).click()

  await page.getByRole('radio', { name: 'ellaplaywright@gmail.com' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Password' }).fill('ellaPlaywright!123')
  await page.getByRole('textbox', { name: 'Confirm' }).fill('ellaPlaywright!123')
  await page.getByRole('checkbox', { name: 'Show password' }).click()
  await page.getByRole('button', { name: 'Next' }).click()
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'gmail-signup-filled.png' });

  // Assert that we reach the CAPTCHA page or are blocked
  await expect(page).toHaveURL(/signup/);
});


//npx playwright test tests/signup-gmail.spec.ts
