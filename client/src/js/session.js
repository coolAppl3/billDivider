import '../scss/main.scss';
import Navbar from './components/global/Navbar';
import SessionReference from './components/session/SessionReference';

// session-specific components
import InitSession from './components/session/InitSession';
import SessionHeader from './components/session/SessionHeader';
import SessionContent from './components/session/SessionContent';

// Initializing imports
new Navbar();
new InitSession();
new SessionHeader();
new SessionContent();

class Session {
  constructor() {
    this._saveSessionBtn = document.querySelector('#saveSessionBtn');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('beforeunload', this._confirmExit.bind(this));
    window.addEventListener('pagehide', this._removeSessionReference.bind(this));
  };

  _confirmExit(e) {
    const saveSessionBtn = document.querySelector('#saveSessionBtn');
    
    if(!saveSessionBtn.classList.contains('disabled')) {
      e.preventDefault();
      e.returnValue = '';
    };
  };

  _removeSessionReference() {
    SessionReference.remove();
  };
};

new Session();