'use strict';

let books = document.querySelector('.books'),
    book = document.querySelectorAll('.book');
    

// 2 - 0 1-1 6-2 4-3 3-4 5-5 


books.insertBefore(book[1], book[0]);
books.insertBefore(book[4], book[2]);
books.insertBefore(book[3], book[2]);
books.insertBefore(book[5], book[2]);

document.body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

console.log(book);

book[4].querySelector('a').innerHTML = "Книга 3. this и Прототипы Объектов";

document.querySelector('.adv').remove();

let bookUl2 = book[0].querySelector('ul'),
    bookLi2 = bookUl2.querySelectorAll('li');
    
bookUl2.insertBefore(bookLi2[6], bookLi2[4]);
bookUl2.insertBefore(bookLi2[8], bookLi2[4]);
bookUl2.insertBefore(bookLi2[2], bookLi2[10]);

let bookUl5 = book[5].querySelector('ul'),
    bookLi5 = bookUl5.querySelectorAll('li');

bookUl5.insertBefore(bookLi5[9], bookLi5[1]);
bookUl5.insertBefore(bookLi5[3], bookLi5[1]);
bookUl5.insertBefore(bookLi5[4], bookLi5[1]);
bookUl5.insertBefore(bookLi5[5], bookLi5[8]);

let newList = document.createElement('li');
newList.textContent = 'Глава 8: За пределами ES6';

let bookUl6 = book[2].querySelector('ul'),
    bookLi6 = bookUl6.querySelectorAll('li');
bookUl6.insertBefore(newList, bookLi6[9]);