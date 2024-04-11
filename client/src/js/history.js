import '../scss/main.scss';
import Navbar from "./components/global/Navbar";
import disableFBCache from './components/global/disableFBCache';
disableFBCache();
import HistoryHeader from './components/history/HistoryHeader';
import HistoryContent from './components/history/HistoryContent';
import LoadingModal from './components/global/LoadingModal';
import DisplayTerms from './components/global/DisplayTerms';
import generateAPIKey from './components/global/generateAPIKey';

// Initializing imports
new Navbar();
new HistoryHeader();
new HistoryContent();
new DisplayTerms();
generateAPIKey();

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