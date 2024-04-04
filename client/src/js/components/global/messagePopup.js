function messagePopup(message, type = 'cta', durationMilliseconds = 2000) {
  if(typeof message !== 'string') {
    message = '';
  };

  if(typeof type !== 'string' || type === '') {
    type = 'cta';
  };
  
  const popup = document.createElement('div');
  popup.className = 'popup';

  if(type === 'danger') {
    popup.style.background = '#bd2130';
    popup.style.color = '#faf8ff';
  };
  
  if(type === 'success') {
    popup.style.background = '#28a745';
  };

  const popupMessage = document.createElement('p');
  popupMessage.className = 'popup-message';
  popupMessage.appendChild(document.createTextNode(message));

  if(document.querySelector('.popup')) {
    document.querySelector('.popup').remove();
  };

  popup.appendChild(popupMessage);
  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      popup.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    popup.style.transform = 'translateY(-10rem)';
    setTimeout(() => popup.remove(), 200);
  }, durationMilliseconds);
};

export default messagePopup;