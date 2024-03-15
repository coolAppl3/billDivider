import sessionInfo from "./SessionInfo";
import BillModal from "./BillModal";
import BillElement from "./BillElement";
import ConfirmModal from "../global/ConfirmModal";
import messagePopup from "../global/messagePopup";
import SessionReference from "./SessionReference";

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
    window.addEventListener('sessionStarted', this._scrollContentIntoView.bind(this));
    window.addEventListener('sessionStarted', this._enableAddBillButtons.bind(this));
    
    this._sessionContent.addEventListener('click', this._handleSessionContentClickEvents.bind(this));
    this._sessionContent.addEventListener('keyup', this._handleSessionContentKeyEvents.bind(this));
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