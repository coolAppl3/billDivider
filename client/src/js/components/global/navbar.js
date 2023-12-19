class Navbar {
  constructor() {
    this._linksContainer = document.querySelector('.links-container');
    this._userMenuBtn = document.querySelector('#user-menu-btn');
    this._userMenuOptions = document.querySelector('.user-menu-options');

    this.loadEventListeners();
  };

  loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._displayUserMenuBtn.bind(this));
    this._userMenuBtn.addEventListener('click', this._displayUserMenu.bind(this));
  };
  
  _displayUserMenuBtn() {
    const loginToken = localStorage.getItem('loginToken');

    if(!loginToken) {
      this._linksContainer.style.display = 'flex';
      this._userMenuBtn.style.display = 'none';
    } else {
      this._linksContainer.style.display = 'none';
      this._userMenuBtn.style.display = 'grid';
    };
  };

  _displayUserMenu() {
    if(this._userMenuOptions.classList.contains('hidden')) {
      this._userMenuOptions.classList.remove('hidden');
    } else {
      this._userMenuOptions.classList.add('hidden');
    };
  };
}

export default Navbar;