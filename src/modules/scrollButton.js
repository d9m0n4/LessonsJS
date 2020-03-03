const scrollBtn = () => {
    const startServicesBtn = document.querySelector('a[href="#service-block"]'),
        serviceBlock = document.querySelector(`#service-block`);
    startServicesBtn.addEventListener('click', e => {
        e.preventDefault();
        serviceBlock.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    });
};

export default scrollBtn;