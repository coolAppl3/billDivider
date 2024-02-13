class FormCheckbox {
  constructor(checkboxID) {
    this._checkbox = document.querySelector(`#${checkboxID}`);

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._checkbox.addEventListener('click', this._revealCheck.bind(this));
    this._checkbox.addEventListener('keyup', this._handleKeyEvents.bind(this));
  };
  
  _handleKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._revealCheck();
    };
  };

  _revealCheck() {
    if(this._checkbox.classList.contains('checked')) {
      this._checkbox.classList.remove('checked');
      return ;
    };

    this._checkbox.classList.add('checked');
  };
};

export default FormCheckbox;