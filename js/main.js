import { renderPage } from "./router.js";
import { checkAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    checkAuth(); // Проверка токена
});

window.addEventListener("hashchange", renderPage);
