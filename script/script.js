'use strict';

let startBtn = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncome = document.getElementsByClassName('additional_income-value')[0],
    additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriod = document.getElementsByClassName('income_period-value')[0],
    targetMonth = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    nameInputs = document.querySelectorAll('input[placeholder = Наименование]'),
    sumInputs = document.querySelectorAll('input[placeholder = Сумма]'),
    cancel = document.getElementById('cancel'),
    leftInps = document.querySelectorAll('.data input[type=text]'),
    pluses = document.querySelectorAll('.data button'),
    data = document.querySelector('.data'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');


class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start() {
    if (salaryAmount.value === '') {
      return;
    }
      this.budget = +salaryAmount.value;
    
    const inpss = document.querySelectorAll('input[type = text]');
    for (let i = 0; i < inpss.length; i++) {
      inpss[i].setAttribute('disabled', '1');
    }
    depositBank.setAttribute('disabled', true);
    depositCheck.setAttribute('disabled', true);
    pluses.forEach((item) => {
      item.setAttribute('disabled', true);
    });
    cancel.style.display = 'block';
    startBtn.style.display = 'none';
    // leftInps.forEach(function (item) {
    //   item.setAttribute('disabled', '1');
    // });

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.localStorage();
    this.cookie();
    this.showResult();
    // appData.getInfoDeposit();
    
  }

  addExpIncBlock(btn){
    const stStr = btn.classList[1].split('_')[0];
    let items = document.querySelectorAll(`.${stStr}-items`);
    const cloneItems = items[0].cloneNode(true);
    let cloneInps = cloneItems.querySelectorAll('input');
      for(let i = 0; i < cloneInps.length; i++){
        cloneInps[i].value = '';
      }
    items[0].parentNode.insertBefore(cloneItems, btn);
    items = document.querySelectorAll(`.${stStr}-items`);
    if (stStr === 'expenses'){
      expensesItems = document.querySelectorAll(`.${stStr}-items`);
    } else {
      incomeItems = document.querySelectorAll(`.${stStr}-items`);
    }
    if (items.length === 3){
      btn.style.display = 'none';
    }
    nameInputs = data.querySelectorAll('input[placeholder=Наименование]');
    sumInputs = data.querySelectorAll('input[placeholder=Сумма]');
    this.ruItems();
  }

  getExpInc(){
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  
  getAddExpInc(){
    const count = item => {
      let value, 
          type;
        if (typeof item === 'string') {
          value = item;
          type = 'addExpenses';
        } else {
          value = item.value;
          type = 'addIncome';
        }
        value.trim();
        if (value !== ''){
          this[type].push(value);
        }
        
    };
    const addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(count);
    addIncomeItem.forEach(count);
    this.arrToStr();
  }

  getExpensesMonth() {
    let sum = 0;
    for (const key in this.expenses) {
      sum = sum + this.expenses[key];
    }
    this.expensesMonth = sum;
  }
  showResult() {
    const _this = this;
    budgetMonth.value = localStorage.getItem('budgetMonth'); 
    budgetDay.value = +Math.ceil(localStorage.getItem('budgetDay'));
    expensesMonth.value = +localStorage.getItem('expensesMonth');
    additionalExpenses.value = localStorage.getItem('addExpenses');
    additionalIncome.value = localStorage.getItem('addIncome');
    targetMonth.value = Math.ceil(localStorage.getItem('getTargetMonth'));
    incomePeriod.value = localStorage.getItem('calcSaveMoney');
    periodSelect.addEventListener('change', () => {
      incomePeriod.value = _this.calcSaveMoney();
    });
    
  }
  changePeriod(e) {
    const change = e.target.value;
    periodAmount.textContent = change;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  reset() {
    const inputs = document.querySelectorAll('input');
    const incomeIs = document.querySelectorAll('.income-items');
    const expensesIs = document.querySelectorAll('.expenses-items');
    inputs.forEach((item) => {
      item.value = '';
    });

    if (incomeIs.length !== 1) {
      for (let i = 1; i < incomeIs.length; i++) {
        incomeIs[i].parentNode.removeChild(incomeIs[i]);
      }
    }
    if (expensesIs.length !== 1) {
      for (let i = 1; i < expensesIs.length; i++) {
        expensesIs[i].parentNode.removeChild(expensesIs[i]);
      }
    }
      pluses.forEach((item) => {
      item.removeAttribute('disabled');
      if (item.hasAttribute('style')) {
        item.removeAttribute('style');
      }
    });
      leftInps.forEach((item) => {
      item.removeAttribute('disabled');
    });
      periodSelect.value = 1;
      periodAmount.textContent = '1';
      startBtn.style.display = 'block';
      cancel.style.display = 'none';
      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.incomeMonth = 0;
      this.deposit = false;
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;

    depositBank.removeAttribute('disabled');
    depositBank.style.display = 'none';
    depositBank.value = '';
    depositAmount.style.display = 'none';
    depositCheck.checked = false;
    depositCheck.removeAttribute('disabled');
    depositPercent.style.display = 'none';

    localStorage.clear();
    
    
    document.cookie = 'budgetMonth' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'budgetDay' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'expensesMonth' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'addIncome' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'addExpenses' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'getTargetMonth' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'calcSaveMoney' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'isLoad' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
  }
  calcSaveMoney() {
    
    return this.budgetMonth * periodSelect.value;
    
  }
  ruItems() {
    nameInputs.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^а-яА-ЯёЁ .?!,]/i, '');
      });
    });
    sumInputs.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[\D]/i, '');
      });
    });
  }
  arrToStr() {
   this.addExpenses
   .map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1);
    });
  }

  getInfoDeposit(){
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    }else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
    depositPercent.addEventListener('input', (e) => {
      if (!isNaN(parseFloat(e.target.value)) && (e.target.value > 0 && e.target.value < 100)) {
        startBtn.removeAttribute('disabled');
      } else {
        startBtn.setAttribute('disabled', true);
        depositPercent.value = '';
        alert('Введите корректное значение в поле проценты');
      }
    });
  }

  depositHandler(){
    if (depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    }else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  localStorage(){
    localStorage.setItem('budgetMonth', this.budgetMonth);
    localStorage.setItem('budgetDay', this.budgetDay);
    localStorage.setItem('expensesMonth', this.expensesMonth);
    localStorage.setItem('addExpenses', this.addExpenses.join(', '));
    localStorage.setItem('addIncome', this.addIncome);
    localStorage.setItem('getTargetMonth', this.getTargetMonth());
    localStorage.setItem('calcSaveMoney', this.calcSaveMoney());
  }
  cookie() {
    document.cookie = `isLoad=true;`;
    document.cookie = `budgetMonth=${this.budgetMonth}; `;
    document.cookie = `budgetDay=${this.budgetDay};`;
    document.cookie = `expensesMonth=${this.budgetMonth}; `;
    document.cookie = `addExpenses=${this.addExpenses.join(', ')}; `;
    document.cookie = `addIncome=${this.addIncome};`;
    document.cookie = `getTargetMonth=${this.getTargetMonth()};`;
    document.cookie = `calcSaveMoney=${this.calcSaveMoney()};`;
    
  }
  
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  checkCookie() {
  
    let coockie = document.cookie;
    let ls = localStorage;
    let coockieArr = coockie.split(';');
    let a = 0;
    for (let i = 0; i < ls.length; i++) {
      coockieArr.forEach(item => {
        let coockieItem = item.split('=');
        if (coockieItem[0].trim() === ls.key(i).trim()){
          a++;
        } 
      });
    }
    if (a < localStorage.length) {
      appData.reset();
    }
    
  }
  
  eventsListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.cookie !== '') {
        this.showResult();
        const inpss = document.querySelectorAll('input[type = text]');
        for (let i = 0; i < inpss.length; i++) {
          inpss[i].setAttribute('disabled', '1');
        }
        depositBank.setAttribute('disabled', true);
        depositCheck.setAttribute('disabled', true);
        pluses.forEach((item) => {
          item.setAttribute('disabled', true);
        });
        cancel.style.display = 'block';
        startBtn.style.display = 'none';
      }
    });

    cancel.addEventListener('click', this.reset.bind(this));
    startBtn.addEventListener('click', this.start.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    expensesPlus.addEventListener('click', () =>{
      this.addExpIncBlock(expensesPlus);
    });
    incomePlus.addEventListener('click', () => {
      this.addExpIncBlock(incomePlus);
    });
    periodSelect.addEventListener('change', this.changePeriod);
    
  }
  
}

const appData = new AppData();

setInterval(appData.checkCookie, 1000);
appData.ruItems();
appData.eventsListeners();
// appData.showResult();
// appData.showResult()
// appData.ruItems();
// sumInputs.forEach(function(item){
//   item.addEventListener('input', function(){
//     item.value = item.value.replace(/\D/, '');
//   });
// });






//----- консоль лог----//

// if (appData.getTargetMonth() > 0) {
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяц');
// } else {
//   console.log('Цель не будет достигнута');
// }



  // console.log(appData.calcSaveMoney());

  // console.log(appData.addExpenses);




// console.log(comma);

// for (const key in appData) {
//   console.log("Наша программа включает в себя данные:" + key + '-' + appData[key]);
    
// }



