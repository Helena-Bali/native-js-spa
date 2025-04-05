import { createSandTimer } from "../components/sandTimer.js";

export function sandTimer() {
    return `
        <div class="timer-page">
            <h2>Песочные часы</h2>
            <div id="timer-container"></div>
            <div id="timer-info">
                <div id="hours">00</div> :
                <div id="minutes">00</div> :
                <div id="seconds">00</div>
            </div>
            <button id="start-btn">Старт</button>
            <button id="stop-btn">Стоп</button>
        </div>
    `;
}

export function initSandTimerPage() {
    let stopTimer = null;

    document.getElementById("start-btn").addEventListener("click", () => {
        if (stopTimer) stopTimer();
        stopTimer = createSandTimer("timer-container");
    });

    document.getElementById("stop-btn").addEventListener("click", () => {
        if (stopTimer) stopTimer();
    });
}
