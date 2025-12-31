import { test, expect } from '@playwright/test';
import { mainPage } from '../objects/pages/main/main-page';
import { FiltersSection } from '../objects/sections/clothes-filters-section';


let mainpage: mainPage;
let filtersSection: FiltersSection;

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    mainpage = new mainPage(page);
});
test('filter out clothes size M, black color', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'Clothes' }).click();
    await frame.getByRole('checkbox', { name: 'M (2)' }).check();
    await frame.getByRole('checkbox', { name: 'Black (1)' }).check();
    await frame.getByText('There is 1 product.').waitFor();
    expect(frame.getByText('There is 1 product.')).toBeVisible();
    expect(frame.getByText('Active filters')).toBeVisible();
    expect(frame.getByText('Size: M ')).toBeVisible();
    expect(frame.getByText('Color: Black ')).toBeVisible();
    expect(frame.getByText('Hummingbird printed t-shirt')).toBeVisible();
});

test('clear out all filters', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'Clothes' }).click();
    await frame.getByRole('checkbox', { name: 'M (2)' }).check();
    await frame.getByRole('checkbox', { name: 'Black (1)' }).check();
    await frame.getByText('There is 1 product.').waitFor();
    expect(frame.getByText('There is 1 product.')).toBeVisible();
    filtersSection = new FiltersSection(page);
    await filtersSection.clearOutFilters();
    await frame.getByText('There are 2 products.').waitFor();
    expect(frame.getByText('There are 2 products.')).toBeVisible();
    expect(frame.getByText('Active filters')).not.toBeVisible();
});

