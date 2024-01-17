import '../scss/main.scss';
import Navbar from './components/global/Navbar';
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
    window.addEventListener('DOMContentLoaded', this._displayLoadingModal.bind(this));
    window.addEventListener('sessionsLoaded', this._removeLoadingModal.bind(this));
  };

  _displayLoadingModal() {
    LoadingModal.display();
  };

  _removeLoadingModal() {
    LoadingModal.remove();
  };

};

new History();