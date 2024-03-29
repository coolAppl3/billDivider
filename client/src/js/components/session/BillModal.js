import sessionInfo from "./SessionInfo";
import ErrorSpan from "../global/ErrorSpan";
import messagePopup from "../global/messagePopup";
import generateBillID from "./generateBillID";

// Initializing imports
const errorSpan = new ErrorSpan();

class BillModal {
  constructor() {
    this._billModal = document.querySelector('.bill-modal');
    this._billModalForm = document.querySelector('.bill-modal-form');

    this._billNameInput = document.querySelector('#billName');
    this._billValueInput = document.querySelector('#billValue');
    this._billUnsharedInput = document.querySelector('#unshared');
    this._billSubmitBtn = document.querySelector('#billSubmitBtn');

    // Checkbox form group
    this._directlyOwedCheckbox = document.querySelector('#directlyOwed');
    this._directlyOwedBySpan = document.querySelector('#directlyOwedBy');

    this._loadEventListeners();
  };

  _loadEventListeners() {
    this._billModal.addEventListener('mousedown', this._handleClickEvents.bind(this));
    this._billModalForm.addEventListener('submit', this._handleFormSubmission.bind(this));

    this._directlyOwedCheckbox.addEventListener('click', this._displayCheckBox.bind(this));
    this._directlyOwedCheckbox.addEventListener('keyup', this._handleCheckBoxKeyEvents.bind(this));
  };

  _handleFormSubmission(e) {
    e.preventDefault();

    const editingBillID = this._billModalForm.getAttribute('data-editing');
    if(!editingBillID) {
      this._addNewBill();
      return ;
    };

    this._updateBill(editingBillID);
    return ;
  };

  _handleClickEvents(e) {
    e.stopImmediatePropagation();

    if(
      e.target.className === this._billModal.className ||
      e.target.className === 'container' ||
      e.target.classList.contains('cancelBtn')
    ) {
      this.hide();
      return ;
    };
  };

  _addNewBill() {
    const validBillName = this._validateBillName(this._billNameInput);
    const validBillValue = this._isNumber(this._billValueInput);
    const validUnsharedValue = this._isNumber(this._billUnsharedInput);

    if(!validBillName || !validBillValue || !validUnsharedValue) {
      return ;
    };

    if(!this._validValueAndUnshared()) {
      return ;
    };

    const directlyOwed = this._directlyOwedCheckboxChecked(); // Boolean
    const billOwner = this._billModalForm.getAttribute('data-bill-owner');

    const newBill = {
      id: generateBillID(),
      name: this._billNameInput.value,
      value: +this._billValueInput.value,
      unshared: this._directlyOwedCheckboxChecked() ? 0 : +this._billUnsharedInput.value,
      splitValue: (+this._billValueInput.value - +this._billUnsharedInput.value) / 2,
      directlyOwed,
      billOwner,
    };

    if(billOwner === 'main') {
      sessionInfo.billsPaid.push(newBill);
    } else if(billOwner === 'secondary') {
      sessionInfo.billsToPay.push(newBill);
    };

    this.hide();
    messagePopup('New bill added', 'success');
    
    dispatchEvent(new Event('updateSessionInfo'));
    dispatchEvent(new Event('render'));
  };

  _updateBill(billID) {
    const validBillName = this._validateBillName(this._billNameInput);
    const validBillValue = this._isNumber(this._billValueInput);
    const validUnsharedValue = this._isNumber(this._billUnsharedInput);

    if(!validBillName || !validBillValue || !validUnsharedValue) {
      return ;
    };

    if(!this._validValueAndUnshared()) {
      return ;
    };

    const directlyOwed = this._directlyOwedCheckboxChecked(); // Boolean
    const billOwner = this._billModalForm.getAttribute('data-bill-owner');
    
    const updatedBill = {
      id: billID,
      name: this._billNameInput.value,
      value: +this._billValueInput.value,
      unshared: this._directlyOwedCheckboxChecked() ? 0 : +this._billUnsharedInput.value,
      splitValue: (+this._billValueInput.value - +this._billUnsharedInput.value) / 2,
      directlyOwed,
      billOwner,
    };
    
    if(billOwner === 'main') {
      const billIndex = sessionInfo.billsPaid.findIndex((bill) => bill.id === updatedBill.id);
      sessionInfo.billsPaid[billIndex] = updatedBill;
    } else if(billOwner === 'secondary') {
      const billIndex = sessionInfo.billsToPay.findIndex((bill) => bill.id === updatedBill.id);
      sessionInfo.billsToPay[billIndex] = updatedBill;
    };

    this.hide();
    messagePopup('Bill updated', 'success');

    dispatchEvent(new Event('updateSessionInfo'));
    dispatchEvent(new Event('render'));
  };


  // Validation
  _validateBillName(input) {
    const value = input.value;
    const inputFormGroup = input.parentElement;

    if(value.length > 50) {
      errorSpan.display(inputFormGroup, 'Bill name can not contain more than 50 characters.');
      return false;
    };
    
    const re = /.*[a-zA-Z].*/; // ensuring at least 1 letter is passed anywhere within the string.
    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Bill name must contain at least 1 letter.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };
  
