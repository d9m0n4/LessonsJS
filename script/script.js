'usestrict';

let money, 
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 6,
    expenses = [];
    
    

function start(){
    do {
      money = +prompt('Ваш месячный доход?');
  }
    while(isNaN(parseFloat(money)));
}
start();

let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');

    let price = +prompt('Во сколько это обойдется?');
    while(isNaN(price) || price.trim === '' || price === null) {
      price = +prompt('Во сколько это обойдется?');
    }
    sum += +price;
  }
  console.log(expenses);
  return sum;
};


let expensesAmount = getExpensesMonth();
function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);
function getTargetMonth() {
  let monthMiss = Math.ceil(mission / accumulatedMonth);
    if(monthMiss > 0){
      return ('Цель будет достигнута за ' + monthMiss + ' месяц');
    }else{
      return('Цель не будет достигнута');
    }
}

function getStatusIncome() {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay <= 1200 && budgetDay > 0) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } if (budgetDay === 0) {
    return ('денег нет=(');
  } if (budgetDay < 0) {
    return ('что то пошло не так');
  }
}

// --- TypeOf --- ////
function showTypeOf (data){
  console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//----- консоль лог----//
console.log(addExpenses.toLowerCase().split(' '));
console.log('Расходы за месяц: ' + expensesAmount);
console.log('Срок достижения цели: ' + getTargetMonth());
console.log('Бюджет на день: ' + budgetDay + ' рублей');
console.log('Статус вашего дохода: ' + getStatusIncome());


