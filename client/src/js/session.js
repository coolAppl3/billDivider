import '../scss/main.scss';
import Navbar from './components/global/Navbar';
import locateLoginToken from './components/global/locateLoginToken';

// session-specific components
import InitSession from './components/session/InitSession';
import sessionInfo from './components/session/SessionInfo'; // instance of a class
import SessionHeader from './components/session/SessionHeader';
import SessionContent from './components/session/SessionContent';

// Initializing imports
new Navbar();
new InitSession(); // Handles the start-session-form.
new SessionHeader(); // Handles the all header-related tasks.
new SessionContent(); // Handles all the session-content section, which essentially displays/adds/removes bills.

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

    console.log(true)
  };
};

new Session();