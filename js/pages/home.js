import {logout} from '../auth.js'
export function homePage() {
    return `
        <h2>Главное меню</h2>
        <nav>
            <a href="#currency">Курс валют</a> |
            <a href="#video">Видео</a> |
            <a href="#timer">Таймер</a>
        </nav>
        <button id="logout-btn">Выйти</button>
    `;
}

export function attachLogoutHandlers (){
    setTimeout(() => {
        const button = document.getElementById("logout-btn")
        if (button) {
            button.addEventListener("click", logout);
        }
    }, 0)
}


