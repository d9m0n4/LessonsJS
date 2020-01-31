'usestrict';

let money,
    start = function() {
      do {
        money = +prompt('Ваш месячный доход?');
      }
      while (isNaN(money) || money === '' || money === null);
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function () {
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                        appData.addExpenses = addExpenses.toLowerCase().split(',');
                        appData.deposit = confirm('Есть ли у вас депозит в банке?');
                        
                      for (let i = 0; i < 2; i++) {
                          let quest = prompt('Введите обязательную статью расходов?');
                          let price = +prompt('Во сколько это обойдется?');
                        while (isNaN(price) || price.trim === '' || price === null) {
                          price = +prompt('Во сколько это обойдется?');
                        }
                        appData.expenses[quest] = price;
                        
                      }                         
    },
    
    getExpensesMonth: function () {
      let sum = 0;
      for (let key in appData.expenses) {
        sum = sum + appData.expenses[key];
      }
      appData.expenses = sum;
    },

    getBudget: function() {
      appData.budgetMonth = money - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
      let monthMiss = Math.ceil(appData.mission / appData.budgetMonth);
        if (monthMiss > 0) {
          return ('Цель будет достигнута за ' + monthMiss + ' месяц');
        } else {
          return ('Цель не будет достигнута');
        }
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

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
    
//----- консоль лог----//
console.log('Расходы за месяц: ' + appData.expenses);
console.log('Срок достижения цели: ' + appData.getTargetMonth());
console.log('Статус вашего дохода: ' + appData.getStatusIncome());



for (const key in appData) {
  console.log("Наша программа включает в себя данные:" + key);
    
}
