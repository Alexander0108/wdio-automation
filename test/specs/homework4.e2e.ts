import { douMain, douJobs, douProject } from '../pageobjects/dou.page.ts'
import { expect } from '@wdio/globals'

describe('Homework 4: DOU.ua Sequential Navigation', () => {

    it('should complete all 9 steps of the DOU flow successfully', async () => {
        
        // 1. Зайти на сайт
        console.log('>>> Step 1: Opening DOU.ua');
        await douMain.open();

        // 2. Натиснути на кнопку "Зарплати"
        console.log('>>> Step 2: Clicking Salaries link');
        await douMain.salariesLink.click();

        // 3. Перевірити чи є текст "I Квартиль"
        console.log('>>> Step 3: Checking "I Квартиль" text');
        await douJobs.quartileText.waitForDisplayed({ timeout: 10000 });
        await expect(douJobs.quartileText).toBeDisplayed();

        // 4. Перейти за посиланням "Робота"
        console.log('>>> Step 4: Navigating to Jobs section');
        await douJobs.jobsLink.click();

        // 5. Перевірити наявність кнопки "Знайти"
        console.log('>>> Step 5: Checking Search button');
        await douJobs.searchButton.waitForExist({ timeout: 5000 });
        await expect(douJobs.searchButton).toBeDisplayed();

        // 6. Натиснути на кнопку "Знайти"
        console.log('>>> Step 6: Clicking Search');
        await douJobs.searchButton.click();

        // 7. Перевірити наявність тексту "Швидкий перехід:"
        console.log('>>> Step 7: Checking Quick Transition text');
        await douJobs.quickTransitionText.waitForDisplayed({ timeout: 5000 });
        await expect(douJobs.quickTransitionText).toBeDisplayed();

        // 8. Натиснути на кнопку DefTech
        console.log('>>> Step 8: Clicking DefTech button');
        await douMain.dynamicProjectButton.scrollIntoView({ block: 'center' });
        await douMain.dynamicProjectButton.click();

        // 9. Підтвердити наявність "Новини" та "Блоги"
        console.log('>>> Step 9: Final validation of News and Blogs links');
        // Робота з блоком Новин
        const newsBlock = await douProject.newsBlock;
        await newsBlock.waitForDisplayed({ timeout: 5000 });
        await newsBlock.scrollIntoView({ block: 'center' }); // ЦЕНТРУЄМО БЛОК
        
        const newsLink = await douProject.newsLink;
        await expect(newsLink).toBeClickable();
        console.log('>>> News link is interactive inside its block.');

        // Робота з блоком Блогів (Колоністи)
        const blogsBlock = await douProject.blogsBlock;
        await blogsBlock.waitForDisplayed({ timeout: 5000 });
        await blogsBlock.scrollIntoView({ block: 'center' }); // ЦЕНТРУЄМО БЛОК
        
        const blogsLink = await douProject.blogsLink;
        await expect(blogsLink).toBeClickable();
        console.log('>>> Blogs link is interactive inside its block.');
        
        console.log('>>> SUCCESS: All 9 steps completed! 🎉');
    });
});