
'use strict';

class DomElement {
  constructor({ selector, height, width, bg, fontSize, text }) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
  }
  createElement() {
    let tagName = this.selector[0] === '.' ? 'div' : 'p', 
      createdElem = document.createElement(tagName);
    if (this.selector[0] === '.') {
      tagName = 'div';
      createdElem.className = this.selector.slice(1);
    }
    else {
      tagName = 'p';
      createdElem.id = this.selector.slice(1);
    }
    createdElem.style.cssText = 'height:' + this.height + ';' +
      'width:' + this.width + ';' +
      'color:' + this.bg + ';' +
      'font-size:' + this.fontSize;
    createdElem.innerText = this.text;
    document.querySelector('body').appendChild(createdElem);
  }
}
console.dir(DomElement);








let newDom = new DomElement({selector: '.block', height: '250px', width: '250px', bg: 'red', fontSize: '16px', text: 'asdasdasdasdasdasdasdasdasd' });
let newDom1 = new DomElement({selector: '#p', height: '200px', width: '250px', bg: 'orange', fontSize: '16px', text: 'zxczxczxczxczxczxczxczxczxc' });
  
newDom.createElement();
newDom1.createElement();