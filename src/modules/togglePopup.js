'use strict';
const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');

    popup.addEventListener('click', event => {
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
            const clientWidth = document.documentElement.clientWidth;
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
        const clientWidth = document.documentElement.clientWidth;
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

    function closeAnim() {
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

export default togglePopup;
