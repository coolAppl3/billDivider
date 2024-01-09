import sessionInfo from "./SessionInfo";
import BillModal from "./BillModal";

import BillElement from "./BillElement";
import dispatchMainGlobalEvents from "./dispatchMainGlobalEvents";

// Initializing imports
const billElement = new BillElement();
const billModal = new BillModal();

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
  };

  _render() {
    this._clearContentList(this._mainContentList);
    this._clearContentList(this._secondaryContentList);
    
    this._loadBills();
  };

  _clearContentList(contentList) {
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
    const contentList = e.target.parentElement.parentElement.lastElementChild;
    const billOwner = this._findBillOwner(contentList); // main for user, secondary for who the user is sharing with.

    billModal.display(billOwner);
  };

  _editBill(e) {
    const billID = e.target.parentElement.parentElement.getAttribute('data-id');
    const contentList = e.target.closest('.session-content-container-list');
    const billOwner = this._findBillOwner(contentList);

    billModal.display(billOwner, billID);
    billModal.populate(billOwner, billID);
  };

  _deleteBill(e) {
    const billElement = e.target.parentElement.parentElement;

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

    this._slideAndRemoveBill(billElement);
    setTimeout(() => dispatchMainGlobalEvents(), 250); // ensuring the animation has time to take place.
  };
  
  _slideAndRemoveBill(billElement) {
    if(window.innerWidth < 500) {
      billElement.style.transform = 'translateX(-30rem)';
    } else {
      billElement.style.transform = 'translateX(-60rem)';
    };

    billElement.style.opacity = '0';
    billElement.style.filter = 'blur(3px)';

    setTimeout(() => billElement.remove(), 250);
  };
  
  _findBillOwner(contentList) {
    let billOwner;
    
    for(let classItem of contentList.classList) {
      if(classItem === 'list-main') {
        billOwner = 'main';
      } else if(classItem === 'list-secondary') {
        billOwner = 'secondary';
      };
    };

    return billOwner;
  };

  _resizeList(e) {
    // const chevronIcon = e.target;
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

};

export default SessionContent;