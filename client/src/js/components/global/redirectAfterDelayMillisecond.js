import messagePopup from "./messagePopup";

function redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong',
  popupColor = 'danger'
) {

  if(sessionStorage.getItem('unsavedSessionChanges')) {
    sessionStorage.removeItem('unsavedSessionChanges');
  };
  
  messagePopup(message, popupColor);
  setTimeout(() => window.location.href = target, delay);
};

export default redirectAfterDelayMillisecond;