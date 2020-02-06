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
    incomeItems = document.querySelectorAll('.income-items');

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {
      if (salaryAmount.value === ''){
        return;
      }
      appData.budget = +salaryAmount.value;
      console.log(salaryAmount.value);

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      
      appData.showResult();
      // appData.getInfoDeposit();
    },

    addExpensesBlock: function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3){
          expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cacheExpenses = item.querySelector('.expenses-amount').value;
          if(item !== '' && cacheExpenses !== ''){
            appData.expenses[itemExpenses] = +cacheExpenses;
          }
      });
    },
    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
          incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
      incomeItems.forEach(function (item) {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
          if(incomeTitle !== '' && incomeAmount !== ''){
            appData.income[incomeTitle] = +incomeAmount;
          }
      });
      for (const key in appData.income) {
        appData.incomeMonth += +appData.income[key];

      }
    },
    showResult: function(){
      budgetMonth.value = +appData.budgetMonth;
      budgetDay.value = +Math.ceil(appData.budgetDay);
      expensesMonth.value = +appData.expensesMonth;
      additionalExpenses.value = appData.addExpenses.join(', ');
      additionalIncome.value = appData.addIncome.join(', ');
      targetMonth.value = Math.ceil(appData.getTargetMonth());
      incomePeriod.value = appData.calcSaveMoney();
      periodSelect.addEventListener('change', function(){
        incomePeriod.value = appData.calcSaveMoney();
      });
      

    },
    getAddExpenses: function(){
      let addExpenses = addExpensesItem.value.split(',');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function(){
      addIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(item !== ''){
          appData.addIncome.push(itemValue);
        }
      });
    },
    
    getExpensesMonth: function () {
      let sum = 0;
      for (let key in appData.expenses) {
        sum = sum + appData.expenses[key];
      }
      appData.expensesMonth = sum;
    },
    changePeriod: function(e){
      let change = e.target.value;
      periodAmount.textContent = change;
    },

    getBudget: function() {
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
      return targetAmount.value / appData.budgetMonth;
    },

    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
          return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200 && appData.budgetDay > 0) {
          return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
          return ('К сожалению у вас уровень дохода ниже среднего');
        } if (appData.budgetDay === 0) {
          return ('денег нет=(');
        } if (appData.budgetDay < 0) {
          return ('что то пошло не так');
        }
    },

    getInfoDeposit: function(){
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      if (appData.deposit){
        appData.percentDeposit = +prompt('Какой годовой процент?');
          while (!appData.percentDeposit){
            appData.percentDeposit = +prompt('Какой годовой процент?');
          }
        appData.moneyDeposit = +prompt('Какая сумма заложена?');
        while (!appData.moneyDeposit){
          appData.moneyDeposit = +prompt('Какая сумма заложена?');
        }
      }
    },

    calcSaveMoney: function(){
      return appData.budgetMonth * periodSelect.value;
    }

};

startBtn.addEventListener('click', appData.start)
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock)
periodSelect.addEventListener('change', appData.changePeriod);



//----- консоль лог----//

// if (appData.getTargetMonth() > 0) {
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяц');
// } else {
//   console.log('Цель не будет достигнута');
// }



  // console.log(appData.calcSaveMoney());

  // console.log(appData.addExpenses);


// let expToStr = appData.addExpenses.map(function(item) {
//   return item.slice(0, 1).toUpperCase() + item.slice(1);
// });

// let comma = expToStr.join(', ');

// console.log(comma);

// for (const key in appData) {
//   console.log("Наша программа включает в себя данные:" + key + '-' + appData[key]);
    
// }



