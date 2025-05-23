export const BASE_URL = "https://open.er-api.com/v6";

export async function fetchExchangeRates() {
    try {
        const response = await fetch(`${BASE_URL}/latest/USD`);
        const data = await response.json();
        const rates = data.rates;

        setupConverter(rates);

        const currencyList = document.getElementById("currency-list");
        const bestCoursesList = document.getElementById("best-courses");
        const exchangeList = document.getElementById("exchange-list");

        if (currencyList && bestCoursesList && exchangeList) {
            currencyList.innerHTML = "<div class='table-header'><span class='column-title'>Currency</span></div>";
            bestCoursesList.innerHTML = "<div class='table-header' style='width: 170px'><span class='column-title'>Surrender</span><span class='column-title'>Buy</span></div>";
            exchangeList.innerHTML = "<div class='table-header'><span class='column-title'>Course</span></div>";

            Object.keys(rates).forEach(currency => {
                const rate = rates[currency];
                const flagUrl = `https://www.forex.pk/flags/${currency}.gif`;

                const currencyElement = document.createElement("div");
                currencyElement.classList.add("table-row");
                currencyElement.innerHTML = `<img src="${flagUrl}" alt="${currency}" class="currency-flag" onerror="this.src='assets/placeholder.png';" alt="Flag">
                    <span class="table-cell">${currency}</span>`;
                currencyList.appendChild(currencyElement);

                const sellRate = (rate * 1.01).toFixed(4);
                const buyRate = (rate * 0.99).toFixed(4);
                const elementBest = document.createElement("div");
                elementBest.classList.add("table-row");
                elementBest.innerHTML = ` <span class="table-cell-bold" >${sellRate}</span> <span class="table-cell-bold">${buyRate}</span>`;
                bestCoursesList.appendChild(elementBest);

                const previousRate = rate * (1 + (Math.random() * 0.02 - 0.01));
                const diff = (rate - previousRate).toFixed(4);
                const formattedDiff = diff > 0 ? `+${diff}` : diff;
                const diffClass = diff >= 0 ? "positive" : "negative";
                const elementExchange = document.createElement("div");
                elementExchange.classList.add("table-row");
                elementExchange.innerHTML = `<span class="table-cell-bold" >${rate.toFixed(4)}</span>
                    <span class="table-cell ${diffClass}">${formattedDiff}</span>
                    <span class="table-cell" style="color: #3C3C434D">${new Date().toTimeString().slice(0, 5)}</span>`;
                exchangeList.appendChild(elementExchange);
            });
        }
    } catch (error) {
        console.error("Ошибка загрузки курсов валют", error);
    }
}

 function setupConverter(rates) {
    const usdInput = document.getElementById("usd-input");
    const converterList = document.getElementById("converter-list");
    const addButton = document.querySelector(".add-currency");
    const dropdown = document.getElementById("currency-dropdown");

    function updateConversion() {
        const usdValue = parseFloat(usdInput.value) || 0;
        document.querySelectorAll(".converter-row[data-currency]").forEach(row => {
            const currency = row.dataset.currency;
            const input = row.querySelector("input");
            if (rates[currency]) {
                input.value = (usdValue * rates[currency]).toFixed(4);
            }
        });
    }

    usdInput.addEventListener("input", updateConversion);

    addButton.addEventListener("click", () => {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        dropdown.innerHTML = Object.keys(rates).map(currency => `
            <div class="dropdown-item" data-currency="${currency}">
                <span>${currency}</span>
            </div>
        `).join('');

        const items = dropdown.querySelectorAll(".dropdown-item");
        items.forEach(item => {
            item.addEventListener("click", () => {
                const currency = item.dataset.currency;
                const row = document.createElement("div");
                row.classList.add("converter-row");
                row.dataset.currency = currency;
                row.innerHTML = `
                    <img src="https://www.forex.pk/flags/${currency}.gif" alt="${currency}">
                    <span class="currency-code">${currency}</span>
                    <input type="number" value="${(rates[currency] * parseFloat(usdInput.value)).toFixed(4)}" disabled>
                `;
                converterList.appendChild(row);
                updateConversion();
                dropdown.style.display = "none";
            });
        });
    });
}
