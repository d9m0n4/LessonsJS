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
  
const menu = document.querySelector('menu'), 
      menuItems = menu.querySelectorAll('ul>li'),
      body = document.querySelector('body');
  
  body.addEventListener('click', (event) => {
    let target = event.target;
    if (target.closest('.menu')) {
      menu.classList.toggle('active-menu');
    } else if (target.closest('.close-btn') || !target.closest('menu')) {
      menu.classList.remove('active-menu');
    } else {
      menuItems.forEach(item => {
        if (item.contains(target)){
          menu.classList.toggle('active-menu');
        }
      });
    }
  });
}; 
  toggleMenu();

  // popup // 
  
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

    popup.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.popup-content');
        if (!target) {
          closeAnim();
        }
    });
          
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
  const scrolls = document.querySelectorAll('menu > ul > li > a');
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

  // Tabs // 

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toogleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
     target = target.closest('.service-header-tab');
        if (target) {
          tab.forEach((item, i) => {
            if (item === target) {
              toogleTabContent(i);
            }
          });   
        }
    });
  };
  tabs();

  // Slider // 

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          slider = document.querySelector('.portfolio-content'),
          ul = document.querySelector('.portfolio-dots');
          
    let currentSlide = 0,
            interval;
        
    
    const sliderDots = () => {
      slide.forEach((item, i) =>{
        let li = document.createElement('li');
        li.classList.add('dot');
        ul.appendChild(li);
        if (i === 0) {
          li.classList.add('dot-active');
        }
      });
    };
    sliderDots();

    let dot = document.querySelectorAll('.dot');
    
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')){
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')) {
          stopSlide();
        }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
          startSlide();
      }
    });

    startSlide(2000);
  };

  slider();


  
});


