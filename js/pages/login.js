import {login} from '../auth.js'

export function loginPage() {
    return `
    <div class="login-page">
        <div class="login-container">
            <h1>Log in</h1>
            <p class="welcome-text">Welcome Back</p>
            <form id="login-form">
                <div class="input-group">
                    <input type="email" id="email" placeholder="Enter your email">
                </div>
       
                <div class="input-group">
                    <input type="password" id="password" placeholder="Enter your password">
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    `;
}

export function attachLoginHandlers() {
    setTimeout(() => {
        const form = document.getElementById("login-form");
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
                login(email, password);
            });
        } else {
            console.error("Форма логина не найдена!");
        }
    }, 0);
}

