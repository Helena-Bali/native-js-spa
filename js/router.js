import { attachLoginHandlers, loginPage } from "./pages/login.js";
import { currencyPage, initCurrencyPage, attachLogoutHandlers } from "./pages/currency.js";
import { videoPage } from "./pages/video.js";
import {initSandTimerPage, sandTimer} from "./pages/timer.js";
import { checkAuth } from "./auth.js";

const routes = {
    login: { render: loginPage, init: attachLoginHandlers },
    currency: { render: currencyPage, init: () => {
            initCurrencyPage();
            attachLogoutHandlers();
        }},
    video: { render: videoPage },
    timer: { render: sandTimer, init: initSandTimerPage }
};

export function renderPage() {
    checkAuth();
    const pageName = location.hash.slice(1) || "login";
    const content = document.getElementById("content"); // Теперь контент обновляется здесь

    if (pageName !== "login") {
        const navbar = document.createElement("div");
        navbar.classList.add("navbar");
        navbar.innerHTML = `
            <h2>Навигация</h2>
            <ul>
                <li><a href="#currency">Курсы валют</a></li>
                <li><a href="#video">Видео</a></li>
                <li><a href="#timer">Таймер</a></li>
            </ul>
            <button id="logout-btn">Выйти</button>
        `;
        app.prepend(navbar); // Добавляем навбар в начало #app
    }

    if (routes[pageName]) {
        content.innerHTML = routes[pageName].render();
        if (routes[pageName].init) {
            routes[pageName].init();
        }
    } else {
        content.innerHTML = "<h2>Страница не найдена</h2>";
    }
}

window.addEventListener("hashchange", renderPage);
document.addEventListener("DOMContentLoaded", renderPage);
