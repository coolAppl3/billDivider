import '../scss/main.scss';
import Navbar from './components/global/Navbar';
import HistoryHeader from './components/history/HistoryHeader';
import HistoryContent from './components/history/HistoryContent';

import locateLoginToken from './components/global/locateLoginToken';
import messagePopup from './components/global/messagePopup';

// Initializing imports
new Navbar();
new HistoryHeader();
new HistoryContent();

class History {
  constructor() {
    
    this._loadEventListeners();
  };

  _loadEventListeners() {
    // 
  };

};

new History();