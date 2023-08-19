function showAlert(message) {
    let alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
  
    let alertMessage = document.createElement('div');
    alertMessage.classList.add('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.appendChild(alertMessage);
    
    let closeButton = document.createElement('button');
    closeButton.classList.add('custom-alert-close');
    closeButton.textContent = 'Закрыть';
    closeButton.addEventListener('click', function() {
        alertBox.classList.remove('show')
      setTimeout(() => {
        alertBox.parentNode.removeChild(alertBox);
      }, 750);
    });
    alertBox.appendChild(closeButton);
  
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.classList.add('show')
    }, 100);
  }
