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
    data = document.querySelector('.data');


let AppData = function(){
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

};

AppData.prototype.start = function () {
  if (salaryAmount.value === '') {
    return;
  }
  this.budget = +salaryAmount.value;

  cancel.style.display = 'block';
  startBtn.style.display = 'none';

  let inpss = document.querySelectorAll('input[type = text]');
  for (let i = 0; i < inpss.length; i++) {
    inpss[i].setAttribute('disabled', '1');
  }
  // leftInps.forEach(function (item) {
  //   item.setAttribute('disabled', '1');
  // });
  pluses.forEach(function (item) {
    item.setAttribute('disabled', true);
  });

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();

  // appData.getInfoDeposit();
};
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneExpensesInput = cloneExpensesItem.querySelectorAll('input');
    for (let i = 0; i < cloneExpensesInput.length; i++) {
      cloneExpensesInput[i].value = '';
    }
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
    nameInputs = data.querySelectorAll('input[placeholder=Наименование]');
    sumInputs = data.querySelectorAll('input[placeholder=Сумма]');
    ruItems();
  };
  AppData.prototype.getExpenses = function () {
    let _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cacheExpenses = item.querySelector('.expenses-amount').value;
      if (item !== '' && cacheExpenses !== '') {
        _this.expenses[itemExpenses] = +cacheExpenses;
      }
    });
  };
  AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let cloneIncomeInput = cloneIncomeItem.querySelectorAll('input');
    for (let i = 0; i < cloneIncomeInput.length; i++) {
      cloneIncomeInput[i].value = '';
    }
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

    nameInputs = data.querySelectorAll('input[placeholder=Наименование]');
    sumInputs = data.querySelectorAll('input[placeholder=Сумма]');
    ruItems();
  };
  AppData.prototype.getIncome = function () {
    let _this = this;
    incomeItems.forEach(function (item) {
      let incomeTitle = item.querySelector('.income-title').value;
      let incomeAmount = item.querySelector('.income-amount').value;
      if (incomeTitle !== '' && incomeAmount !== '') {
        _this.income[incomeTitle] = +incomeAmount;
      }
    });
    for (const key in this.income) {
      this.incomeMonth += +this.income[key];

    }
  };
  AppData.prototype.showResult = function () {
    let _this = this;
    budgetMonth.value = +this.budgetMonth;
    budgetDay.value = +Math.ceil(this.budgetDay);
    expensesMonth.value = +this.expensesMonth;
    // additionalExpenses.value = this.addExpenses.join(', ');   
    additionalIncome.value = this.addIncome.join(', ');
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcSaveMoney();
    periodSelect.addEventListener('change', function () {
      incomePeriod.value = _this.calcSaveMoney();
    });
  };
  AppData.prototype.getAddExpenses = function () {
    let addExpenses = addExpensesItem.value.split(',');
    let _this = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
    arrToStr();
  };
  AppData.prototype.getAddIncome = function () {
    let _this = this;
    addIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  };

  AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum = sum + this.expenses[key];
    }
    this.expensesMonth = sum;
    console.log(this.expensesMonth);

  };
  AppData.prototype.changePeriod = function (e) {
    let change = e.target.value;
    periodAmount.textContent = change;
  };

  AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };

  AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
  };

  AppData.prototype.reset = function () {

    let inputs = document.querySelectorAll('input');
    let incomeIs = document.querySelectorAll('.income-items');
    let expensesIs = document.querySelectorAll('.expenses-items');

    inputs.forEach(function (item) {
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

    pluses.forEach(function (item) {
      item.removeAttribute('disabled');
      if (item.hasAttribute('style')) {
        item.removeAttribute('style');
      }
    });

    leftInps.forEach(function (item) {
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
      this.incomeMonth = 0,
      this.deposit = false,
      this.percentDeposit = 0,
      this.moneyDeposit = 0,
      this.budget = 0,
      this.budgetDay = 0,
      this.budgetMonth = 0,
      this.expensesMonth = 0;

  };

  AppData.prototype.calcSaveMoney = function () {
    return this.budgetMonth * periodSelect.value;
  };

  AppData.prototype.eventsListeners = function () {
    cancel.addEventListener('click', appData.reset.bind(appData));
    startBtn.addEventListener('click', appData.start.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData.ruItems));
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('change', appData.changePeriod);
  };


let appData = new AppData();

appData.eventsListeners();

console.log(appData);







function arrToStr() {
  let expToStr = appData.addExpenses.map(function (item) {
    return item.slice(0, 1).toUpperCase() + item.slice(1);
  });
  let comma = expToStr.join(', ');
  additionalExpenses.value = comma;
}

function ruItems() {
  nameInputs.forEach(function (item) {
    item.addEventListener('input', function () {
      item.value = item.value.replace(/[^а-яА-ЯёЁ .?!,]/i, '');
    });
  });
  sumInputs.forEach(function (item) {
    item.addEventListener('input', function () {
      item.value = item.value.replace(/[\D]/i, '');
    });
  });
}

ruItems();


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



