import { expect } from '@wdio/globals'

describe("WebdriverIO API Page Homework", () => {

    xit("should complete all steps of the assignment professionally", async () => {
        // 1. Перехід за посиланням
        await browser.url('https://webdriver.io/docs/api');

        // 2. Перевірка заголовка "Introduction"
        const mainHeader = $('h1');
        await expect(mainHeader).toHaveText('Introduction');

        // 3. Перевірка посилання для тексту "WebDriver"
        const webDriverLink = $('=WebDriver'); 
        await expect(webDriverLink).toHaveAttribute('href', '/docs/api/webdriver');

        // 4. Робота з пошуком
        const searchButton = $('.DocSearch-Button'); 
        await searchButton.click();

        // Пошукове вікно з'являється з анімацією, тому додамо очікування
        const searchInput = $('#docsearch-input');
        await searchInput.waitForDisplayed();

        // Пишемо текст
        await searchInput.setValue('all is done');
        
        // Перевіряємо чи текст з'явився
        await expect(searchInput).toHaveValue('all is done');

        // Очищаємо поле
        await searchInput.clearValue();
        
        // Фінальна перевірка, що поле пусте
        await expect(searchInput).toHaveValue('');
        
        await browser.pause(2000); // додаємо паузу щоб побачити результат
    });

});