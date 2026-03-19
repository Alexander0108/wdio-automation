import { $ } from '@wdio/globals'

class SignUpPage {
    // Селектори
    get signUpBtn() { return $('a.HeaderMenu-link--sign-up') }
    get signupForm() { return $('#signup-form-fields') }
    
    get emailInput() { return $('#email') }
    get passwordInput() { return $('#password') }
    get loginInput() { return $('#login') }

    // Селектори випадаючого списку країн
    get countryDropdown() { return $('span.Button-content--alignStart') }
    get countryFilterInput() { return $('#country-dropdown-panel-filter') }
    get ukraineOption() { return $('.ActionListItem-label=Ukraine') }

    get createAccountBtn() { return $('span.Button-content=Create account') }

    // Допоміжний метод для генерації випадкових даних
    generateRandomString(length: number) {
        return Math.random().toString(36).substring(2, 2 + length);
    }

    async open() {
        await browser.url('https://github.com/')
        await browser.maximizeWindow()
    }
}

export default new SignUpPage();