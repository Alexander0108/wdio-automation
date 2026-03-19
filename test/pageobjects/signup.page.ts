import { $ } from '@wdio/globals'

class SignUpPage {
    // Селектори
    get signUpBtn() { return $('a.HeaderMenu-link--sign-up') }
    get signupForm() { return $('#signup-form-fields') }
    
    get emailInput() { return $('#email') }
    get passwordInput() { return $('#password') }
    get loginInput() { return $('#login') }

    get cookieBanner() { return $('#wcpConsentBannerCtrl') }
    get acceptCookiesBtn() { return $('#wcpConsentBannerCtrl button.erL690_8JwUW-R4bJRcfl') }

    async handleCookies() {
        // Чекаємо секунду, щоб банер встиг з'явитися, якщо він є
        await browser.pause(1000); 
        if (await this.cookieBanner.isDisplayed()) {
            console.log('>>> LOG: Cookie banner detected. Clearing the path...');
            await this.acceptCookiesBtn.click();
            // Чекаємо, поки він зникне, щоб не "спіймати" помилку на наступному кроці
            await this.cookieBanner.waitForDisplayed({ reverse: true, timeout: 5000 });
        }
    }

    // Селектори випадаючого списку країн
    get countryDropdown() { return $('span.Button-content--alignStart') }
    get countryFilterInput() { return $('#country-dropdown-panel-filter') }
    get ukraineOption() { return $('.ActionListItem-label=Ukraine') }

    get createAccountBtn() { return $('span.Button-content=Create account') }

    // Допоміжний метод для генерації випадкових даних
    generateRandomString(length: number) {
        return Math.random().toString(36).substring(2, 2 + length);
    }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }
}

export default new SignUpPage();