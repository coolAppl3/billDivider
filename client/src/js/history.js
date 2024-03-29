import '../scss/main.scss';
import Navbar from './components/global/Navbar';
import disableFBCache from './components/global/disableFBCache';
disableFBCache();

import HistoryHeader from './components/history/HistoryHeader';
import HistoryContent from './components/history/HistoryContent';
import LoadingModal from './components/global/LoadingModal';

// Initializing imports
new Navbar();
new HistoryHeader();
new HistoryContent();


class History {
  constructor() {
    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('DOMContentLoaded', LoadingModal.display);
    window.addEventListener('sessionsLoaded', LoadingModal.remove);
  };
};

new History();

export default History;