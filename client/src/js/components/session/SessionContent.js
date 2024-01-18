import sessionInfo from "./SessionInfo";
import BillModal from "./BillModal";

import BillElement from "./BillElement";
import dispatchMainGlobalEvents from "./dispatchMainGlobalEvents";
import ConfirmModal from "../global/ConfirmModal";
import messagePopup from "../global/messagePopup";

// Initializing imports
const billElement = new BillElement();
const billModal = new BillModal();
const confirmModal = new ConfirmModal();

class SessionContent {
  constructor() {
    this._sessionContent = document.querySelector('.session-content');
    this._mainContentList = document.querySelector('.list-main');
    this._secondaryContentList = document.querySelector('.list-secondary');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    window.addEventListener('render', this._render.bind(this));
    
    this._sessionContent.addEventListener('click', this._handleSessionContentClickEvents.bind(this));
  };

  _handleSessionContentClickEvents(e) {
    e.stopImmediatePropagation();
    
    if(e.target.classList.contains('expandList')) {
      return this._resizeList(e);
    };

    if(e.target.classList.contains('addBillBtn')) {
      return this._startNewBill(e);
    };

    if(e.target.classList.contains('editBillIcon')) {
      return this._editBill(e);
    };

    if(e.target.classList.contains('removeBillIcon')) {
      return this._deleteBill(e);
    };

    if(e.target.classList.contains('clearListBtn')) {
      return this._startClearContentList(e);
    };
  };

  _render() {
    this._emptyContentList(this._mainContentList);
    this._emptyContentList(this._secondaryContentList);
    this._loadBills();

    this._enableClearButtons();
  };

  _emptyContentList(contentList) {
    const contentListArr = Array.from(contentList.childNodes);
    contentListArr.forEach((bill) => bill.remove());
  };

  _loadBills() {
    
    if(sessionInfo.billsPaid[0]) {
      sessionInfo.billsPaid.forEach((bill) => {
        const billDiv = billElement.create(bill);
        this._mainContentList.appendChild(billDiv);
      });

      this._expandContentList(this._mainContentList);
    };

    if(sessionInfo.billsToPay[0]) {
      sessionInfo.billsToPay.forEach((bill) => {
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
    billModal.populate(billOwner, billID);
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
      dispatchMainGlobalEvents();
      messagePopup('Bill deleted', 'danger');

      // Retracting the contentList if the user is deleting the only element in the list.
      if(isOnlyBillInList) {
        this._retractContentList(contentList);
      };
    }, 250); // ensuring the animation has time to take place.
  };

  _startClearContentList(e) {
    const listOwner = e.target.parentElement.getAttribute('data-list');
    const listOwnerName = listOwner === 'main' ? 'you' : sessionInfo.sharedWith;
    confirmModal.display(`Are you sure you want to delete all the bills paid by ${listOwnerName}?`, 'danger');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.addEventListener('click', (e) => {
      if(confirmModal.isExitClick(e)) {
        confirmModal.remove();
        return ;
      };
  
      if(e.target.id === 'confirmModalConfirmBtn') {
        this._clearContentList(listOwner);
        confirmModal.remove();
        return ;
      };
    });
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
    };
    
    dispatchMainGlobalEvents();
  };

  // Utility
  
  _slideAndRemoveBill(billElement) {
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
    } else {
      this._expandContentList(contentList);
    };
    
  };

  _expandContentList(contentList) {
    contentList.classList.add('expanded');

    const chevronIcon = contentList.parentElement.firstElementChild.firstElementChild.firstElementChild;
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
    
    const chevronIcon = contentList.parentElement.firstElementChild.firstElementChild.firstElementChild;
    chevronIcon.classList.remove('rotate');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `0px`;
      });
    });
   
  };

  _enableClearButtons() {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    if(this._mainContentList.hasChildNodes()) {
      mainClearListBtn.removeAttribute('disabled');
      mainClearListBtn.classList.remove('disabled');
    } else {
      mainClearListBtn.setAttribute('disabled', '');
      mainClearListBtn.classList.add('disabled');
    }

    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    if(this._secondaryContentList.hasChildNodes()) {
      secondaryClearListBtn.removeAttribute('disabled');
      secondaryClearListBtn.classList.remove('disabled');
    } else {
      secondaryClearListBtn.setAttribute('disabled', '');
      secondaryClearListBtn.classList.add('disabled');
    }
  };

};

export default SessionContent;