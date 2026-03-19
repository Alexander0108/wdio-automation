import GithubPage from '../pageobjects/github.page.ts'
import { expect } from '@wdio/globals'

describe('Homework 3: GitHub Functionality Tests', () => {

    beforeEach(async () => {
        await GithubPage.open()
    })

    it('TC-1: Should search for webdriverio repository', async () => {
        await GithubPage.search('webdriverio')
        await expect($('div.search-title')).toBeDisplayed()
    })

    it('TC-2: Should show error for invalid credentials', async () => {
        await browser.url('https://github.com/login');
        
        // Вводимо будь-який неіснуючий логін та пароль, щоб обійти HTML5 валідацію
        await GithubPage.loginInput.setValue('wrong-user-name-123');
        await GithubPage.passwordInput.setValue('wrong-password-123');
        
        // Клікаємо на кнопку входу
        const submitBtn = await GithubPage.signInBtn;
        await submitBtn.click();
        
        // Тепер сервер поверне помилку, і плашка .js-flash-alert з'явиться
        await GithubPage.errorFlash.waitForDisplayed({ timeout: 5000 });
        
        await expect(GithubPage.errorFlash).toBeDisplayed();
        await expect(GithubPage.errorFlash).toHaveText(expect.stringContaining('Incorrect username or password'));
    });

    it('TC-3: Should navigate to Pricing page', async () => {
    await GithubPage.pricingLink.scrollIntoView({ block: 'center' });
    await GithubPage.pricingLink.click();
    
    // Використовуємо регулярний вираз для перевірки частини URL
    await expect(browser).toHaveUrl(expect.stringContaining('/pricing'));
    })

    it('TC-4: Should open Trending repositories', async () => {
        await browser.url('https://github.com/explore');
        
        const trending = await GithubPage.trendingTab;
        await trending.waitForExist({ timeout: 5000 });
        
        // Скролимо до вкладки, щоб вона була в полі зору
        await trending.scrollIntoView({ block: 'center' });
        
        // Якщо звичайний клік не спрацював (як у логах), б'ємо JS-кліком
        await browser.execute((el) => el.click(), trending);
        
        await expect(browser).toHaveUrl(expect.stringContaining('/trending'));
    });

    it('TC-5: Should scroll and click Terms link in footer', async () => {
        await GithubPage.footerTermsLink.scrollIntoView({ block: 'center' })
        await GithubPage.footerTermsLink.click()
        await expect(browser).toHaveUrl(expect.stringContaining('/site-policy'))
    })
})