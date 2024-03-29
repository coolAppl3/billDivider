import messagePopup from "./messagePopup";
import LoadingModal from "./LoadingModal";

function redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong',
  popupColor = 'danger'
) {

  if(!target || typeof target !== 'string' || !target.endsWith('.html') || target.includes(' ')) {
    messagePopup('Something went wrong', 'danger');
    setTimeout(() => window.location.href = 'index.html', 1000);
    return ;
  };

  if(typeof delay !== 'number' || delay <= 0) {
    delay = 1000;
  };

  if(sessionStorage.getItem('unsavedSessionChanges')) {
    sessionStorage.removeItem('unsavedSessionChanges');
  };

  messagePopup(message, popupColor);
  setTimeout(() => window.location.href = target, delay);
};

export default redirectAfterDelayMillisecond;