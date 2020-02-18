document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let date = new Date(),
      week = ['Понедельник', 'Втроник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      day = date.getDay(),
      hours = date.getHours(),
      newYear = new Date('1 January 2021'),
      remainDate = Math.ceil((newYear.getTime() - date.getTime()) /1000 / 60 / 60 / 24),
      timeOfDay = '';

  let a = document.createElement('span');
  function update() {
    let date = new Date();
    let time = date.toLocaleTimeString('en');
    a.innerHTML = `${timeOfDay} <br>
    Сегодня: ${week[day - 1]} <br>
    Текущее время: ${time} <br>
    До Нового Года осталось: ${remainDate} дней`;
  }

  function clockStart() {
    setInterval(update, 1000);
    update();
  }

  clockStart();
    
    if (hours > 3 && hours < 12) {
      timeOfDay = 'Доброе утро!';
    } else if (hours >= 12 && hours < 18) {
      timeOfDay = 'Добрый день!';
    } else if (hours >= 18 && hours <= 23) {
      timeOfDay = 'Добрый вечер!';
    } else {
      timeOfDay = 'Доброй ночи';
    }

  document.body.appendChild(a); 
});



