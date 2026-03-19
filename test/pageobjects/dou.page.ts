import { $ } from '@wdio/globals'

class MainPage {
    get salariesLink() { return $('.b-head a[href*="salaries"]') }
    // Оператор "OR" через кому: знайде перший доступний елемент. Використовуємо саме таку схему оскільки елемент є динамічним.
    get dynamicProjectButton() { 
        return $('a.menu-site__gamedev[title="GameDev"], a.menu-site__deftech[title="DefTech"]') 
    }

    async open() {
        await browser.url('https://dou.ua/')
        await browser.maximizeWindow()
    }
}

class JobsPage {
    get quartileText() { return $('//*[contains(text(), "I Квартиль")]') }
    get jobsLink() { return $('li a[href="https://jobs.dou.ua/"]') }
    get searchButton() { return $('input.btn-search') }
    get quickTransitionText() { return $('//*[contains(text(), "Швидкий перехід:")]') }
}

class ProjectPage {
    // Селектори блоків залишаються тими ж, якщо класи ідентичні на обох доменах
    get newsBlock() { return $('.b-block_news') }
    get blogsBlock() { return $('.b-index-columnisty.b-block') }

    // Посилання з підтримкою обох доменів (GameDev та DefTech)
    get newsLink() { 
        // Шукаємо або посилання з "section=новини", або посилання, що містить "/news/"
        return this.newsBlock.$('a[href*="section=новини"], a[href*="/news/"]') 
    }
    
    get blogsLink() { 
        // Шукаємо посилання, що містить "/blogs/", воно зазвичай спільне для обох
        return this.blogsBlock.$('a[href*="/blogs/"]') 
    }
}

export const douMain = new MainPage();
export const douJobs = new JobsPage();
export const douProject = new ProjectPage();