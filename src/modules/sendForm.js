const sendForm = () => {
    const errorMessage = 'Что то пошло не так';
    const statusMessage = document.createElement('div');
    const successBlock = document.createElement('div');
    const loadingSend = document.createElement('div');
    const BODY = document.querySelector('body');
    statusMessage.style.cssText = 'font-size: 2rem';
    successBlock.style.cssText = `
                                    width: 300px;
                                    height: 300px;
                                    background-image: url(./images/send/1.jpg);
                                    background-size: cover;
                                    margin: 0 auto;
                                    margin-top: 10px;`;
    loadingSend.style.cssText = `height: 30px; 
                                    width: 30px; 
                                    border-radius: 50%;
                                    border-left: none; 
                                    border-right: 2px solid blue;
                                    margin: 0 auto;
                                    margin-top: 10px;`;
    let animate,
        count = 0;
    const loading = () => {
        animate = requestAnimationFrame(loading);
        count += 10;
        loadingSend.style.transform = `rotate(${count}deg)`;
    };
    BODY.addEventListener('submit', e => {
        e.preventDefault();
        const target = e.target;
        statusMessage.remove();
        target.appendChild(loadingSend);
        loading();
        const formData = new FormData(target);
        postData(formData)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                if (target.matches('#form3')) {
                    setTimeout(() => {
                        const popup = document.querySelector('.popup');
                        popup.style.display = 'none';
                        successBlock.remove();
                    }, 3000);
                }
                loadingSend.remove();
                cancelAnimationFrame(animate);
                target.appendChild(statusMessage);
                statusMessage.appendChild(successBlock);
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
                target.reset();
            })
            .catch(error => {
                loadingSend.remove();
                cancelAnimationFrame(animate);
                target.appendChild(statusMessage);
                statusMessage.textContent = errorMessage;
                console.error(error);
            });
    });

    const postData = formData => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: formData
    });
};

export default sendForm;
