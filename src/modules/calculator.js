/* eslint-disable strict */
const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        clacSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');
    let count = 0,
        interval = 0;

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

        // const animation = () => {
        //     // let totalNumber = +document.getElementById('total').textContent;
        //     // const counter = totalValue.textContent;
        //     // const iter = Math.ceil(Math.abs(totalNumber - total) / 20);

        //     // if (Math.abs(total - totalNumber) < iter) {
        //     //     totalNumber = total;
        //     //     totalValue.textContent = +total;
        //     // }
        //     if (total > count) {
        //         count++;
        //         requestAnimationFrame(animation);
        //     } else if (total < count) {
        //         count--;
        //         requestAnimationFrame(animation);
        //     }
        //     totalValue.textContent = +count;

        // };
        // requestAnimationFrame(animation);
        interval = requestAnimationFrame(countSum);
        if (total >= 0) {
            totalValue.textContent = total;
            if (count < total) {
                count += 1;
                totalValue.textContent = count;
            } else if (count > total) {
                count -= 1;
                totalValue.textContent = count;
            } else {
                cancelAnimationFrame(interval);
            }
        }
    // const animTotal = () => {
    //     const interval = setInterval(() => {
    //         time = (1000 / count);
    //         if (count < total) {
    //             count += 1;
    //             totalValue.textContent = count;
    //         } else if (count > total) {
    //             count -= 1;
    //             totalValue.textContent = count;
    //         } else if (count === total) {
    //             clearInterval(interval);
    //         }
    //     }, time);
    // };
    // animTotal();
    // console.log(total);
    };
    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('.calc-type') || target.matches('.calc-square') ||
      target.matches('.calc-day') || target.matches('.calc-count')) {
            interval = requestAnimationFrame(countSum);
        }
    });
};

export default calc;