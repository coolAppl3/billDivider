import sessionInfo from "./SessionInfo";
import BillModal from "./BillModal";
import BillElement from "./BillElement";
import ConfirmModal from "../global/ConfirmModal";
import messagePopup from "../global/messagePopup";
import SessionReference from "./SessionReference";
import ErrorSpan from "../global/ErrorSpan";

// Initializing imports
const billElement = new BillElement();
const billModal = new BillModal();
const confirmModal = new ConfirmModal();
const errorSpan = new ErrorSpan();

class SessionContent {
  constructor() {
    this._sessionContent = document.querySelector('.session-content');
    this._mainContentList = document.querySelector('.list-main');
    this._secondaryContentList = document.querySelector('.list-secondary');
    this._searchBarMain = document.querySelector('#searchBarMain');
    this._searchBarSecondary = document.querySelector('#searchBarSecondary');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('render', this._render.bind(this));
    window.addEventListener('sessionStarted', this._handleSessionStartedEvent.bind(this));
    
    this._sessionContent.addEventListener('click', this._handleSessionContentClickEvents.bind(this));
    this._sessionContent.addEventListener('keyup', this._handleSessionContentKeyEvents.bind(this));

    this._searchBarMain.addEventListener('keyup', this._filterBills.bind(this, 'main'));
    this._searchBarSecondary.addEventListener('keyup', this._filterBills.bind(this, 'secondary'));

    this._searchBarMain.addEventListener('focus', this._startFilterBills.bind(this, 'main'));
    this._searchBarSecondary.addEventListener('focus', this._startFilterBills.bind(this, 'secondary'));
  };

  _handleSessionContentKeyEvents(e) {
    if(e.key !== 'Enter') {
      return ;
    };

    if(e.target.classList.contains('expandList')) {
      this._resizeList(e);
      return ;
    };

    if(e.target.classList.contains('editBillIcon')) {
      this._editBill(e);
      return ;
    };

    if(e.target.classList.contains('removeBillIcon')) {
      this._deleteBill(e);
      return ;
    };
  };

  _handleSessionContentClickEvents(e) {
    e.stopImmediatePropagation();
    
    if(e.target.classList.contains('expandList')) {
      this._resizeList(e);
      return ;
    };

    if(e.target.classList.contains('addBillBtn')) {
      this._startNewBill(e);
      return ;
    };

    if(e.target.classList.contains('editBillIcon')) {
      this._editBill(e);
      return ;
    };

    if(e.target.classList.contains('removeBillIcon')) {
      this._deleteBill(e);
      return ;
    };

    if(e.target.classList.contains('clearListBtn')) {
      this._startClearContentList(e);
      return ;
    };
  };

  _render() {
    this._emptyContentList(this._mainContentList);
    this._emptyContentList(this._secondaryContentList);
    this._loadBills();
    this._enableClearButtons();
    this._enableAddBillButtons();
    this._enableFilterInputs();
  };

  _handleSessionStartedEvent() {
    this._enableAddBillButtons();
    this._enableFilterInputs();
    this._scrollContentIntoView();
  };

  _emptyContentList(contentList) {
    const contentListArr = Array.from(contentList.childNodes);
    contentListArr.forEach((bill) => bill.remove());
  };

  _loadBills() {
    if(sessionInfo.billsPaid.length > 0) {
      sessionInfo.billsPaid.toReversed().forEach((bill) => {
        const billDiv = billElement.create(bill);
        this._mainContentList.appendChild(billDiv);
      });

      this._expandContentList(this._mainContentList);
    };

    if(sessionInfo.billsToPay.length > 0) {
      sessionInfo.billsToPay.toReversed().forEach((bill) => {
        const billDiv = billElement.create(bill);
        this._secondaryContentList.appendChild(billDiv);
      });

      this._expandContentList(this._secondaryContentList);
    };
  };

  _startNewBill(e) {
    const billOwner = e.target.parentElement.getAttribute('data-list');
    billModal.display(billOwner);
  };

