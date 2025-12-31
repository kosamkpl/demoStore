import { expect, type Locator, type Page } from '@playwright/test';

export class UserPage {
    readonly page: Page;
    readonly informationLink: Locator;
    readonly addFirstAddressLink: Locator;
    readonly orderHistoryLink: Locator;
    readonly creditSlipsLink: Locator;
    readonly myWishlistsLink: Locator;
    readonly gdprPersonalLink: Locator;
    readonly myAlertsLink: Locator;
    readonly signOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.informationLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' Information' });
        this.addFirstAddressLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' Add first address' });
        this.orderHistoryLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' Order history and details' });
        this.creditSlipsLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' Credit slips' });
        this.myWishlistsLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'favorite My wishlists' });
        this.gdprPersonalLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'account_box GDPR - Personal' });
        this.myAlertsLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' My alerts' });
        this.signOutButton = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: ' Sign out' });
    }
    async performLogout() {
        await this.signOutButton.click();
    }
}
//**Other bookmarks will be implemented in future */