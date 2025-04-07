export function createSandTimer(containerId, startTime, onStop) {
    const container = document.getElementById(containerId);
    const hoursElem = document.getElementById("hours");
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");

    container.innerHTML = `<i class="fa">&#xf251;</i>`;

    let elapsed = 0;
    let intervalId = null;

    function updateTimer() {
        const now = Date.now();
        elapsed = Math.floor((now - startTime) / 1000);
        const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");

        hoursElem.textContent = hours;
        minutesElem.textContent = minutes;
        secondsElem.textContent = seconds;

        // Обновление иконки песочных часов
        if (elapsed % 3 === 0) {
            container.innerHTML = `<i class="fa">&#xf251;</i>`;
        } else if (elapsed % 3 === 1) {
            container.innerHTML = `<i class="fa">&#xf252;</i>`;
        } else {
            container.innerHTML = `<i class="fa">&#xf253;</i>`;
        }
    }

    // Старт таймера
    intervalId = setInterval(updateTimer, 1000);

    return function stop() {
        clearInterval(intervalId);
        if (onStop) onStop();
    };
}
