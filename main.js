'use strict'

let startBtn = document.getElementById('start'),
    plusIncom = document.getElementsByClassName('income_add'),
    plusExpenses = document.getElementsByClassName('expenses_add'),
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonth = document.getElementsByClassName('budget_month-value'),
    budgetDay = document.getElementsByClassName('budget_day-value'),
    expensesMonth = document.getElementsByClassName('expenses_month-value'),
    additionalIncome = document.getElementsByClassName('additional_income-value'),
    additionalExpenses = document.getElementsByClassName('additional_expenses-value'),
    incomePeriod = document.getElementsByClassName('income_period-value'),
    targetMonth = document.getElementsByClassName('target_month-value'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

    