import { $ } from '@wdio/globals'

class SearchPage {
    // 2. Кнопка-тригер для відкриття пошуку
    get searchTrigger() { 
        return $('[data-target="qbsearch-input.inputButton"]') 
    }

    // 3. Інпут для введення запиту (з'являється після кліку на тригер)
    get searchInput() { 
        return $('#query-builder-test') 
    }

    // 4. Селектор для результатів пошуку (клас Box-sc та текст "car")
    // Використовуємо XPath для перевірки класу та тексту (регістронезалежно через translate)
    get carSearchResult() {
        return $('//div[contains(@class, "Box-sc") and contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "car")]')
    }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }
}

export default new SearchPage();