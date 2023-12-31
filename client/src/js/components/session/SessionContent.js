import sessionInfo from "./SessionInfo";
import ErrorSpan from "./ErrorSpan";

// Initializing imports
const errorSpan = new ErrorSpan();

class SessionContent {
  constructor() {
    this._sessionContent = document.querySelector('.session-content');

    this._billModal = document.querySelector('.bill-modal');
    this._billModalForm = document.querySelector('.bill-modal-form');

    this._billNameInput = document.querySelector('#billName');
    this._billValueInput = document.querySelector('#billValue');
    this._billUnsharedInput = document.querySelector('#unshared');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._sessionContent.addEventListener('click', this._handleSessionContentClickEvents.bind(this));

    // Bill modal
    this._billModal.addEventListener('click', this._handleBillModalClickEvents.bind(this));
    this._billModalForm.addEventListener('submit', this._addNewBill.bind(this));
  };

  _handleSessionContentClickEvents(e) {
    e.stopImmediatePropagation();
    
    if(e.target.classList.contains('expandList')) {
      return this._resizeList(e);
    };

    if(e.target.classList.contains('addBillBtn')) {
      return this._startNewBill(e);
    };
  };

  _startNewBill(e) {
    const clickedBtn = e.target;
    const contentList = e.target.parentElement.parentElement.lastElementChild;
    const billOwner = this._findBillOwner(contentList); // main for user, secondary for who the user is sharing with.

    this._displayBillModal(billOwner);
  };

  _addNewBill(e) {
    e.preventDefault();

    const validBillValue = this._isNumber(this._billValueInput);
    // CONTINUE HERE

  };

  _isNumber(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /^\d+$/;

    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Please enter a valid number.')
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };

  _handleBillModalClickEvents(e) {
    e.stopImmediatePropagation();

    if(
      e.target.className === this._billModal.className ||
      e.target.className === 'container' ||
      e.target.classList.contains('cancelBtn')
    ) {
      return this._hideBillModal();
    };
  };

  _displayBillModal(billOwner) {
    const billOwnerNameSpan = document.querySelector('#billOwnerName');
    billOwnerNameSpan.textContent = billOwner === 'main' ? 'you' : sessionInfo.sharedWith;
    this._billModalForm.setAttribute('data-bill-owner', billOwner);

    this._billModal.style.display = 'block';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._billModal.style.opacity = '1';
      });
    });
  };

  _hideBillModal() {
    this._billModalForm.removeAttribute('data-bill-owner');
    this._billModal.style.opacity = '0';
    setTimeout(() => this._billModal.style.display = 'none', 200);
  };

  _findBillOwner(contentList) {
    let billOwner;
    
    for(let classItem of contentList.classList) {
      if(classItem === 'list-main') {
        billOwner = 'main';
      } else {
        billOwner = 'secondary';
      };
    };

    return billOwner;
  };

  _resizeList(e) {
    const chevronIcon = e.target;
    const contentList = e.target.closest('.session-content-container').lastElementChild;
    
    if(contentList.classList.contains('expanded')) {
      this._retractContentList(contentList, chevronIcon);
    } else {
      this._expandContentList(contentList, chevronIcon);
    };
    
  };

  _expandContentList(contentList, chevronIcon) {
    contentList.classList.add('expanded');
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

  _retractContentList(contentList, chevronIcon) {
    contentList.classList.remove('expanded');
    chevronIcon.classList.remove('rotate');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentList.style.maxHeight = `0px`;
      });
    });
   
  };
};

export default SessionContent;