  _editBill(e) {
    const billID = e.target.parentElement.parentElement.getAttribute('data-id');
    const contentList = e.target.closest('.session-content-container-list');
    const billOwner = contentList.getAttribute('data-list');

    billModal.display(billOwner, billID);
  };

  _deleteBill(e) {
    const billElement = e.target.parentElement.parentElement;
    const contentList = billElement.parentElement;

    const billID = billElement.getAttribute('data-id');
    const billOwner = billElement.getAttribute('data-bill-owner');

    let billIndex;
    if(billOwner === 'main') {
      billIndex = sessionInfo.billsPaid.findIndex(({ id }) => id === billID);
    } else if(billOwner === 'secondary') {
      billIndex = sessionInfo.billsToPay.findIndex(({ id }) => id === billID);
    };

    if(billIndex === -1) {
      return ;
    };

    if(billOwner === 'main') {
      sessionInfo.billsPaid.splice(billIndex, 1);
    } else if(billOwner === 'secondary') {
      sessionInfo.billsToPay.splice(billIndex, 1);
    };

    let isOnlyBillInList = false;
    if(!billElement.nextElementSibling && !billElement.previousElementSibling) {
      isOnlyBillInList = true;
    };

    this._slideAndRemoveBill(billElement);
    setTimeout(() => {
      dispatchEvent(new Event('updateSessionInfo'));
      dispatchEvent(new Event('render'));
      messagePopup('Bill deleted', 'danger');

      if(isOnlyBillInList) {
        this._retractContentList(contentList);
      };
    }, 250);
  };

