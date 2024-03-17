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
    this._linksContainerFirstBtn = document.querySelector('#linksContainerFirstBtn');
    this._linksContainerSecondBtn = document.querySelector('#linksContainerSecondBtn');
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', this._updateLinksContainer.bind(this));
    this._linksContainer.addEventListener('click', this._handleLinksContainerEvents.bind(this));
  };
  
  _updateLinksContainer() {
    const loginToken = locateLoginToken();

    if(!loginToken) {
      return ;
    };

    this._linksContainerFirstBtn.textContent = 'Sign out';
    this._linksContainerFirstBtn.href = '#';
    this._linksContainerFirstBtn.classList.add('signOut');

    this._linksContainerSecondBtn.textContent = 'History';
    this._linksContainerSecondBtn.href = 'history.html';
    this._linksContainerSecondBtn.className = 'btn btn-light';
  };

  _handleLinksContainerEvents(e) {
    e.preventDefault();

    if(e.target.classList.contains('signOut')) {
      this._signOut();
      return ;
    };
    
    window.location.href = e.target.href;
  };

  _signOut() {
    confirmModal.display('Are you sure you want to sign out?');
    const confirmModalElement = document.querySelector('.confirm-modal');

    confirmModalElement.addEventListener('click', function eventHandler(e) {
      if(confirmModal.isExitClick(e)) {
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();
        return ;
      };

      if(e.target.id === 'confirmModalConfirmBtn') {
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();

        LoadingModal.display();
        cookies.remove('loginToken');
        redirectAfterDelayMillisecond('index.html', 1000, 'Signed out successfully', 'success');
      };
    });
  };
};

export default Navbar;