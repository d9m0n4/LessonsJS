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
  budgetMonth = money - (amount1 + amount2),
  budgetDay = Math.floor(budgetMonth / 30),
  missionPeriod = Math.ceil(mission / budgetMonth);

addExpenses.toUpperCase();


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(' '));
console.log('Бюджет на день ' + budgetDay + ' рублей');
console.log('Бюджет на месяц ' + budgetMonth + ' рублей');
console.log('Цель будет достигнута за ' + missionPeriod + ' месяцев');

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200 && budgetDay > 0) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay > 0){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} if (budgetDay === 0) {
  console.log('денег нет=(');
} if (budgetDay < 0) {
  console.log('что то пошло не так');
}

