let startButton = document.querySelector('.start-button');
let resetButton = document.querySelector('.reset-button');
let square = document.querySelector('.square');
square.style.width = '50px';
square.style.height = '50px';
square.style.backgroundColor = 'red';
square.style.position = 'relative';
square.style.transform = 'translate(50%, 50%)';

let count = 0;
let requestID;

let increaseAnimate = function () {
  requestID = requestAnimationFrame(increaseAnimate);
  count++;
  if (count < 200) {
    square.style.left = count  + 'px';
    square.style.top = count  + 'px';
  
  }else if (count < 850){
    square.style.left = count + 'px';
    square.style.borderRadius = (count - 370) + count + '%';
  } else {
    cancelAnimationFrame(requestID);
  }
}

let isAnimateProccess = true;
startButton.addEventListener('click', function () {
  if (isAnimateProccess) {
    requestID = requestAnimationFrame(increaseAnimate);
    isAnimateProccess = false;
  } else {
    isAnimateProccess = true;
    cancelAnimationFrame(requestID);
  }
});


resetButton.addEventListener('click', () => {
  square.style.left = '0px';
  square.style.top = '0px';
  count = 0;
  isAnimateProccess = true;
});