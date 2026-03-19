import { $ } from '@wdio/globals'

class GithubPage {
    // Селектори для Головної та Пошуку
    get searchButton() { return $('.search-input-container') }
    get searchInput() { return $('#query-builder-test') }
    
    // Селектори для Логіну
    get loginLink() { return $('a[href="/login"]') }
    get loginInput() { return $('#login_field') }
    get passwordInput() { return $('#password') }
    get signInBtn() { return $('input[type="submit"]') }
    get errorFlash() { return $('.js-flash-alert') }

    // Селектори для Навігації та Explore
    get pricingLink() { return $('nav').$('*=Pricing') }
    get trendingTab() { return $('a=Trending') }
    get footerTermsLink() { return $('a=Terms') }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }

    async search(text: string) {
        await this.searchButton.click()
        await this.searchInput.setValue(text)
        await browser.keys('Enter')
    }
}

export default new GithubPage()