import { test, expect } from '@playwright/test';

test.describe('Audible storefront', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.audible.com.au/');
  });

  test('Search flow shows book detail', async ({ page }) => {
    await expect(page).toHaveTitle(/Audible/);

    const searchBox = page.getByRole('combobox', { name: /Search for an audiobook/ });
    await searchBox.click();
    await searchBox.fill('Alchemised');
    await page.keyboard.press('Enter');

    const resultsList = page.locator('#product-list-a11y-skiplink-target');
    await expect(resultsList).toBeVisible();
    const firstResult = resultsList.getByRole('article').first();
    await expect(firstResult.getByRole('heading')).toContainText('Alchemised');
    await firstResult.getByRole('link').click();

    await expect(page.getByRole('heading', { name: 'Alchemised', exact: true })).toBeVisible();
  });

  test('Filtering fantasy results by language Spanish', async ({ page }) => {
    const searchBox = page.getByRole('combobox', { name: 'Search for an audiobook,' });
    await searchBox.click();
    await searchBox.fill('fantasy');
    await searchBox.press('Enter');

    await page.getByRole('button', { name: 'Submit Search' }).click();
    await page.getByRole('link', { name: 'Spanish Spanish' }).click();

    const spanishResultLink = page.getByRole('link', { name: 'Alchemised (Spanish Edition)', exact: true });
    await spanishResultLink.click({ button: 'right' });

    await expect(spanishResultLink).toBeVisible();
  });
});