  _startClearContentList(e) {
    const listOwner = e.target.parentElement.getAttribute('data-list');
    const listOwnerName = listOwner === 'main' ? 'you' : sessionInfo.sharedWith;
    confirmModal.display(`Are you sure you want to delete all the bills paid by ${listOwnerName}?`, 'danger');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', function eventHandler(e) {
      if(confirmModal.isExitClick(e)) {
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();
        return ;
      };
  
      if(e.target.id === 'confirmModalConfirmBtn') {
        this._clearContentList(listOwner);
        confirmModalElement.removeEventListener('click', eventHandler);
        confirmModal.remove();
        return ;
      };
    }.bind(this));
  };

  _clearContentList(listOwner) {
    if(listOwner === 'main') {
      sessionInfo.billsPaid = [];
      messagePopup('Cleared bills paid by you', 'success');
      this._retractContentList(this._mainContentList);
      
    } else if(listOwner === 'secondary') {
      sessionInfo.billsToPay = [];
      messagePopup(`Cleared bills paid by ${sessionInfo.sharedWith}`, 'success');
      this._retractContentList(this._secondaryContentList);
      
    } else {
      messagePopup('Something went wrong', 'danger');
      return ;
    };
    
    dispatchEvent(new Event('updateSessionInfo'));
    dispatchEvent(new Event('render'));
  };

  _startFilterBills(type) {
    const contentList = document.querySelector(`.list-${type}`);
    this._expandContentList(contentList);
  };

  _filterBills(type, e) {
    const filterValue = e.target.value.toLowerCase();
    const bills = document.querySelectorAll(`[data-bill-owner="${type}"]`);

    for(const bill of bills) {
      const billName = bill.firstElementChild.textContent.split(': ')[1].toLowerCase();

      if(billName.indexOf(filterValue) !== -1) {
        bill.style.display = 'grid';
        bill.classList.add('filter-visible');
      } else {
        bill.style.display = 'none';
        bill.classList.remove('filter-visible');
      };
    };

    const filterInput = document.querySelector(`.content-search-${type}`);
    const atLeastOneResult = document.querySelector(`.list-${type} .filter-visible`);

    if(!atLeastOneResult) {
      errorSpan.display(filterInput, 'No results found');
    } else {
      errorSpan.hide(filterInput);
    };
  };

  // Utility
  
  _slideAndRemoveBill(billElement) {
    if(!billElement || !(billElement instanceof HTMLElement)) {
      return ;
    };
    
    if(window.innerWidth < 500) {
      billElement.style.transform = 'translate3d(-30rem, 0, 0)';
    } else {
      billElement.style.transform = 'translate3d(-60rem, 0, 0)';
    };

    billElement.style.opacity = '0';
    billElement.style.filter = 'blur(3px)';

    setTimeout(() => billElement.remove(), 250);
  };
  
  _resizeList(e) {
    const contentList = e.target.closest('.session-content-container').lastElementChild;
    
    if(contentList.classList.contains('expanded')) {
      this._retractContentList(contentList);
      return ;
    };

    this._expandContentList(contentList);
  };

  _expandContentList(contentList) {
    contentList.classList.add('expanded');

    const chevronIcon = contentList.parentElement.querySelector('.chevron-icon');
    chevronIcon.classList.add('rotate');
    
    let listHeight = 0;
    let listChildBottomMargin = 20;
    for(let child of contentList.children) {
      listHeight += (child.offsetHeight + listChildBottomMargin);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `${listHeight - 20}px`;
      });
    });
  };

  _retractContentList(contentList) {
    contentList.classList.remove('expanded');
    
    const chevronIcon = contentList.parentElement.querySelector('.chevron-icon');
    chevronIcon.classList.remove('rotate');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `0px`;
      });
    });
   
  };

  _enableClearButtons() {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    if(sessionInfo.billsPaid.length === 0) {
      mainClearListBtn.setAttribute('disabled', '');
      mainClearListBtn.classList.add('disabled');

    } else {
      mainClearListBtn.removeAttribute('disabled');
      mainClearListBtn.classList.remove('disabled');
    };

    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    if(sessionInfo.billsToPay.length === 0) {
      secondaryClearListBtn.setAttribute('disabled', '');
      secondaryClearListBtn.classList.add('disabled');

    } else {
      secondaryClearListBtn.removeAttribute('disabled');
      secondaryClearListBtn.classList.remove('disabled');
    };
  };

  _enableAddBillButtons() {
    const addBillButtons = document.querySelectorAll('.addBillBtn');
    
    if(sessionInfo.billLimitReached()) {
      for(const btn of addBillButtons) {
        btn.setAttribute('disabled', '');
        btn.setAttribute('title', 'Bill limit reached');
        btn.classList.add('disabled');
      };

      return ;
    };

    for(const btn of addBillButtons) {
      btn.removeAttribute('disabled');
      btn.removeAttribute('title');
      btn.classList.remove('disabled');
    };
  };

  _enableFilterInputs() {
    if(sessionInfo.billsPaid.length === 0) {
      this._searchBarMain.setAttribute('disabled', '');
      this._searchBarMain.setAttribute('placeholder', 'No bills to filter');
      this._searchBarMain.classList.add('disabled');
    } else {
      this._searchBarMain.removeAttribute('disabled');
      this._searchBarMain.setAttribute('placeholder', 'Search bills by name');
      this._searchBarMain.classList.remove('disabled');
    };

    if(sessionInfo.billsToPay.length === 0) {
      this._searchBarSecondary.setAttribute('disabled', '');
      this._searchBarSecondary.setAttribute('placeholder', 'No bills to filter');
      this._searchBarSecondary.classList.add('disabled');
    } else {
      this._searchBarSecondary.removeAttribute('disabled');
      this._searchBarSecondary.setAttribute('placeholder', 'Search bills by name');
      this._searchBarSecondary.classList.remove('disabled');
    };
  };

  _scrollContentIntoView() {
    if(screen.width > 500) {
      return ;
    };
    
    if(!SessionReference.referenceExists()) {
      const firstAddBillBtn = document.querySelector('.addBillBtn');
      
      firstAddBillBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    };
  };
};

export default SessionContent;