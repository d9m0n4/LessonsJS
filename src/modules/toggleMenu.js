const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        body = document.querySelector('body');

    body.addEventListener('click', event => {
        const target = event.target;
        if (target.closest('.menu')) {
            menu.classList.toggle('active-menu');
        } else if (target.closest('.close-btn') || !target.closest('menu')) {
            menu.classList.remove('active-menu');
        } else {
            menuItems.forEach(item => {
                if (item.contains(target)) {
                    menu.classList.toggle('active-menu');
                }
            });
        }
    });
};
export default toggleMenu;
