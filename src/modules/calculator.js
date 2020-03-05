'use strict';
const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        clacSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +clacSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
        }

        const sumAnimated = (current, target, progress) => {
            totalValue.textContent =
                Math.floor(+current + (target - current)  * progress);
        };
        const at = sumAnimated.bind(0, totalValue.textContent, total);

        const animate = ({ timing, draw, duration }) => {
            const start = performance.now();
            const animate = time => {
                // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;
                // вычисление текущего состояния анимации
                const progress = timing(timeFraction);
                draw(progress); // отрисовать её
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        };

        const circ = timeFraction => 1 - Math.sin(Math.acos(timeFraction));
        animate({ timing: circ, draw: at, duration: 900 });
    };
    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('.calc-type') || target.matches('.calc-square') ||
      target.matches('.calc-day') || target.matches('.calc-count')) {
            countSum();
        }
    });
};

export default calc;
