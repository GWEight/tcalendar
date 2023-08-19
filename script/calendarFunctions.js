let addButton = document.querySelector('.add-new-button-holder');
let closeButton = document.querySelector('.add-new-close-button');

addButton.addEventListener('click', ()=>{
    event.stopPropagation()

    addButton.classList.add('add-new-active_holder');
})

closeButton.addEventListener('click', ()=>{
    event.stopPropagation()

    if(addButton.classList.contains('add-new-active_holder')){
        addButton.classList.remove('add-new-active_holder');
    }else{  
        addButton.classList.add('add-new-active_holder');
    }
})