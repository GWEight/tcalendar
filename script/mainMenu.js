const menuButton = document.querySelector("menu");
const menuAside = document.querySelector("aside");
const asideHolder = document.querySelector(".aside-holder");
const surchIco = document.querySelector(".surch");
const surchInput = document.querySelector(".surch-input");
const calendarHider = document.querySelector(".calendar-hider");
const calendarBox = document.querySelector(".calendar");
const calendarClock = document.querySelector(".calendar-clock");
const moneyCounterContainer = document.querySelector('.moneyCounter');
const calendarDaysBox = document.querySelector('.calendar-days')


function handleMenuClick(event) {
  event.stopPropagation();
  menuAside.classList.toggle('active');
  menuButton.classList.toggle('active');
  setTimeout(() => {
    moneyCounterContainer.style.display = 'block';
  }, 720);
}


function handleDocumentClick(event) {
  event.stopPropagation();
  if (!event.target.closest('.aside-holder')) {
    menuAside.classList.remove('active');
    menuButton.classList.remove('active');
    moneyCounterContainer.style.display = 'none';
  }
  if(surchInput.classList.contains('surch-input-active') 
      && !event.target.closest('.surch-input') 
      && !event.target.closest('.surch')){
    surchInput.classList.remove('surch-input-active');
    surchInput.value = '';
  }
}



function hiderCalendar (){
  calendarHider.classList.toggle('active')
  if (calendarHider.classList.contains('active')){
    calendarBox.style.top = -(calendarDaysBox.offsetHeight-(calendarHider.offsetHeight+10)) +'px';
    console.log(calendarDaysBox.offsetHeight-(calendarHider.offsetHeight+10))
    calendarClock.style.maxHeight = '77vh';
  }else{
    calendarBox.style.top = '0vh';
    calendarClock.style.maxHeight = '38vh';
  }
}

surchIco.addEventListener('click',  ()=>{
  setTimeout(() => {
    surchInput.classList.add('surch-input-active')
    surchInput.focus()
  }, 0);
})

menuButton.addEventListener('click', handleMenuClick);
calendarHider.addEventListener('click', hiderCalendar)

document.addEventListener('click', handleDocumentClick);


//header landscape height counter
function headerOrientation() {
  let main =  document.querySelector('main')
  
  if (window.matchMedia("(orientation: landscape)").matches) {
    document.body.style.setProperty("--calendarClock-maxHeight", document.querySelector('body').offsetHeight - document.querySelector('header').offsetHeight + 'px');
    document.body.style.setProperty("--main-height", document.querySelector('body').offsetHeight - document.querySelector('header').offsetHeight + 'px');
  } 
  
  
  setTimeout(() => {
  let deletePosition = document.querySelector('.delete-button').getBoundingClientRect();
    console.log(deletePosition)
  document.querySelector('#undo-delete').style.transform = 'matrix(1, 0, 0, 1, '+ (deletePosition.x + deletePosition.width) +', 0)'
  }, 100);
}

window.addEventListener("DOMContentLoaded", headerOrientation);
window.addEventListener("resize", headerOrientation)
