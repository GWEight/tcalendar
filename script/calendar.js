
const cHoureSMinutes = document.querySelector('.clock-houres-s-minutes');
const clockSeconds = document.querySelector('.clock-seconds');
const dayColum = document.querySelectorAll('.deycolum span');
const yearMonthNow = document.querySelector('.year');
const dayInfoText = document.querySelector('.day-info-text');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const fYear = document.querySelector('.f-year');


if (!localStorage.getItem('calendarBigData')) {
	localStorage.setItem('calendarBigData', JSON.stringify([]));
}

let deycolumDays = [].slice.call(document.querySelectorAll('.deycolum span'));
let dayNow;
let calendarBigData = "calendarBigData";



	let calendarCount = new Date();
	let calendarDate = calendarCount.getDate();
	let calendarWeekDay = calendarCount.getDay();
	let calendarMonth = calendarCount.getMonth();
	let calendarYear = calendarCount.getFullYear();

let chainedDays;
let februar;
let a = 0;

fYear.textContent = calendarYear;

function clockTimer(){
	setInterval(()=>{
		let minutesFix;
		now = new Date();
		if(now.getMinutes()<10){
			minutesFix = '0'+now.getMinutes();
		}else{
			minutesFix = now.getMinutes();
		}
		clockSeconds.textContent = now.getSeconds() + 'c';	
		cHoureSMinutes.textContent = now.getHours() + ':' + minutesFix;// houres+minutes
	}, 1000); 
	calendarCounter();
};

if (new Date(new Date().getFullYear(), 1, 29).getMonth() == 1) {
	februar = 29;
}else{
	februar = 28;
}

 let monthSDaysProfile = {    
  0: 31,  
  1: februar,  
  2: 31,  
  3: 30,  
  4: 31,  
  5: 30,  
  6: 31,  
  7: 31,  
  8: 30,  
  9: 31,  
  10: 30,  
  11: 31            
};

 let monthSProfileNamesRus = {    
  0: 'Январь',  
  1: 'Февраль',  
  2: 'Март',  
  3: 'Апрель',  
  4: 'Май',  
  5: 'Июнь',  
  6: 'Июль',  
  7: 'Август',  
  8: 'Сентябрь',  
  9: 'Октябрь',  
  10: 'Ноябрь',  
  11: 'Декабрь'            
};
 let monthSProfileDatesFignya = {    
  0: 0,  
  1: 1,  
  2: 2,  
  3: 3,  
  4: 4,  
  5: 5,  
  6: 6,  
  7: 7,  
  8: 8,  
  9: 9,  
  10: 10,  
  11: 11            
};



function calendarCounter(){
	calendarFin(calendarDate, calendarMonth, calendarYear);
	clikersCalendar(calendarMonth, calendarYear)
}

prev.addEventListener('click', ()=>{
	if (calendarMonth > 0) {calendarMonth--;}else{
			calendarYear = calendarYear-1;
			calendarMonth = 11;
		};
	clikersCalendar(calendarMonth, calendarYear)
})

next.addEventListener('click', ()=>{
	if (calendarMonth < 11) {calendarMonth++;}else{
			calendarYear = calendarYear+1;
			calendarMonth = 0;
	}
	clikersCalendar(calendarMonth, calendarYear)
})

