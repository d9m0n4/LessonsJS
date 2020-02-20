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
        

      popupBtn.forEach(element => {
        element.addEventListener('click', () => {
          let clientWidth = document.documentElement.clientWidth;
          if (clientWidth > 768) {
            popup.style.display = 'block';
            openAnim();
          } else {
            popup.removeAttribute('style');
            popup.style.display = 'block';
          }
        });
      });

      popupClose.addEventListener('click', () => {
        let clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 768) {
          closeAnim();
        } else {
          popup.style.display = 'none';
        }
      });
    
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
        count = 0;
      }
    }
    
  };      

  togglePopup();

  // Scroll Button // 
  const startServicesBtn = document.querySelector('a[href="#service-block"]'),
        serviceBlock = document.querySelector(`#service-block`);
  
  
    startServicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      serviceBlock.scrollIntoView({
        block: 'start',
        behavior: 'smooth'});
    });



  // Scroll menu items // 

  // v.1 // 
  // const connectBlock = document.querySelector('#connect');
  // let count = 0,
  //   requestId;

  // let connect = connectBlock.getBoundingClientRect().top + window.pageYOffset;

  // const animConnect = () => {
  //   count = window.scrollY;
  //   requestId = requestAnimationFrame(animConnect);
  //   if (count <= connect) {
  //     count += 100;
  //   }
  //   scrollTo(0, count);
  //   if (count >= connect) {
  //     cancelAnimationFrame(requestId);
  //   }
  // };

  // const menuItem = document.querySelector('menu > ul > li');
  // menuItem.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   animConnect();
  // });

  // v.2 // 
  const scrolls = document.querySelectorAll('a[href^="#"]');
  scrolls.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const blockID = anchor.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  
  


  
});


