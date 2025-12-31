import { test, expect } from '@playwright/test';
import { mainPage } from '../objects/pages/main/main-page';

let mainpage: mainPage;
test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    mainpage = new mainPage(page);
})
test('search for an existing item', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    const searchInput = frame.getByRole('textbox', { name: 'Search' });
    await searchInput.fill('Best');
    await searchInput.press('Enter');
    await frame.getByText('There are 7 products.').waitFor();
    expect(frame.getByText('There are 7 products.')).toBeVisible();
});

test('search for a non-existing item', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    const searchInput = frame.getByRole('textbox', { name: 'Search' });
    await searchInput.fill('nonexistingitem');
    await searchInput.press('Enter');
    await frame.getByRole('heading', { name: 'No matches were found for' }).waitFor();
    expect(frame.getByRole('heading', { name: 'No matches were found for' })).toBeVisible();
}); 