function clikersCalendar(calendarMonth,calendarYear){
	chainedDays.forEach(e => e.classList.remove('active'));
	deycolumDays.forEach(e => e.classList.remove('chained'));
	deycolumDays.forEach(e =>{if(!e.classList.contains('chained')){e.textContent = null;}} );
	calendarFin(calendarDate, calendarMonth, calendarYear);
}
// console.log(calendarDate, calendarMonth, calendarYear)
function calendarFin(calendarDate, calendarMonth, calendarYear){
	yearMonthNow.dataset.date = calendarMonth;
	yearMonthNow.innerHTML = `${monthSProfileNamesRus[calendarMonth]}<br><span>${calendarYear}</span>`;


	let firstStepsDay = new Date(calendarYear, calendarMonth, 1).getDay()-1;
		if(firstStepsDay == -1){
			firstStepsDay = firstStepsDay+7;
		}

	for (var i = firstStepsDay; i <= monthSDaysProfile[calendarMonth]+firstStepsDay-1; i++) {
		a++;
		deycolumDays[i].textContent = a;
		deycolumDays[i].classList.add('chained');

	}
	a=0;
	chainedDays = [].slice.call(document.getElementsByClassName('chained'));
	if (calendarMonth == calendarCount.getMonth() && calendarYear == calendarCount.getFullYear() ) {
		chainedDays[calendarDate-1].classList.add('active');
		setTimeout(()=>{chainedDays[calendarDate-1].click()}, 100)	
	}
	monthlyCounter()
	chainedDays.forEach(e => e.id = `${calendarYear}.${calendarMonth}.${e.textContent}`);
	chainedDays.forEach(e => e.addEventListener('click', ()=>{
		chainedDays.forEach(e => e.classList.remove('active'));
		e.classList.add('active');
		deleteTimeButton.classList.remove('delete-button-active')

		let dateClickedNow = `${calendarYear}.${monthSProfileDatesFignya[calendarMonth]}.${e.textContent}`;
		dayNow = dateClickedNow;
		if (e.id == dateClickedNow) {
			let currentId = {
				"id": e.id
			}
						
						let date = oldDates.find(item => item.date == e.id)
						date = date == undefined ? JSON.parse(localStorage.getItem('calendarBigData')).find(item => item.date == e.id) : date
						
						setTimeout(() => {
							moneyCounterEnter(date)
						}, 200); 
						if (!date) { dayInfoText.innerHTML = ''; return}
						let styleList = function(){
						dayInfoText.style.justifyContent = 'flex-start';
						dayInfoText.style.marginTop = '0%';
							}
							let statusAnim = function(eIState){
								if(eIState == 'Свободна' || eIState == 'busy'){
									statusAnimClass = 'status-green';
								}else{
									statusAnimClass = 'status-red';
								}
								return statusAnimClass;
							}
						if(Array.isArray(date.time)){
							dayInfoText.innerHTML = '';
							for (var i = 0; i <= date.time.length - 1; i++) {
								function additionalInfo(){
									let additionalInfoText =``;
									if (date.text[i].length > 0) additionalInfoText += `<p><span>${date.text[i]}</span></p>`;
									if (date.income[i].length > 0 || date.expenses[i].length > 0 ) additionalInfoText += `<p><span>Заработок: ${date.income[i]}</span><span>Затраты: ${date.expenses[i]}</span></p>`;
									if (additionalInfoText.length > 0) return additionalInfoText
								}
								let additionalInfoText = additionalInfo() == undefined ? `` : additionalInfo();
								dayInfoText.innerHTML += `<div data-time="${date.time[i]}" data-data="${date.date}"><span>${date.time[i]}</span> <span>${date.status[i]}</span>${additionalInfoText}</div>`;
								
							}
							styleList();
						}else if(date.time === ''){
							dayInfoText.style.justifyContent = 'center';
							dayInfoText.style.marginTop = '0';

							dayInfoText.innerHTML = `<div style="justify-content: center;"><span>${date.status}</span></div>`

						}else{
							dayInfoText.innerHTML = `<div><span>${date.time}</span> <span>${date.status}</span></div>`;
							styleList();
						}

			// //serverPart
			// let sendString = JSON.stringify(currentId);

			// 	let xhttp = new XMLHttpRequest();
    		// 	xhttp.open("POST", "/", true);

    		// 	    xhttp.responseType = 'json';
    		// 		xhttp.onload = async function() {

			// 		};

    		// 	xhttp.setRequestHeader("Content-Type", "application/json");
    		// 	xhttp.send(sendString);
    		// //serverPart

		}
		
	}))

}

	//Форма приложения
	const newNoteForm = document.querySelector('.new-note__form');

	newNoteForm.addEventListener('submit', function(event) {
		event.preventDefault();

		const category = document.querySelector('#category-select').value;
		const time = document.querySelector('#new-note__time').value;
		const text = document.querySelector('#new-note__text').value;
		const income = document.querySelector('#new-note__income').value;
		const expenses = document.querySelector('#new-note__expenses').value;
		

		let findMyDay = JSON.parse(localStorage.getItem(calendarBigData)) || [];

		let CurrentSelectedDayChecker = (() => {
			if (!findMyDay) {
			  localStorage.setItem(calendarBigData, JSON.stringify([]));
			  return;
			}
		  
			const selectedDay = findMyDay.find(day => day.date === dayNow);
			const selectedDayVsTime = findMyDay.find(day => day.date === dayNow && day.time.includes(time));
		  
			if (selectedDayVsTime) {
			  return selectedDayVsTime;
			}else if(selectedDay){
			  return selectedDay;
			}
		  })();
		findMyDay = JSON.parse(localStorage.getItem(calendarBigData))

		if (!CurrentSelectedDayChecker) {
			newNote = {
				date: dayNow,
				time: [time],
				status: [category],
				text: [text],
				income: [income],
				expenses : [expenses]
			};
			
			console.log('First I')
			findMyDay.push(newNote)
			localStorage.setItem(calendarBigData, JSON.stringify(findMyDay));
			setTimeout(() => {
				chainedDays[Number(document.querySelector('.chained.active').textContent)-1].click();            
			}, 420);
		  } else {
			console.log(CurrentSelectedDayChecker)
			let returnedDatabySelectedDay = findMyDay.find(day => day.date === dayNow);




			console.log('Second I')
			if (returnedDatabySelectedDay.time.includes(time)) {
				showAlert('Указанное время уже занято, пожалуйста, отредактируйте существующее или измените время')
				return
			}
			// if (!isNaN(returnedDatabySelectedDay.income) && !isNaN(returnedDatabySelectedDay.income)) {
			// 	showAlert('Поля заработка и затрат могут вместить в себе только числа')
			// 	return
			// }

			returnedDatabySelectedDay.time.push(time);
			returnedDatabySelectedDay.status.push(category);
			returnedDatabySelectedDay.text.push(text);
			returnedDatabySelectedDay.income.push(income);
			returnedDatabySelectedDay.expenses.push(expenses);


			localStorage.setItem(calendarBigData, JSON.stringify(findMyDay));
			
			localStorage.removeItem('calendarBigDataReset');
			document.querySelector('#undo-delete').style.display = 'none';

			setTimeout(() => {
				chainedDays[Number(document.querySelector('.chained.active').textContent)-1].click();            
			}, 420);
		  }
	});


function sendDayForm(date){	


}


clockTimer();
