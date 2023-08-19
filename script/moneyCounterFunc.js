const moneyCounterThrottled = throttle(moneyCounter, 100);

const moneyEarned = document.querySelector('.money.earned');
const moneySpent = document.querySelector('.money.spent');
const moneyTotal = document.querySelector('.money.total');
const moneyMonthTotal = document.querySelector('.money.month-total');


function moneyCounter(date){
    if(!date){
        moneySpent.textContent = 0;
        moneyEarned.textContent = 0;
    }else{
        moneySpent.textContent = date.expenses.reduce((sum, current) => sum + Number(current), 0)
        moneyEarned.textContent = date.income.reduce((sum, current) => sum + Number(current), 0)
    }
    moneyTotal.textContent = Number(moneyEarned.textContent) - Number(moneySpent.textContent)

    monthlyCounter()
}

function moneyCounterEnter(date){
    moneyCounterThrottled(date)
}

function monthlyCounter(){
    const calendarBigData = JSON.parse(localStorage.getItem('calendarBigData'));
    const mayData = [];
    dataToFind =  `${document.querySelector('.year').children[1].textContent}.${document.querySelector('.year').dataset.date}`

    if (!calendarBigData) return
    calendarBigData.forEach(obj => {
    const date = obj.date;

    if (date.startsWith(dataToFind)) {
        mayData.push(obj);
    }
    });
    let monthlyIncome = [];
    let monthlyExpenses = [];
    
    mayData.forEach(e => {
        monthlyIncome.push(e.income.reduce((sum, current) => sum + Number(current), 0));
        monthlyExpenses.push(e.expenses.reduce((sum, current) => sum + Number(current), 0));
    })
 
    function moneyMonthTotalConstructed() {
       num = monthlyIncome.reduce((sum, current) => sum + Number(current), 0) - monthlyExpenses.reduce((sum, current) => sum + Number(current), 0);
       if (num >= 0) { return `+`+ num } else { return num }
    } 

    moneyMonthTotal.textContent = moneyMonthTotalConstructed()
}