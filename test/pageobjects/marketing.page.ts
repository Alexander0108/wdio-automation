import { $ } from '@wdio/globals'

class MarketingPage {
    // Шукаємо посилання, де клас містить вказаний текст
    get brandButton() { 
        return $('a[class*="Primer_Brand__Button-module"]') 
    }

    // Кнопка з типом submit та конкретним текстом всередині
    get tryNowButton() { 
        return $('button[type="submit"]*=Try now') 
    }

    // Елемент з класом, що містить SessionsAuthHeader
    get authHeader() { 
        return $('div[class*="SessionsAuthHeader"], header[class*="SessionsAuthHeader"]') 
    }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }
}

export default new MarketingPage();