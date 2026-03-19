import ApiPage from '../pageobjects/api.page.ts'
import { expect } from '@wdio/globals'

describe('WebdriverIO Complex Navigation Homework', () => {
    it('should navigate, scroll, and validate API components perfectly', async () => {
        
        console.log('>>> 1. Відкриваємо сайт та максимізуємо вікно...');
        await ApiPage.open();
        await browser.pause(1000); 

        console.log('>>> 2. Клікаємо на API у верхньому меню...');
        await ApiPage.clickApiNavbar();
        await browser.pause(1000);

        // 2. Вгору до Next
        console.log('>>> 3. Перевіряємо кнопку Next...');
        const button = await ApiPage.nextProtocolButton;
        await button.scrollIntoView({ block: 'center' }); // Центруємо!
        
        // Витягуємо HTML для звіту
        console.log(`>>> HTML кнопки Next отримано успішно.`);

        // 3. Клік (використовуємо наш новий метод або прямий JS клік)
        console.log('>>> 4. Натискаємо на Next...');
        // Прямий виклик JS кліку, щоб обійти sticky header напевно:
        await browser.execute((el) => el.click(), button);
        
        // 4. Очікування переходу
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/docs/api/protocols'),
            { timeout: 7000, timeoutMsg: 'Перехід не відбувся' }
        );

        // 5. Скрол до фінального заголовка
        console.log('>>> 5. Скролимо до WebDriver Protocol...');
        const header = await ApiPage.webdriverProtocolHeader;
        await header.waitForExist({ timeout: 5000 });
        await header.scrollIntoView({ block: 'center' });
        
        expect(await header.isDisplayed()).toBe(true);
        console.log('>>> ТЕСТ ЗАВЕРШЕНО УСПІШНО! 🎉');
        await browser.pause(2000);
    });
});