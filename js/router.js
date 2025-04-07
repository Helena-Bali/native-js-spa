import { attachLoginHandlers, loginPage } from "./pages/login.js";
import { currencyPage, initCurrencyPage, attachLogoutHandlers } from "./pages/currency.js";
import {initVideoPage, videoPage} from "./pages/video.js";
import {initSandTimerPage, sandTimer} from "./pages/timer.js";
import { checkAuth } from "./auth.js";

const routes = {
    login: { render: loginPage, init: attachLoginHandlers },
    currency: { render: currencyPage, init: () => {
            initCurrencyPage();
            attachLogoutHandlers();
        }},
    video: { render: videoPage, init: initVideoPage },
    timer: { render: sandTimer, init: initSandTimerPage }
};

export function renderPage() {
    checkAuth();
    const pageName = location.hash.slice(1) || "login";
    const content = document.getElementById("content");
    const existingNavbar = document.querySelector(".navbar");

    document.body.setAttribute("data-page", pageName);

    if (pageName !== "login" && !existingNavbar) {
        const navbar = document.createElement("div");
        navbar.classList.add("navbar");
        navbar.innerHTML = `
           <div class="logo">Logo</div>
            <ul class="nav-links">
                <li data-link="currency">
                <a href="#currency"> <img class="nav-img" src='assets/exchange.png' alt="exchange"/>Exchange rates</a></li>
                <li data-link="video"><a href="#video"><img class="nav-img" src='assets/video.png' alt="video"/>Video player</a></li>
                <li data-link="timer"><a href="#timer"><img class="nav-img" src='assets/hourglass.png' alt="hourglass"/>Countdown timer</a></li>
            </ul>
            <button id="logout-btn" class="logout-btn"><img class="nav-img" src='assets/ion_exit-outline.png' alt="exit"/>Log out</button>
        `;
        app.prepend(navbar);
    }

    const navItems = document.querySelectorAll(".nav-links li");
    navItems.forEach(li => {
        if (li.dataset.link === pageName) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });

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