  _isNumber(input) {
    if(input.id === 'unshared' && this._directlyOwedCheckboxChecked()) {
      return true;
    };
    
    const value = input.value.trim();
    const inputFormGroup = input.parentElement;

    const re = /^\d+(\.\d+)?$/;

    if(!re.test(value)) {
      errorSpan.display(inputFormGroup, 'Please enter a valid number.');
      return false;
    };

    errorSpan.hide(inputFormGroup);
    return true;
  };

  _validValueAndUnshared() {
    errorSpan.hide(this._billValueInput.parentElement);
    errorSpan.hide(this._billUnsharedInput.parentElement);
    
    const billValue = this._billValueInput.value;
    const unsharedValue = this._directlyOwedCheckboxChecked() ? 0 : this._billUnsharedInput.value;

    if(+billValue <= 0) {
      errorSpan.display(this._billValueInput.parentElement, 'Bill value can not be equal to or below 0.');
      return false;
    };

    if(+unsharedValue < 0) {
      errorSpan.display(this._billUnsharedInput.parentElement, 'Unshared value can not be a negative value.');
      return false;
    };

    if(+billValue <= +unsharedValue) {
      errorSpan.display(this._billUnsharedInput.parentElement, `Unshared value can not exceed or be equal to the bill's value.`);
      return false;
    };

    return true;
  };
  

  // Utility
  display(billOwner, editingBillID = false) {
    const billOwnerNameSpan = document.querySelector('#billOwnerName');
    billOwnerNameSpan.textContent = billOwner === 'main' ? 'you' : sessionInfo.sharedWith;
    this._billModalForm.setAttribute('data-bill-owner', billOwner);

    this._directlyOwedBySpan.textContent = billOwner === 'main' ? sessionInfo.sharedWith : 'you';
    this._billModal.style.display = 'block';
    
    if(editingBillID) {
      this._billModalForm.setAttribute('data-editing', editingBillID);
      this._startEditMode();
      this._populate(billOwner, editingBillID);
    } else {
      this._billNameInput.focus();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._billModal.style.opacity = '1';
        this._billModal.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  };

  hide() {
    this._billModalForm.removeAttribute('data-bill-owner');
    this._billModalForm.removeAttribute('data-editing');

    this._billModal.style.opacity = '0';
    this._clearForm();

    setTimeout(() => {
      this._billModal.style.display = 'none';
      this._billModal.style.transform = 'translate3d(0, -20px, 0)';
      this._endEditMode();
    }, 200);
  };

  _clearForm() {
    this._billNameInput.value = '';
    this._billValueInput.value = '';
    this._billUnsharedInput.value = 0;
    this._directlyOwedCheckbox.classList.remove('checked');
    this._enableUnsharedInput();

    errorSpan.hide(this._billNameInput.parentElement);
    errorSpan.hide(this._billValueInput.parentElement);
    errorSpan.hide(this._billUnsharedInput.parentElement);
  };

  _startEditMode() {
    this._billSubmitBtn.textContent = 'Update bill';

    const billModalFormTitle = document.querySelector('.bill-modal-form .form-group-title p');
    billModalFormTitle.firstChild.textContent = 'Editing a bill paid by ';
  };

  _endEditMode() {
    this._billSubmitBtn.textContent = 'Add bill';

    const billModalFormTitle = document.querySelector('.bill-modal-form .form-group-title p');
    billModalFormTitle.firstChild.textContent = 'Adding a bill paid by ';
  };

  _populate(billOwner, billID) {
    let selectedBill;
    if(billOwner === 'main') {
      selectedBill = sessionInfo.billsPaid.find(({ id }) => id === billID);
    } else if(billOwner === 'secondary') {
      selectedBill = sessionInfo.billsToPay.find(({ id }) => id === billID);
    } else {
      return;
    };

    this._billNameInput.value = selectedBill.name;
    this._billValueInput.value = selectedBill.value;
    this._billUnsharedInput.value = selectedBill.unshared;

    if(selectedBill.directlyOwed) {
      this._directlyOwedCheckbox.classList.add('checked');
      this._disableUnsharedInput();
    };
  };

  _handleCheckBoxKeyEvents(e) {
    const pressedKey = e.key;

    if(pressedKey === 'Enter') {
      this._displayCheckBox();
    };
  };
  
  _displayCheckBox() {
    if(this._directlyOwedCheckbox.classList.contains('checked')) {
      this._directlyOwedCheckbox.classList.remove('checked');
      this._enableUnsharedInput();
      return ;
    }

    this._directlyOwedCheckbox.classList.add('checked');
    this._disableUnsharedInput();
  };

  _directlyOwedCheckboxChecked() {
    return this._directlyOwedCheckbox.classList.contains('checked');
  };

  _disableUnsharedInput() {
    this._billUnsharedInput.setAttribute('disabled', 'true');
    this._billUnsharedInput.parentElement.classList.add('disabled');
  };

  _enableUnsharedInput() {
    this._billUnsharedInput.removeAttribute('disabled');
    this._billUnsharedInput.parentElement.classList.remove('disabled');
  };
};

export default BillModal;