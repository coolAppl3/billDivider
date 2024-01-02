import sessionInfo from "./SessionInfo";
import ErrorSpan from "./ErrorSpan";
import BillElement from "./BillElement";
import messageDialog from "../global/messageDialog";
import generateBillID from "./generateBillID";

// Initializing imports
const errorSpan = new ErrorSpan();
const billElement = new BillElement();

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
    this._billModal.addEventListener('mousedown', this._handleBillModalClickEvents.bind(this));
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
    const contentList = e.target.parentElement.parentElement.lastElementChild;
    const billOwner = this._findBillOwner(contentList); // main for user, secondary for who the user is sharing with.

    this._displayBillModal(billOwner);
  };

  _addNewBill(e) {
    e.preventDefault();

    const validBillName = this._validateBillName(this._billNameInput);
    const validBillValue = this._isNumber(this._billValueInput);
    const validUnsharedValue = this._isNumber(this._billUnsharedInput);


    if(!validBillName || !validBillValue || !validUnsharedValue) {
      return ;
    };

    const newBill = {
      id: generateBillID(),
      name: this._billNameInput.value,
      value: +this._billValueInput.value,
      unshared: +this._billUnsharedInput.value,
      splitValue: (+this._billValueInput.value - +this._billUnsharedInput.value) / 2,
    };

    const billOwner = this._billModalForm.getAttribute('data-bill-owner');

    if(billOwner === 'main') {
      sessionInfo.billsPaid.push(newBill);
    } else if(billOwner === 'secondary') {
      sessionInfo.billsToPay.push(newBill);
    };

    const newBillElement = billElement.create(newBill);
    this._appendNewBill(newBillElement, billOwner);
    this._hideBillModal();
    messageDialog('New bill added', 'success');
    
    dispatchEvent(new Event('updateSessionInfo'));
    dispatchEvent(new Event('render'));
  };

  _appendNewBill(billElement, billOwner) {
    const contentList = document.querySelector(`.list-${billOwner}`);
    contentList.appendChild(billElement);
    
    this._expandContentList(contentList);
  };

  _validateBillName(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /.*[a-zA-Z].*/; // ensuring at least 1 letter is passed anywhere within the string.
    
    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Bill name must contain at least 1 letter.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };
  
  _isNumber(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    const re = /^\d+(\.\d+)?$/;

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
    this._clearBillModalForm();
    setTimeout(() => this._billModal.style.display = 'none', 200);
  };

  _clearBillModalForm() {
    this._billNameInput.value = '';
    this._billValueInput.value = '';
    this._billUnsharedInput.value = 0;
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