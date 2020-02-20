document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  // Timer //
  let date;
      date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0);
  function countTimer() {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
      let dateStop = date.getTime(),
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
      if (timer.timeRemaining < 1) {
        date.setDate(date.getDate() + 1);
      }
    }
    
    updateClock();  
    setInterval(updateClock, 1000);
  }
countTimer();

// Menu //
const toggleMenu = () => {
  
const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');
    
    const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
      } else {
        menu.style.transform = `translate(-100%)`;
      }
    };
  btnMenu.addEventListener('click', handlerMenu);
  closeBtn.addEventListener('click', handlerMenu);
  menuItems.forEach(element => element.addEventListener('click', handlerMenu));
}; 
  toggleMenu();

  // popup // 
  
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

    let count = 0,
        requesId;
    
    if (window.innerWidth > 768) {
      console.log(window.innerWidth);

      popupBtn.forEach(element => {
        element.addEventListener('click', () => {
          popup.style.display = 'block';
          openAnim();
        });
      });

      popupClose.addEventListener('click', () => {
        closeAnim();
      });
      
    } else {
      popupBtn.forEach(element => {
        element.addEventListener('click', () => {
          popup.style.display = 'block';
        });
      });

      popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }
    
    function openAnim() {
      requesId = requestAnimationFrame(openAnim);
      if (count < 1) {
        popup.style.opacity = count;
        count += 0.05;
      } else {
        cancelAnimationFrame(requesId);
      }
    }

    function closeAnim(){
      requesId = requestAnimationFrame(closeAnim);
      if (count > 0) {
        popup.style.opacity = count;
        count -= 0.05;
      } else {
        cancelAnimationFrame(requesId);
        popup.style.display = 'none';
      }
    }
    
  };      

  togglePopup();

  // ScrollButton // 
  let a,
      count = 0,
      btnS = document.querySelector('#service-block');
    let animScroll = () => {
      a = requestAnimationFrame(animScroll);
      if (count < 10) {
        window.scrollTop += count;
        count++;
      } else {
        cancelAnimationFrame(a);
      }
      console.log(count); 
    };
  btnS.addEventListener('click', animScroll());

});


