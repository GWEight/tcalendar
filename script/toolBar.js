let elements = document.querySelectorAll('.ready-for-delete');
let buttonDelete = document.querySelector('button.delete');
let undoDelete = document.querySelector('#undo-delete');
let editButtonOverlay = document.querySelector('.edit-button-overlay');

deleteTimeButton.addEventListener('click', deleteTimeFunc)


dayInfoText.addEventListener('click', (event)=>{ 
    if (deleteTimeButton.classList.contains('delete-button-active') && !event.target.classList.contains('day-info-text'))  {
       
        if(event.target instanceof HTMLDivElement){
            event.target.classList.toggle('ready-for-delete')
        }else if(event.target.parentNode instanceof HTMLDivElement){
            event.target.parentNode.classList.toggle('ready-for-delete')
        }else{
            event.target.parentNode.parentNode.classList.toggle('ready-for-delete')
        } 
    }

    elements = document.querySelectorAll('.ready-for-delete');
    if (elements.length > 0){
        buttonDelete.style.display = 'block';
       }else{
        buttonDelete.style.display = 'none';
       }

    //edit active
    if (editTimeButton.classList.contains('edit-button-active') && !event.target.classList.contains('day-info-text'))  {
       
        Array.from(document.querySelectorAll('.ready-for-edit')).forEach(e => {
            e.classList.remove('ready-for-edit')
        })
        
        if(event.target instanceof HTMLDivElement){
            event.target.classList.toggle('ready-for-edit')
        }else if(event.target.parentNode instanceof HTMLDivElement){
            event.target.parentNode.classList.toggle('ready-for-edit')
        }else{
            event.target.parentNode.parentNode.classList.toggle('ready-for-edit')
        } 
        editTimeFunc();
    } 

})


function deleteTimeFunc(){
   if(deleteTimeButton.classList.contains('delete-button-active')) {
        deleteTimeButton.classList.remove('delete-button-active')
        Array.from(dayInfoText.children).forEach(e => e.classList.remove('ready-for-delete'))
        buttonDelete.style.display = 'none';
        return
   }
   if(editTimeButton.classList.contains('edit-button-active')) editToogledElementButton()
   deleteTimeButton.classList.add('delete-button-active')
}

function deleteToogledElementButton() {
    const data = JSON.parse(localStorage.getItem(calendarBigData));
    localStorage.setItem('calendarBigDataReset', JSON.stringify(data));
    const dataReset = JSON.parse(localStorage.getItem('calendarBigDataReset'));
 
    for (let i = 0; i < elements.length; i++) {
     const searchDate = elements[i].getAttribute('data-data');
     const searchTime = elements[i].getAttribute('data-time');
   
     for (let j = 0; j < data.length; j++) {
       if (data[j].date === searchDate) {
         const timeIndex = data[j].time.indexOf(searchTime);
         if (timeIndex !== -1) {
           console.log(`Note found at index ${timeIndex} in object ${j}`);
           data[j].time.splice(timeIndex, 1);
           data[j].text.splice(timeIndex, 1);
           data[j].status.splice(timeIndex, 1);
           data[j].income.splice(timeIndex, 1);
           data[j].expenses.splice(timeIndex, 1);
           localStorage.setItem(calendarBigData, JSON.stringify(data));
           console.log(`Note ${searchTime} has been removed from ${data[j].date}`);
           setTimeout(() => {
            chainedDays[Number(document.querySelector('.chained.active').textContent)-1].click();        
            undoDelete.style.opacity = '1';    
           }, 140);
           buttonDelete.style.display = 'none';
           undoDelete.style.display = 'block';
           break;
         }
       }
     }
   }
}

function editToogledElementButton(){
    if(editTimeButton.classList.contains('edit-button-active')) {
        editTimeButton.classList.remove('edit-button-active')
        Array.from(dayInfoText.children).forEach(e => e.classList.remove('ready-for-edit'))
        return
   }
   if(deleteTimeButton.classList.contains('delete-button-active')) deleteTimeFunc()
   editTimeButton.classList.add('edit-button-active')
}

if(localStorage.getItem('calendarBigDataReset')){       
    undoDelete.style.opacity = '1';
    undoDelete.style.display = 'block';
}

undoDelete.addEventListener('click', ()=>{
    undoDelete.style.display = 'none';

    localStorage.setItem('calendarBigData', localStorage.getItem('calendarBigDataReset'));
    setTimeout(() => {
        localStorage.removeItem('calendarBigDataReset');
        chainedDays[Number(document.querySelector('.chained.active').textContent)-1].click();        
    }, 0);
})

function editTimeFunc() {
    let editElement = document.querySelector('.ready-for-edit');
    const searchDate = editElement.getAttribute('data-data');
    const searchTime = editElement.getAttribute('data-time');

    const data = JSON.parse(localStorage.getItem(calendarBigData));
    localStorage.setItem('calendarBigDataReset', JSON.stringify(data));
    const dataReset = JSON.parse(localStorage.getItem('calendarBigDataReset'));


    let editNewCloseButton = document.querySelector('.edit-new-close-button');
    let categorySelect = document.querySelector('#edit-category-select');
    let editNoteTime = document.querySelector('#edit-note__time');
    let editNoteText = document.querySelector('#edit-note__text');
    let editNoteIncome = document.querySelector('#edit-note__income');
    let editNoteExpenses = document.querySelector('#edit-note__expenses');
    let editNoteSubmit = document.querySelector('.edit-note__submit');


    editNewCloseButton.addEventListener('click', ()=> {
        editButtonOverlay.style.opacity = '0';
        setTimeout(() => {
            editButtonOverlay.style.display = 'none';
        }, 720);
    })

    for (let j = 0; j < data.length; j++) {
        if (data[j].date === searchDate) {
          const timeIndex = data[j].time.indexOf(searchTime);
          if (timeIndex !== -1) {
            console.log(`Note found at index ${timeIndex} in object ${j}`);
            categorySelect.value = data[j].status[timeIndex];
            editNoteTime.value = data[j].time[timeIndex];
            editNoteText.value = data[j].text[timeIndex];
            editNoteIncome.value = data[j].income[timeIndex];
            editNoteExpenses.value = data[j].expenses[timeIndex];

            
            setTimeout(() => {
                editButtonOverlay.style.opacity = '1';
            }, 0);
            editButtonOverlay.style.display = 'flex';
            editNoteSubmit.addEventListener('click', ()=> {
                
                data[j].status[timeIndex] = categorySelect.value;
                data[j].time[timeIndex] = editNoteTime.value;
                data[j].text[timeIndex] = editNoteText.value;
                data[j].income[timeIndex] = editNoteIncome.value;
                data[j].expenses[timeIndex] = editNoteExpenses.value;
                

                localStorage.setItem(calendarBigData, JSON.stringify(data));
            })
          }
        }
      }
}

editTimeButton.addEventListener('click', editToogledElementButton)
buttonDelete.addEventListener('click', deleteToogledElementButton)


