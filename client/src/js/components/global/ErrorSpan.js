class ErrorSpan {
  
  display(formGroup, message) {
    if(!formGroup || formGroup instanceof HTMLElement === false) {
      return;
    };
    
    formGroup.classList.add('error');
    formGroup.lastElementChild.textContent = message;
  };

  hide(formGroup) {
    if(!formGroup || formGroup instanceof HTMLElement === false) {
      return ;
    };
    
    formGroup.classList.remove('error');
    formGroup.lastElementChild.textContent = '';
  };
};

export default ErrorSpan;