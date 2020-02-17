document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  let date = new Date(),
      week = ['Понедельник', 'Втроник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      day = date.getDay(),
      currentTime = date.toLocaleTimeString('en'),
      hours = date.getHours(),
      newYear = new Date('1 January 2021'),
      remainDate = Math.ceil((newYear.getTime() - date.getTime()) /1000 / 60 / 60 / 24),
      timeOfDay = '';

    if (hours > 3 && hours < 12) {
      timeOfDay = 'Доброе утро!';
    } else if (hours >= 12 && hours < 18) {
      timeOfDay = 'Добрый день!';
    } else if (hours >= 18 && hours <= 23) {
      timeOfDay = 'Добрый вечер!';
    } else {
      timeOfDay = 'Доюрой ночи';
    }

   let a = document.createElement('span');
    a.innerHTML = `${timeOfDay} <br>
    Сегодня: ${week[day - 1]} <br>
    Текущее время: ${currentTime} <br>
    До Нового Года осталось: ${remainDate} дней`; 



  document.body.appendChild(a);
    
});


