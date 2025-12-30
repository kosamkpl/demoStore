import  {expect, type Locator, type Page} from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly showPasswordButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signInButton: Locator;
    readonly signOutButton: Locator; 

    constructor(page: Page) {   
        this.page = page;
        this.emailInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Password input' });
        this.showPasswordButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Show' });
        this.forgotPasswordLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Forgot your password?' });
        this.signInButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Sign in' });
        this.signOutButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Sign out' });       
    }


    async performLogin(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    } 
    
    async performLogout() {
        await this.signOutButton.click();
    }
}
