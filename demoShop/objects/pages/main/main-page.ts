import { expect, type Locator, type Page } from '@playwright/test';
export class mainPage {
    readonly page: Page;
    readonly clothesLink: Locator;
    readonly accessoriesLink: Locator;
    readonly artLink: Locator;
    readonly menLink: Locator;
    readonly womenLink: Locator;
    readonly languageDropdownButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clothesLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Clothes' });
        this.accessoriesLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Accessories' });
        this.artLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Art' });
        this.menLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Men', exact: true });
        this.womenLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Women', exact: true });
        this.languageDropdownButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: 'Language dropdown' });
        this.searchInput = page.locator('iframe[name="framelive"]').contentFrame().getByRole('textbox', { name: 'Search' });
    }
}
