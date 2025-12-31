import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly mrRadio: Locator;
    readonly mrsRadio: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly birthdateInput: Locator;
    readonly offersCheckbox: Locator;
    readonly termsCheckbox: Locator;
    readonly newsletterCheckbox: Locator;
    readonly privacyCheckbox: Locator;
    readonly saveButton: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mrRadio = page.locator('iframe[name="framelive"]').contentFrame().getByRole('radio', { name: 'Mr.' });
        this.mrsRadio = page.locator('iframe[name="framelive"]').contentFrame().getByRole('radio', { name: 'Mrs.' });
        this.firstNameInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Last name' });
        this.emailInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Password input' });
        this.birthdateInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Birthdate' });
        this.offersCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByRole('checkbox', { name: 'Receive offers from our' });
        this.termsCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByRole('checkbox', { name: 'I agree to the terms and' });
        this.newsletterCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByRole('checkbox', { name: 'Sign up for our newsletter' });
        this.privacyCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByRole('checkbox', { name: 'Customer data privacy The' });
        this.saveButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Save' });
        this.loginLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Log in instead!' });
    }
    async registerMaleUser(firstName: string, lastName: string, email: string, password: string, birthdate: string, terms: boolean, privacy: boolean) {
        await this.mrRadio.check();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.birthdateInput.fill(birthdate);
        await this.termsCheckbox.check();
        await this.privacyCheckbox.check();
        await this.saveButton.click();
    };
    async registerFemaleUser(firstName: string, lastName: string, email: string, password: string, birthdate: string, terms: boolean, privacy: boolean) {
        await this.mrsRadio.check();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.birthdateInput.fill(birthdate);
        await this.termsCheckbox.check();
        await this.privacyCheckbox.check();
        await this.saveButton.click();
    };
    async navigateToLogin() {
        await this.loginLink.click();
        await this.page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Sign in' }).waitFor();
    }
}

