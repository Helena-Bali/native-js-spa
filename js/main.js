import { renderPage } from "./router.js"; // Импортируем функцию рендера страниц
import { checkAuth } from "./auth.js"; // Проверяем авторизацию

// При загрузке страницы проверяем авторизацию и рендерим нужную страницу
document.addEventListener("DOMContentLoaded", () => {
    checkAuth(); // Проверка токена
});

// Перерисовываем страницу при изменении хэша (роутинга)
window.addEventListener("hashchange", renderPage);
