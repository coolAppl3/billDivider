class MessageDialog {

  display(message, type) {
    // Creating the parent div
    const dialog = document.createElement('div');
    dialog.className = 'dialog';

    // Change the theme if necessary
    if(type === 'danger') {
      dialog.style.background = '#bd2130';
      dialog.style.color = '#faf8ff';
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
      document.querySelector('body').appendChild(dialog);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dialog.style.transform = 'translateY(0)';
        });
      });
    } else {
      document.querySelector('body').appendChild(dialog);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dialog.style.transform = 'translateY(0)';
        });
      });
    };
  };
};

export default MessageDialog;