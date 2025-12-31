import { test, expect } from '@playwright/test';
import { SignInPage } from '../objects/pages/login/login-page';
import { UserPage } from '../objects/pages/main/user-page';

let loginPage: SignInPage;
let userPage: UserPage;
test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.locator("//a[text()='Sign in']").click();
    loginPage = new SignInPage(page);
    userPage = new UserPage(page);
});
test('user logged in succcesfully', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await loginPage.performLogin('mail@mail.com', 'testpassword1234*');
    await frame.getByRole('link', { name: 'Mark Smitch' }).waitFor();
    expect(frame.getByRole('link', { name: 'Mark Smitch' })).toBeVisible();
});
/**
 * Reload test to verify that user stays logged in after page reload
 * It's only for demonstration purposes, demo page does not save state after reload.
 */

// test('user stays logged in after page reload', async({page})=>{
//     await loginPage.performLogin('mail@mail.com', 'testpassword1234*');
//     await page.context().addCookies(
//         [{
//         name: 'test_cookie',
//         value: 'CheckForPermission',
//         domain: ".doubleclick.net",
//         path: '/'  
//         }]
//     );
//     await page.reload();
//     await page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Mark Smitch' }).waitFor();
//     expect(page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Mark Smitch' })).toBeVisible();
//});

test('user logout successfully', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await loginPage.performLogin('mail@mail.com', 'testpassword1234*');
    await frame.getByRole('link', { name: 'Mark Smitch' }).waitFor();
    await userPage.performLogout();
    await frame.getByRole('button', { name: 'Sign in' }).waitFor();
    expect(frame.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
test('user login fails due to wrong password', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await loginPage.performLogin('mail@mail.com', 'wrongpassword');
    await frame.getByText('Authentication failed.').waitFor();
    expect(frame.getByText('Authentication failed.')).toBeVisible();
});
