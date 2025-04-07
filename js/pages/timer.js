import {createSandTimer} from "../components/sandTimer.js";

export function sandTimer() {
    return `
    <div class="timer-page">
        <span class="timer-header">Countdown timer</span>
        <div class="t-container">
        <div class="clock-container">
            <div id="timer-container"><i class="fa">&#xf251;</i></div>
        </div>
            <div class="timer-display">
            <div class="timer-block">
                <div id="hours" class="timer-value">00</div>
                <div class="timer-label">Hours</div>
            </div>
            <div class="timer-block">
                <div id="minutes" class="timer-value">00</div>
                <div class="timer-label">Minutes</div>
            </div>
            <div class="timer-block">
                <div id="seconds" class="timer-value">00</div>
                <div class="timer-label">Seconds</div>
            </div>
        </div>
        <div class="timer-controls">
            <button id="reset-btn" class="timer-button reset">Reset</button>
            <button id="start-btn" class="timer-button">Start</button>
        </div>
        </div>
        </div>
    `;
}

export function initSandTimerPage() {
    let stopTimer = null;
    let isRunning = false;
    let elapsedTime = 0;
    let startTime = null;
    let stopTime = null;

    const startStopBtn = document.getElementById("start-btn");
    const resetBtn = document.getElementById("reset-btn");

    startStopBtn.addEventListener("click", () => {
        if (isRunning) {
            // Остановка таймера
            if (stopTimer) stopTimer();
            stopTime = Date.now();
            startStopBtn.textContent = "Start";
            isRunning = false;
        } else {
            // Запуск таймера
            if (startTime === null) {
                startTime = Date.now() - elapsedTime * 1000;
            } else {
                const delay = Date.now() - stopTime;
                startTime += delay;
            }
            stopTimer = createSandTimer("timer-container", startTime, () => {
                elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            });
            startStopBtn.textContent = "Pause";
            isRunning = true;
        }
    });

    resetBtn.addEventListener("click", () => {
        if (stopTimer) stopTimer();
        startStopBtn.textContent = "Start";
        isRunning = false;
        elapsedTime = 0;
        startTime = null;
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
    });
}
