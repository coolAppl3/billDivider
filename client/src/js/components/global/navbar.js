import Cookies from "./Cookies";
import locateLoginToken from "./locateLoginToken";

// Initializing imports
const cookies = new Cookies();

class Navbar {
  constructor() {
    this._linksContainer = document.querySelector('.links-container');
    this._userMenuBtn = document.querySelector('#user-menu-btn');
    this._userMenuOptions = document.querySelector('.user-menu-options');
    this._logoutBtn = document.querySelector('.user-menu-options').lastElementChild.firstElementChild;

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._displayUserMenuBtn.bind(this));
    this._userMenuBtn.addEventListener('click', this._displayUserMenu.bind(this));
    this._logoutBtn.addEventListener('click', this._logout.bind(this));
  };
  
  _displayUserMenuBtn() {
    const loginToken = locateLoginToken();

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

  _logout(e) {
    e.preventDefault();
    cookies.remove('loginToken');
    
    window.location.reload();
  };
}

export default Navbar;