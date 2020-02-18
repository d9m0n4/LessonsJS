document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60) < 10 ? '0' + Math.floor(timeRemaining % 60)
                    : Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60) < 10 ? '0' + Math.floor((timeRemaining / 60) % 60) 
                    : Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60) < 10 ? '0' + Math.floor(timeRemaining / 60 / 60) 
                    : Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining ,hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      if (timer.timeRemaining < 0) {
        clearInterval(intervalTime);
        let d = new Date(Date.parse(new Date()) + 86400 * 1000);
        countTimer(d);
      }
    }
    let intervalTime = setInterval(updateClock, 1000);

    
    
    updateClock();  
    
  }

countTimer('02 19 2020');
});

