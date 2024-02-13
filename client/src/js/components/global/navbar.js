import Cookies from "./Cookies";
import locateLoginToken from "./locateLoginToken";
import ConfirmModal from './ConfirmModal';
import LoadingModal from "./LoadingModal";
import redirectAfterDelayMillisecond from "./redirectAfterDelayMillisecond";

// Initializing imports
const cookies = new Cookies();
const confirmModal = new ConfirmModal();

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
    this._userMenuBtn.addEventListener('keyup', this._handleUserMenuKeyEvents.bind(this));
    this._logoutBtn.addEventListener('click', this._logout.bind(this));
  };
  
  _displayUserMenuBtn() {
    const loginToken = locateLoginToken();

    if(!loginToken) {
      this._linksContainer.classList.remove('hidden');
      this._userMenuBtn.classList.add('hidden');
      return ;
    }
    
    this._linksContainer.classList.add('hidden');
    this._userMenuBtn.classList.remove('hidden');
  };

  _handleUserMenuKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._displayUserMenu();
    };
  };

  _displayUserMenu() {
    if(this._userMenuOptions.classList.contains('hidden')) {
      this._userMenuOptions.classList.remove('hidden');
      return ;
    }
    
    this._userMenuOptions.classList.add('hidden');
  };

  _logout(e) {
    e.preventDefault();

    confirmModal.display('Are you sure you want to log out?');
    const confirmModalElement = document.querySelector('.confirm-modal');

    confirmModalElement.addEventListener('click', (e) => {
      if(confirmModal.isExitClick(e)) {
        confirmModal.remove();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        confirmModal.remove();
        LoadingModal.display();
        cookies.remove('loginToken');
        redirectAfterDelayMillisecond('index.html', 1000, 'Signed out successfully', 'success');
      };
    });

  };
}

export default Navbar;