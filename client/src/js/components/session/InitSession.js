import ErrorSpan from "./ErrorSpan";
import loadingModal from '../global/loadingModal';
import sessionInfo from "./SessionInfo";

// Initializing imports
const errorSpan = new ErrorSpan();

class InitSession {

  constructor() {
    this._startModal = document.querySelector('.start-modal');
    this._startModalForm = document.querySelector('.start-modal-form');
    this._sharingWithInput = document.querySelector('#sharingWith');
    this._optionsContainer = document.querySelector('.options-container');
    this._optionsContainerItems = document.querySelectorAll('.options-container-item');


    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._startModalForm.addEventListener('submit', this._start.bind(this));
    this._optionsContainer.addEventListener('click', this._changeCurrency.bind(this));
    window.addEventListener('editSharedWith', this._displayStartModal.bind(this));
  };

  _start(e) {
    e.preventDefault();

    if(this._sharingWithInput.value === '') {
      errorSpan.display(this._sharingWithInput.parentElement, 'This field is required.');
      return ;
    } else if(this._sharingWithInput.value.length > 15) {
      errorSpan.display(this._sharingWithInput.parentElement, 'Name must not exceed 15 characters.');
      return ;
    };;

    // Hiding error span if one existed
    errorSpan.hide(this._sharingWithInput.parentElement);

    sessionInfo.sharedWith = this._sharingWithInput.value || 'Friend';
    sessionInfo.currency = this._getSelectedCurrency() || 'RSD';

    this._collapseStartModal();
    dispatchEvent(new Event('sessionStarted'));
  };

  _changeCurrency(e) {
    if(e.target.classList.contains('options-container-item') && !e.target.classList.contains('selected')) {
      this._optionsContainerItems.forEach((item) => item.classList.remove('selected'));
    };

    e.target.classList.add('selected');
  };

  _getSelectedCurrency() {
    let currency;
    
    this._optionsContainerItems.forEach((item) => {
      if(item.classList.contains('selected')) {
        currency = item.getAttribute('data-currency');
      }
    });

    return currency;
  };

  _collapseStartModal() {
    this._startModal.style.transform = 'scale(0)';
    setTimeout(() => this._startModal.style.display = 'none', 200);
  };

  _displayStartModal() {
    this._startModal.style.display = 'block'

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._startModal.style.transform = 'scale(1)';
        this._sharingWithInput.focus();
      });
    });
  };
};

export default InitSession;