import {test, expect } from '@playwright/test';
import { mainPage } from '../objects/pages/main/main-page';

test.beforeEach(async({page})=>{
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    mainpage = new mainPage(page);
});
let mainpage: mainPage;

test('navigate throug top menu bar', async({page})=>{
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'Clothes' }).hover();
    await frame.getByRole('link', { name: 'Men', exact: true }).waitFor();
    await page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Men', exact: true }).click();
    await frame.getByText('Home Clothes Men').waitFor();
    expect(frame.getByText('Home Clothes Men')).toBeVisible();
    await frame.getByText('Hummingbird printed t-shirt').waitFor();
    await frame.getByText('Hummingbird printed t-shirt').click();
    await frame.getByText('Home  Clothes  Men  Hummingbird printed t-shirt').waitFor();
    expect (frame.getByText('Home  Clothes  Men  Hummingbird printed t-shirt')).toBeVisible();
});

test('navigate to New Products and sort by', async({page})=>{
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'All new products' }).click();
    await frame.getByText('Home New products').waitFor();
    expect(frame.getByText('Home New products')).toBeVisible();
    await frame.getByRole('button', { name: 'Sort by selection' }).click();
    await frame.getByRole('link', { name: 'Relevance' }).click();
    await frame.getByRole('button', { name: 'Sort by selection' }).waitFor();
    expect(frame.getByRole('button', { name: 'Sort by selection' })).toBeVisible();
    await frame.getByText('Hummingbird printed t-shirt').waitFor();
    await frame.getByText('Hummingbird printed t-shirt').click();
    await frame.getByText('Home  Clothes  Men  Hummingbird printed t-shirt').waitFor();
    expect (frame.getByText('Home  Clothes  Men  Hummingbird printed t-shirt')).toBeVisible();
});
