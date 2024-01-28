class ErrorSpan {
  
  display(formGroup, message) {
    formGroup.classList.add('error');
    formGroup.lastElementChild.textContent = message;
  };

  hide(formGroup) {
    formGroup.classList.remove('error');
    formGroup.lastElementChild.textContent = '';
  };
};

export default ErrorSpan;