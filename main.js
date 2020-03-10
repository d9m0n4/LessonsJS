const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const size = document.getElementById('size');


size.addEventListener('change', event => ctx.lineWidth = event.target.value);

color.addEventListener('input', () => ctx.strokeStyle = color.value)

canvas.addEventListener('mousemove', (event) => {
  const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;

        if (event.buttons > 0) {
          ctx.beginPath()
          ctx.lineCap = "round";
          ctx.moveTo(x, y);
          ctx.lineTo(x - mx, y - my);
          ctx.stroke();
          ctx.closePath();
        }
});

const canvas2 = document.getElementById('canvas-2');
const ctx2 = canvas2.getContext('2d');

ctx2.lineWidth = 10;

ctx2.beginPath();
ctx2.arc(90, 175, 50, 0.5 * Math.PI, 0.44 * Math.PI, false);
ctx2.strokeStyle = "blue";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(200, 175, 50, 1.03 * Math.PI, 0.45 * Math.PI, false);
ctx2.strokeStyle = "black";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(200, 175, 50, 0.45 * Math.PI, 0.97 * Math.PI, false);
ctx2.strokeStyle = "black";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(310, 175, 50, 1.03 * Math.PI, 0.97 * Math.PI, false);
ctx2.strokeStyle = "red";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(145, 225, 50, 1.5 * Math.PI, 1.97 * Math.PI, false);
ctx2.strokeStyle = "orange";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(145, 225, 50, 0.03 * Math.PI, 1.44 * Math.PI, false);
ctx2.strokeStyle = "orange";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(255, 225, 50, 1.5 * Math.PI, 1.97 * Math.PI, false);
ctx2.strokeStyle = "green";
ctx2.stroke();

ctx2.beginPath();
ctx2.arc(255, 225, 50, 0.03 * Math.PI, 1.44 * Math.PI, false);
ctx2.strokeStyle = "green";
ctx2.stroke();


