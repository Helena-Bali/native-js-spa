const EMAIL = "admin@gmail.com";
const PASSWORD = "1357";

export function login(email, password) {
    if (email === EMAIL && password === PASSWORD) {
        const token = {
            value: "my_secure_token",
            expires: Date.now() + 60 * 60 * 1000
        };
        localStorage.setItem("token", JSON.stringify(token));
        window.location.hash = "#currency";
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
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.remove();
        }
    }
}

setInterval(checkAuth, 5000);
