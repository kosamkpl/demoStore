import  {expect, type Locator, type Page} from '@playwright/test';

export class FiltersSection {  
    readonly page: Page;

    readonly categoryList: Locator;
    readonly homeLink: Locator;
    readonly clothesLink: Locator;
    readonly accessoriesLink: Locator;
    readonly artLink: Locator;
    readonly graphicCornerLink: Locator;
    readonly studioDesignLink: Locator;

    readonly inStockCheckbox: Locator;
    readonly sizeSCheckbox: Locator;
    readonly sizeMCheckbox: Locator;
    readonly sizeLCheckbox: Locator;    
    readonly priceRangeOption: Locator;
    readonly priceSlider: Locator;
    readonly colorWhiteCheckbox: Locator;
    readonly colorBlackCheckbox: Locator;

    constructor(page: Page) {   
        this.page = page;   
        this.categoryList = page.locator('iframe[name="framelive"]').contentFrame().locator('ol');
        this.homeLink = page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Home', exact: true });
        this.clothesLink = page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Clothes', exact: true });     
        this.accessoriesLink = page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Accessories' });
        this.artLink = page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Art' });
        this.graphicCornerLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Graphic Corner', exact: true });
        this.studioDesignLink = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Studio Design' });   
        this.inStockCheckbox = page.locator('iframe[name="framelive"]').contentFrame().locator('span').filter({ hasText: '' }).first();

        this.sizeSCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByText('S (2)');
        this.sizeMCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByText('M (2)');  
        this.sizeLCheckbox = page.locator('iframe[name="framelive"]').contentFrame().getByRole('link',{name:'L (2)',exact:true});        

        this.priceRangeOption = page.locator('iframe[name="framelive"]').contentFrame().getByRole('listitem').filter({ hasText: '€10.00 - €' });
        this.priceSlider = page.locator('iframe[name="framelive"]').contentFrame().locator('.ui-slider-range');     
        this.colorWhiteCheckbox = page.locator('iframe[name="framelive"]').contentFrame().locator('label').filter({ hasText: 'White (1)' })
        this.colorBlackCheckbox = page.locator('iframe[name="framelive"]').contentFrame().locator('label').filter({ hasText: 'Black (1)' })
    }     

    async clearOutFilters() {
        await this.page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: ' Clear all' }).click();
    }
};

// await page.locator('iframe[name="framelive"]').contentFrame().locator('ol').getByText('Accessories').click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Home', exact: true }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Clothes', exact: true }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByText('Accessories', { exact: true }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('#left-column').getByRole('link', { name: 'Art' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Graphic Corner', exact: true }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('link', { name: 'Studio Design' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('span').filter({ hasText: '' }).first().click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: ' Clear all' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('span').filter({ hasText: '' }).nth(2).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: ' Clear all' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('listitem').filter({ hasText: '€10.00 - €' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('.ui-slider-range').click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('span').filter({ hasText: '' }).nth(4).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: ' Clear all' }).click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('checkbox', { name: '40x60cm (3)' }).check();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('li:nth-child(2) > .facet-label > .custom-checkbox').click();
// await page.locator('iframe[name="framelive"]').contentFrame().locator('li:nth-child(3) > .facet-label > .custom-checkbox').click();
// await page.locator('iframe[name="framelive"]').contentFrame().getByRole('button', { name: ' Clear all' }).click();