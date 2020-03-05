import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'remove-polyfill';


import calc from './modules/calculator';
import countTimer from './modules/countTimer';
import ourTeam from './modules/hoverCommand';
import scrollBtn from './modules/scrollButton';
import srcollFromMenu from './modules/scrollFromMenu';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import validCalcForm from './modules/validCalcForm';
// import validSendForm from './modules/validSendForm';
import Validator from './plugins/validator';
import maskPhone from './plugins/maskPhone';
// Timer //
countTimer();
// Menu //
toggleMenu();
// popup //
togglePopup();
// Scroll Button //
scrollBtn();
// Scroll menu items //
srcollFromMenu();
// Tabs //
tabs();
// Slider //
slider();
// Command //
ourTeam();
//calc//
calc();
validCalcForm();
//send form//
sendForm();
// validSendForm();
// validSendForm();
maskPhone('#form3-phone');
maskPhone('#form1-phone');
maskPhone('#form2-phone');


const validForm1 = new Validator({
    selector: '#form1',
    pattern: {},
    method: {
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        // 'form1-phone': [
        //     ['notEmpty'],
        //     ['pattern', 'phone']
        // ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ]
    }
});
const validForm2 = new Validator({
    selector: '#form2',
    pattern: {},
    method: {
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        // 'form2-phone': [
        //     ['notEmpty'],
        //     ['pattern', 'phone']
        // ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
});

const validForm3 = new Validator({
    selector: '#form3',
    pattern: {},
    method: {
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        // 'form3-phone': [
        //     ['notEmpty'],
        //     ['pattern', 'phone']
        // ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ]
    }
});
validForm1.init();
validForm2.init();
validForm3.init();
