import messagePopup from "./messagePopup";

function redirectAfterDelayMillisecond(
  target,
  delay = 1000,
  message = 'Something went wrong',
  popupColor = 'danger'
) {

  messagePopup(message, popupColor);
  setTimeout(() => window.location.href = target, delay);
};

export default redirectAfterDelayMillisecond;