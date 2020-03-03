const validCalcForm = () => {
    const calcblock = document.querySelector('.calc-block');
    const inputs = calcblock.querySelectorAll('input[type=number]');
    inputs.forEach(item => {
        item.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/[\D]/i, '');
        });
    });
};

export default validCalcForm;
