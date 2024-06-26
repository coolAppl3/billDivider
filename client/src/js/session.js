import '../scss/main.scss';
import Navbar from "./components/global/Navbar";
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import DisplayTerms from './components/global/DisplayTerms';

import SessionReference from './components/session/SessionReference';
import InitSession from './components/session/InitSession';
import SessionHeader from './components/session/SessionHeader';
import SessionContent from './components/session/SessionContent';
import generateAPIKey from './components/global/generateAPIKey';

// Initializing imports
new Navbar();
new DisplayTerms();
new InitSession();
new SessionHeader();
new SessionContent();
generateAPIKey();

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
    SessionReference.remove();
    sessionStorage.removeItem('unsavedSessionChanges');
  };
};

new Session();

export default Session;