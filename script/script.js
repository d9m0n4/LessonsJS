'usestrict';

let money = +prompt('Ваш месячный доход?'),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 6,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);

function getExpensesMonth () {
  return amount1 + amount2;
}

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
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
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log(addExpenses.toLowerCase().split(' '));
console.log('Срок достижения цели: ' + getTargetMonth() + ' месяц');
console.log('Бюджет на день: ' + budgetDay + ' рублей');
console.log('Статус вашего дохода: ' + getStatusIncome());


