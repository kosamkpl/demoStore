import { test, expect } from '@playwright/test';
import { RegisterPage } from '../objects/pages/register/register-page';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: ' Sign in' }).click();
    const registerLink = await frame.locator('a').filter({ hasText: 'No account? Create one here' });
    await registerLink.click();
    registerPage = new RegisterPage(page);

});

test('registration fails on name field', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await registerPage.registerMaleUser('12354', 'Smitch', 'mail@mail.com', 'testpassword1234*', '10/10/2000', true, true);
    await frame.getByText('Invalid format.').waitFor();
    expect(frame.getByText('Invalid format.')).toBeVisible();
});
test('male user registered', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await registerPage.registerMaleUser('Mark', 'Smitch', 'mail@mail.com', 'testpassword1234*', '10/10/2000', true, true);
    await frame.getByRole('link', { name: 'Mark Smitch' }).waitFor();
    expect(frame.getByRole('link', { name: 'Mark Smitch' })).toBeVisible();
    await page.context().storageState({ path: '.auth.json' });
});
test('mail has been already used', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await registerPage.registerMaleUser('Mark', 'Smitch', 'mail@mail.com', 'testpassword1234*', '10/10/2000', true, true);
    await frame.getByText('The email is already used').waitFor();
    expect(frame.getByText('The email is already used')).toBeVisible();
});

test('navigate to login from register page', async ({ page }) => {
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await registerPage.navigateToLogin();
    await frame.getByRole('button', { name: 'Sign in' }).waitFor();
    expect(frame.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
