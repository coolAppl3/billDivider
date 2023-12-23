import '../scss/main.scss';
import Navbar from './components/global/Navbar';

// Initializing imports
new Navbar();


class Index {
  constructor() {
    this._heroBtnContainer = document.querySelector('.hero .btn-container');
    this._heroSignUpBtn = document.querySelector('#hero-sign-up-btn');

    this.loadEventListeners();
  };

  loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._displayHeroButtons.bind(this));
  };

  _displayHeroButtons() {
    const loginToken = localStorage.getItem('loginToken');

    if(loginToken) {
      this._heroSignUpBtn.style.display = 'none';

      const historyBtn = document.createElement('a');
      historyBtn.className = 'btn btn-light';
      historyBtn.href = 'history.html';
      historyBtn.appendChild(document.createTextNode('History'));

      this._heroBtnContainer.appendChild(historyBtn);
    };
  };
};

new Index();
