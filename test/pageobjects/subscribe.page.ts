import { $ } from '@wdio/globals'

class SubscribePage {
    // Елемент на головній сторінці
    get footerSubscribeLink() { 
        return $('a.btn-muted-mktg=Subscribe') 
    }

    // Елементи на сторінці підписки
    get mainHeading() { 
        return $('h1[class*="Primer_Brand__Heading-module"]') 
    }
    
    get emailInput() { 
        return $('input[type="email"]') 
    }

    get countrySelect() { 
        return $('select[class*="Primer_Brand__Select-mo"]') 
    }

    get finalSubscribeBtn() { return $('[class*="Primer_Brand__Button-module__Button"]') }

    get successHeading() { 
        return $('#hero-section-brand-heading') 
    }

    // Генерація пошти (використаємо ту саму логіку)
    generateRandomEmail() {
        return `test_user_${Math.random().toString(36).substring(2, 7)}@gmail.com`;
    }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }
}

export default new SubscribePage();