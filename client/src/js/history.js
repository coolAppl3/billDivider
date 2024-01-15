import '../scss/main.scss';
import Navbar from './components/global/Navbar';
import HistoryAPI from './components/services/historyAPI';
import Cookies from './components/global/Cookies';

import locateLoginToken from './components/global/locateLoginToken';
import messagePopup from './components/global/messagePopup';

// Initializing imports
new Navbar();
const historyAPI = new HistoryAPI(); 
const cookies = new Cookies();

class History {
  constructor() {
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener("DOMContentLoaded", this._loadUserHistory.bind(this));
  };

  async _loadUserHistory() {
    const loginToken = locateLoginToken();

    if(!loginToken) { // Not logged in - Redirecting...
      window.location.href = 'signIn.html';
      return ;
    };

    try {
      const res = await historyAPI.getUserHistory({ loginToken });
      const sessions = res.data.data;
      const username = res.data.username

      console.log(sessions, username)
      // CONTINUE HERE ------
      // READ: the above request doesn't make sense. Separate into two requests. Check the backend.
      
    } catch (err) {
      const status = err.response.status;

      if(status === 404) { // Invalid loginToken
        cookies.remove('loginToken');
        messagePopup('Not logged in. Redirecting...', 'danger');
        setTimeout(() => window.location.href = 'signIn.html', 500);

      } else { // Most likely 500
        cookies.remove('loginToken');
        messagePopup('Something went wrong', 'danger');
        setTimeout(() => window.location.href = 'signIn.html', 500);
      };
    }

  };
};

new History();