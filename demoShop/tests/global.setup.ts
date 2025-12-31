import { test, expect } from '@playwright/test';
import { RegisterPage } from '../objects/pages/register/register-page';
let registerPage: RegisterPage;
test('Register setup', async ({ page }) => {

    await page.goto('https://demo.prestashop.com/#/en/front')
    await expect(page).toHaveTitle(/PrestaShop/);
    const frame = page.frameLocator('xpath=//iframe[@id="framelive"]');
    await frame.getByRole('link', { name: ' Sign in' }).click();
    const registerLink = await frame.locator('a').filter({ hasText: 'No account? Create one here' });
    await registerLink.click();
    registerPage = new RegisterPage(page);
    await registerPage.registerMaleUser('Mark', 'Smitch', 'mail@mail.com', 'testpassword1234*', '10/10/2000', true, true);
    await frame.getByRole('link', { name: 'Mark Smitch' }).waitFor();
    expect(frame.getByRole('link', { name: 'Mark Smitch' })).toBeVisible();
    await page.context().storageState({ path: '.auth.json' });
}); 