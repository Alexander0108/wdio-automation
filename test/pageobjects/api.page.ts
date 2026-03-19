import { $ } from '@wdio/globals'

class ApiPage {
    get apiNavbarLink() { return $('*=API') }
    get footerApiLink() { return $('a.footer__link-item[href="/docs/api"]') }
    get nextProtocolButton() { return $('a.pagination-nav__link--next') }
    
    // Селектор для фінального заголовка за його ID
    get webdriverProtocolHeader() { return $('#webdriver-protocol') }

    async open() {
        await browser.url('https://webdriver.io/')
        await browser.maximizeWindow()
    }

    async clickApiNavbar() {
        const link = await this.apiNavbarLink
        await link.waitForExist({ timeout: 5000 })
        await link.scrollIntoView()
        await link.waitForClickable({ timeout: 5000 })
        await link.click()
    }

    async clickNextButton() {
        const button = await this.nextProtocolButton;
        await button.waitForExist({ timeout: 5000 });
        
        // Скролимо так, щоб кнопка була в центрі
        await button.scrollIntoView({ block: 'center' });
        await browser.pause(1000); 

        try {
            // Пробуємо звичайний клік
            await button.click();
        } catch (error) {
            // Якщо клік intercepted (перехоплений), б'ємо прямим JS-кліком
            console.log('>>> Звичайний клік не пройшов, використовую JS-клік...');
            await browser.execute((el) => el.click(), button);
        }
    }
}

export default new ApiPage()