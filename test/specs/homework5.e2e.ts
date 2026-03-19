import SignUpPage from '../pageobjects/signup.page.ts'
import { expect, browser } from '@wdio/globals'
import MarketingPage from '../pageobjects/marketing.page.ts'
import SubscribePage from '../pageobjects/subscribe.page.ts'
import SearchPage from '../pageobjects/search.page.ts'

describe('Homework 5: GitHub Registration Flow', () => {

    it('TC-1: Should fill the signup form with random data and select Ukraine', async () => {
        
        // 1. Перейти на сайт
        await SignUpPage.open();
        console.log('>>> LOG: GitHub opened successfully');

        // 2. Натиснути на Sign up
        await SignUpPage.signUpBtn.click();
        console.log('>>> LOG: Clicked "Sign up" button');

        // 3. Перевірити наявність форми
        await SignUpPage.signupForm.waitForExist({ timeout: 15000 });
        await expect(SignUpPage.signupForm).toExist();
        console.log('>>> LOG: Signup form fields container is present');

        // 4. Заповнення полів випадковими даними
        const randomEmail = `test_${SignUpPage.generateRandomString(5)}@gmail.com`;
        const randomPass = `Pass_${SignUpPage.generateRandomString(8)}!`;
        const randomUser = `User${SignUpPage.generateRandomString(6)}`;

        await SignUpPage.emailInput.setValue(randomEmail);
        console.log(`>>> LOG: Email filled with: ${randomEmail}`);
        
        await SignUpPage.passwordInput.setValue(randomPass);
        console.log('>>> LOG: Password filled');

        await SignUpPage.loginInput.setValue(randomUser);
        console.log(`>>> LOG: Username filled with: ${randomUser}`);

        // 5. Вибір країни (Ukraine)
        await SignUpPage.countryDropdown.waitForClickable();
        await SignUpPage.countryDropdown.click();
        console.log('>>> LOG: Country dropdown opened');

        await SignUpPage.countryFilterInput.setValue('Ukraine');
        console.log('>>> LOG: Typed "Ukraine" in filter');

        await SignUpPage.ukraineOption.waitForDisplayed();
        await SignUpPage.ukraineOption.click();
        console.log('>>> LOG: Selected "Ukraine" from the list');

        // 6. Натиснути Create account
        await SignUpPage.createAccountBtn.scrollIntoView();
        await SignUpPage.createAccountBtn.click();
        console.log('>>> LOG: Clicked "Create account" button');

        // Фінальна перевірка (опціонально, залежить від того, чи з'явиться капча)
        console.log('>>> SUCCESS: TC-1 completed! 🎉');
    });

    it('TC-2: Should navigate through brand button and verify auth header', async () => {
        
        // 1. Перехід на сайт
        await MarketingPage.open();
        console.log('>>> LOG: Step 1: GitHub home page opened');

        // 2. Скрол та клік по Brand Button
        const brandBtn = await MarketingPage.brandButton;
        await brandBtn.waitForExist({ timeout: 5000 });
        await brandBtn.scrollIntoView({ block: 'center' });
        
        // Перевірка видимості
        await expect(brandBtn).toBeDisplayed();
        console.log('>>> LOG: Step 2: Brand Button is visible and centered');
        
        await brandBtn.click();
        console.log('>>> LOG: Step 2: Clicked on Brand Button');

        // 3. Клік на "Try now"
        const tryNow = await MarketingPage.tryNowButton;
        await tryNow.waitForDisplayed({ timeout: 7000 });
        await tryNow.click();
        console.log('>>> LOG: Step 3: Clicked "Try now" submit button');

        // 4. Перевірка SessionsAuthHeader
        const header = await MarketingPage.authHeader;
        await header.waitForExist({ timeout: 7000 });
        
        await expect(header).toBeDisplayed();
        console.log('>>> LOG: Step 4: SessionsAuthHeader is present on the page');

        console.log('>>> SUCCESS: TC-2 completed successfully! 🚀');
    });

    it('TC-3: Should successfully subscribe to the newsletter', async () => {
        
        // 1. Перейти на сайт
        await SubscribePage.open();
        console.log('>>> LOG: Step 1: GitHub home page opened');

        // 2. Скрол до Subscribe, перевірка клікабельності та клік
        const subLink = await SubscribePage.footerSubscribeLink;
        await subLink.scrollIntoView({ block: 'center' });
        await expect(subLink).toBeClickable();
        console.log('>>> LOG: Step 2: Subscribe link is clickable and in view');
        
        await subLink.click();
        console.log('>>> LOG: Step 2: Navigated to subscription page');

        // 3. Перевірка <h1> з частковим збігом класу
        const heading = await SubscribePage.mainHeading;
        await heading.waitForDisplayed({ timeout: 7000 });
        await expect(heading).toExist();
        console.log('>>> LOG: Step 3: Heading with Primer_Brand class is present');

        // 4. Введення випадкового email
        const randomEmail = SubscribePage.generateRandomEmail();
        await SubscribePage.emailInput.setValue(randomEmail);
        console.log(`>>> LOG: Step 4: Random email entered: ${randomEmail}`);

        // 5. Робота з <select> через клавіатуру
        const select = await SubscribePage.countrySelect;
        await select.click(); // Фокусуємося на селекті
        await browser.keys('Ukraine'); // Друкуємо назву країни
        await browser.keys('Enter');   // Підтверджуємо вибір
        console.log('>>> LOG: Step 5: Country "Ukraine" selected via keyboard');

        // 6. Знайти кнопку, проскролити до неї та натиснути
        const finalBtn = await SubscribePage.finalSubscribeBtn;
        
        // Чекаємо наявності в DOM
        await finalBtn.waitForExist({ timeout: 5000 });
        
        // Скролимо до центру екрана
        await finalBtn.scrollIntoView({ block: 'center' });
        await browser.pause(2000);
        console.log('>>> LOG: Step 6: Scrolled to final Subscribe button');
        await browser.pause(2000);

        // Натискаємо
        await finalBtn.click();
        console.log('>>> LOG: Step 6: Final Subscribe button clicked');

        // 7. Перевірка фінального елементу за ID
        const successElem = await SubscribePage.successHeading;
        await successElem.waitForExist({ timeout: 10000 });
        
        await expect(successElem).toBeDisplayed();
        console.log('>>> LOG: Step 7: Success heading #hero-section-brand-heading is visible');

        console.log('>>> SUCCESS: TC-3 completed! 🎉');
    });

    it('TC-4: Should search for "car" and verify results', async () => {
        
        // 1. Перейти на сайт
        await SearchPage.open();
        console.log('>>> LOG: Step 1: GitHub home page opened');

        // 2. Натиснути на кнопку-тригер пошуку
        const trigger = await SearchPage.searchTrigger;
        await trigger.waitForClickable({ timeout: 5000 });
        await trigger.click();
        console.log('>>> LOG: Step 2: Search trigger button clicked');

        // 3. Ввести "car" та натиснути Enter
        const input = await SearchPage.searchInput;
        await input.waitForDisplayed({ timeout: 5000 });
        await input.click(); // Натискаємо перед введенням, як за умовою
        await input.setValue('car');
        await browser.keys('Enter');
        console.log('>>> LOG: Step 3: Typed "car" and pressed Enter');

        // 4. Перевірка наявності хоча б одного елемента з класом Box-sc та текстом "car"
        const result = await SearchPage.carSearchResult;
        
        // Даємо час результатам підвантажитися
        await result.waitForExist({ timeout: 10000 });
        
        // Перевіряємо видимість
        await expect(result).toBeDisplayed();
        console.log('>>> LOG: Step 4: Found a result element with class "Box-sc" containing "car"');

        console.log('>>> SUCCESS: TC-4 completed! Все завдання виконано 🎉');
    });
});