let deleteTimeButton = document.querySelector('.delete-button')
let editTimeButton = document.querySelector('.edit-button')

//блокировкa поворота экрана
window.addEventListener("orientationchange", function(event) {
  event.preventDefault();
}, false);
/*ограничение частоты вызовов функции

Ограничение функции одним запуском в секунду
const throttledFunction = throttle(myFunction, 1000); */
function throttle(fn, delay) {
    let last = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - last < delay) {
        return;
      }
      last = now;
      return fn(...args);
    }
  }