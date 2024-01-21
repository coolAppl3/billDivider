function messagePopup(message, type = 'cta') {
  // Creating the parent div
  const dialog = document.createElement('div');
  dialog.className = 'dialog';

  // Change the theme if necessary - Default is $cta color.
  if(type === 'danger') {
    dialog.style.background = '#bd2130';
    dialog.style.color = '#faf8ff';
    
  } else if(type === 'success') {
    dialog.style.background = '#28a745';
  };

  // Creating the child p element, and appending the message to it
  const dialogMessage = document.createElement('p');
  dialogMessage.className = 'dialog-message';
  dialogMessage.appendChild(document.createTextNode(message));

  // Appending the child p element in the parent div
  dialog.appendChild(dialogMessage);

  // Appending into the body, and preventing duplicates.
  if(document.querySelector('.dialog')) {
    document.querySelector('.dialog').remove();
  }

  document.querySelector('body').appendChild(dialog);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dialog.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    dialog.style.transform = 'translateY(-10rem)';

    setTimeout(() => {
      dialog.remove();
    }, 200);

  }, 2000);
};

export default messagePopup;