'use strict';
const countTimer = () => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0);

    function getTimeRemaining() {
        const dateStop = date.getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60) < 10 ? '0' + Math.floor(timeRemaining % 60) :
                Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60) < 10 ? '0' + Math.floor((timeRemaining / 60) % 60) :
                Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) < 10 ? '0' + Math.floor(timeRemaining / 60 / 60) :
                Math.floor(timeRemaining / 60 / 60);
        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };
    }

    function updateClock() {
        const timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
        if (timer.timeRemaining < 1) {
            date.setDate(date.getDate() + 1);
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
};
export default countTimer;