import {login} from '../auth.js'

export function loginPage() {
    return `
        <h2>Авторизация</h2>
       <form id="login-form">
            <input type="text" id="username" placeholder="Логин">
            <input type="password" id="password" placeholder="Пароль">
            <button type="submit">Войти</button>
        </form>
    `;
}

export function attachLoginHandlers() {
    setTimeout(() => {
        const form = document.getElementById("login-form");
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                login(username, password);
            });
        } else {
            console.error("Форма логина не найдена!");
        }
    }, 0);
}
