class RevealPassword {
  constructor(inputID) {
    this._input = document.querySelector(`#${inputID}`);
    this._revealPasswordIcon = document.querySelector('#revealPassword');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._revealPasswordIcon.addEventListener('click', this._reveal.bind(this));
    this._revealPasswordIcon.addEventListener('keyup', this._handleKeyEvents.bind(this));
  };

  _handleKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._reveal();
    };
  };

  _reveal() {
    const inputType = this._input.getAttribute('type');

    if(inputType === 'password') {
      this._input.setAttribute('type', 'text');
      this._revealPasswordIcon.className = 'fa-solid fa-eye-slash';
      
      return ;
    }

    this._input.setAttribute('type', 'password');
    this._revealPasswordIcon.className = 'fa-solid fa-eye';
  };
};

export default RevealPassword;