import messagePopup from "./messagePopup";

function redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong',
  popupColor = 'danger'
) {

  if(!target || typeof target !== 'string') {
    messagePopup('Something went wrong', 'danger');
    setTimeout(() => window.location.href = 'index.html', delay);
    return ;
  };

  if(sessionStorage.getItem('unsavedSessionChanges')) {
    sessionStorage.removeItem('unsavedSessionChanges');
  };
  
  messagePopup(message, popupColor);
  setTimeout(() => window.location.href = target, delay);
};

export default redirectAfterDelayMillisecond;