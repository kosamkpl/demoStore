import {test, expect } from '@playwright/test';
import { mainPage } from '../objects/pages/main/main-page';

test.beforeEach(async({page})=>{
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    mainpage = new mainPage(page);
});
let mainpage: mainPage;
test('add item to cart and check cart price', async({page})=>{
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'Clothes' }).click();
    await frame.getByRole('link', { name: 'Hummingbird printed t-shirt' }).first().click();
    await frame.getByRole('button', { name: 'Add to cart' }).click();
    await frame.getByRole('link', { name: ' Proceed to checkout' }).click();
    await frame.getByRole('link', { name: 'Proceed to checkout' }).click();
    await frame.locator('div.current-price').waitFor();
    await frame.locator('div.product-line-info.product-price.h5.has-discount > div.current-price > span').textContent()
        .then(async(priceText)=>{
            expect(priceText)
                .toBe(await frame.locator('div.card.cart-summary > div.cart-detailed-totals.js-cart-detailed-totals > div.card-block.cart-summary-totals.js-cart-summary-totals > div > span.value').textContent());
    });
});
/**
 * Test will fail intentionaly due to calculation of total price. 
 */
test('add item to cart and change amount to 3 pcs.', async({page})=>{
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: 'Clothes' }).click();
    await frame.getByRole('link', { name: 'Hummingbird printed t-shirt' }).first().click();
    await frame.getByRole('button', { name: 'Add to cart' }).click();
    await frame.getByRole('link', { name: ' Proceed to checkout' }).click();
    await frame.getByRole('link', { name: 'Proceed to checkout' }).click();
    await frame.locator('div.current-price').waitFor();
    await frame.locator('input.js-cart-line-product-quantity.form-control').fill('3').then(async()=>{
        await frame.locator('input.js-cart-line-product-quantity.form-control').press('Tab');
        await page.waitForTimeout(2000);
    });
    
    await frame.locator('div.product-line-info.product-price.h5.has-discount > div.current-price > span').textContent()
        .then(async(priceText)=>{
            if (priceText !== null) {
                return parseFloat(priceText.replace('€',''));
            }
        })
        .then(async(singlePrice)=>{
            const calculatedPrice = singlePrice! * 3;
            return calculatedPrice;
        })
        .then (async(calculatedPrice)=>{
            await frame.locator('div.card.cart-summary > div.cart-detailed-totals.js-cart-detailed-totals > div.card-block.cart-summary-totals.js-cart-summary-totals > div > span.value').textContent()
                .then(async(totalPrice) =>{
            if(totalPrice !== null) {
            expect.soft(calculatedPrice.toFixed(2))
                .toEqual(parseFloat(totalPrice.replace('€','')).toFixed(2));
            return parseFloat(totalPrice!.replace('€','')); 
            }
        });
        })
                    
}); 


