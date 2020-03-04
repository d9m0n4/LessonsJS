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
import validSendForm from './modules/validSendForm';
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
validSendForm();



