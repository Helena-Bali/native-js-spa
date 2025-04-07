import {logout} from "../auth.js";
import { fetchExchangeRates,  BASE_URL } from "../components/currencyLogic.js";

export function currencyPage() {
    return `
        <div class="currency-container">
   <div style="flex-direction: column">
   <div class="currency-header">
        <span class="title">Exchange rates</span>
        <span class="currency-date"><span>${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</span></span>
    </div>
  
            <div class="currency-columns">
            <div>
            <div class="column-name"></div>
                <div class="currency-column">
                    <div id="currency-list" class="table-container"></div>
                </div>
            </div>
            <div>
            <div class="column-name">Best Courses</div>
                <div class="currency-column">
                    <div id="best-courses" class="table-container"></div>
                </div>
            </div>
            <div>
            <div class="column-name">Exchange</div>
                <div class="currency-column">
                    <div id="exchange-list" class="table-container"></div>
                </div>
            </div>
            </div>
</div>
            <div class="currency-converter">
                <h2 class="title">Currency Converter</h2>
                <div id="converter-list">
                    <div class="converter-row">
                        <img src="https://www.forex.pk/flags/USD.gif" alt="USD"
                        >
                        <span class="currency-code">USD</span>
                        <input type="number" id="usd-input" value="1" min="0" step="0.01">
                    </div>
                </div>
                <button class="add-currency">+ Add currency</button>
                <div id="currency-dropdown" class="currency-dropdown" style="display: none;"></div>
            </div>
        </div>`;
}

export function attachLogoutHandlers() {
    setTimeout(() => {
        const button = document.getElementById("logout-btn");
        if (button) {
            button.addEventListener("click", logout);
        }
    }, 0);
}


let intervalId;

export async function initCurrencyPage() {
    try {
        const response = await fetch(`${BASE_URL}/latest/USD`);
        const data = await response.json();
        await fetchExchangeRates();

        intervalId = setInterval(fetchExchangeRates, 30000);
    } catch (error) {
        console.error("Ошибка загрузки курсов валют", error);
    }
}

export function stopCurrencyUpdates() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    window.removeEventListener("hashchange", stopCurrencyUpdates);
}


