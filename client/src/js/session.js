import '../scss/main.scss';
import Navbar from './components/global/Navbar';

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
    // window.addEventListener('beforeunload', this._confirmExit.bind(this));
  };


  

  _confirmExit(e) {
    e.preventDefault();
    e.returnValue = '';

    // Should check the header's save button. If it's disabled, then there's no need for the user to confirm leaving the site.
    
    console.log(true)
  };
};

new Session();