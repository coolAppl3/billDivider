import disableBFCache from './components/global/disableBFCache';
disableBFCache();

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
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('beforeunload', this._confirmExit.bind(this));
    window.addEventListener('pagehide', this._handlePageHideEvents.bind(this));
  };

  _confirmExit(e) {
    const unsavedSessionChanges = JSON.parse(sessionStorage.getItem('unsavedSessionChanges'));
    
    if(unsavedSessionChanges) {
      e.preventDefault();
      e.returnValue = '';
    };
  };

  _handlePageHideEvents() {
    this._removeSessionReference();
    sessionStorage.removeItem('unsavedSessionChanges');
  };
  
  _removeSessionReference() {
    SessionReference.remove();
  };
};

new Session();