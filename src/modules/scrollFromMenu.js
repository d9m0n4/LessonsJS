'use strict';
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
const srcollFromMenu = () => {
    const scrolls = document.querySelectorAll('menu > ul > li > a');
    scrolls.forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};

export default srcollFromMenu;
