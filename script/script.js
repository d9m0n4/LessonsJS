'usestrict';

let money,
    start = function() {
      while (!money){
        money = +prompt('Ваш месячный доход?');
      }
};
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function () {

            if(confirm('Есть ли у вас дополнительный источник заработка?')){
              let itemIncome = prompt('Какой у вас дополнительный заработок?');
              while (!isNaN(itemIncome) || itemIncome.trim === '' || itemIncome === null){
                  itemIncome = prompt('Какой у вас дополнительный заработок?');
                }
              let cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?');
                while (!cashIncome) {
                  cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?');
                }
                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
                              appData.addExpenses = addExpenses.toLowerCase().split(', ');
                        
                        
                      for (let i = 0; i < 2; i++) {
                          let quest = prompt('Введите обязательную статью расходов?');
                        while (!isNaN(quest) || quest.trim === '' || quest === null) {
                          quest = prompt('Введите обязательную статью расходов?');
                        }
                          let price = +prompt('Во сколько это обойдется?');
                        while (!price) {
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
      return appData.mission / appData.budgetMonth;
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
        appData.percentDeposit = prompt('Какой годовой процент?');
          while (!appData.percentDeposit){
            appData.percentDeposit = prompt('Какой годовой процент?');
          }
        appData.moneyDeposit = prompt('Какая сумма заложена?');
        while (!appData.moneyDeposit){
          appData.moneyDeposit = prompt('Какая сумма заложена?');
        }
      }
    },

    calcSaveMoney: function(){
      return appData.budgetMonth * appData.period;
    }

};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();



//----- консоль лог----//
console.log('Расходы за месяц: ' + appData.expenses);

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяц');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Статус вашего дохода: ' + appData.getStatusIncome());

console.log(appData.calcSaveMoney());

console.log(appData.addExpenses);


let expToStr = appData.addExpenses.map(function(item) {
  return item.slice(0, 1).toUpperCase() + item.slice(1);
});

let comma = expToStr.join(', ');

console.log(comma);

for (const key in appData) {
  console.log("Наша программа включает в себя данные:" + key + '-' + appData[key]);
    
}



