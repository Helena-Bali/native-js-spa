const USERNAME = "admin";
const PASSWORD = "password";

export function login(username, password) {
    if (username === USERNAME && password === PASSWORD) {
        const token = {
            value: "my_secure_token",
            expires: Date.now() + 60 * 60 * 1000 // 1 час
        };
        localStorage.setItem("token", JSON.stringify(token));
        window.location.hash = "#currency"; // Перенаправляем на главную страницу
    } else {
        alert("Неверные данные!");
    }
}

export function logout() {
    localStorage.removeItem("token");
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.remove();
    }
    window.location.hash = "#login";
}

function isAuthenticated() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token && token.expires > Date.now();
}

export function checkAuth() {
    if (!isAuthenticated() && window.location.hash !== "#login") {
        window.location.hash = "#login";
    }
}

setInterval(checkAuth, 5000); // Проверяем токен каждые 5 секунд
