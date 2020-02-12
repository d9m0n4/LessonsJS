document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  const DomElement = function ({height, width, bg}) {
    this.height = height;
    this.width = width;
    this.bg = bg;
  };
  console.dir(DomElement);

  
  DomElement.prototype.eventListener = function(){
    document.querySelector('body').addEventListener('keydown', function(event){
        let element = document.querySelector('.square');
          if (event.keyCode === 39) {
            element.style.left = parseInt(getComputedStyle(element).left) + 10 + 'px'
          }
          if (event.keyCode === 37) {
            element.style.left = parseInt(getComputedStyle(element).left) - 10 + 'px'
          }
          if (event.keyCode === 38) {
            element.style.top = parseInt(getComputedStyle(element).top) - 10 + 'px'
          }
          if (event.keyCode === 40) {
            element.style.top = parseInt(getComputedStyle(element).top) + 10 + 'px'
          }
      })
  };
  
  DomElement.prototype.createElement = function(){
    let square = document.createElement('div');
    square.className = 'square';

    square.style.cssText = 'height:' + this.height + ';' +
                            'width:' + this.width + ';' +
                            'background-color:' + this.bg + ';' +
                            'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
                            
                            
                                                         
    document.querySelector('body').appendChild(square);
  };
  
  let newDom = new DomElement({height: '200px', width: '200px', bg: 'red'});
  
  newDom.createElement();
  newDom.eventListener();
  console.log(newDom);
  
})


