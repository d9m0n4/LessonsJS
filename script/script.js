let money = 50000,
  income = 'Фриланс',
  addExpenses = 'Интернет, Коммуналка, Такси',
  deposit = true,
  mission = 30000000000,
  period = 6,
  budgetDay = money / 30;

addExpenses.toUpperCase();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(' '));
console.log(budgetDay);