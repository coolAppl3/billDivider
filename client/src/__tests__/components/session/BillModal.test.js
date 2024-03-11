import BillModal from "../../../js/components/session/BillModal";

import sessionInfo from "../../../js/components/session/SessionInfo";
import ErrorSpan from "../../../js/components/global/ErrorSpan";
import messagePopup from "../../../js/components/global/messagePopup";
import generateBillID from "../../../js/components/session/generateBillID";

jest.mock('../../../js/components/session/SessionInfo');
jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/session/generateBillID');

const billModalHTML = `
  <div class="bill-modal">
    <div class="container">
      <form class="bill-modal-form">
        <div class="form-group form-group-title">
          <p class="content-p">Adding a bill paid by <span id="billOwnerName"></span></p>
        </div>
        <div class="form-group">
          <label for="billName">Bill name</label>
          <input
            type="text"
            id="billName"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <label for="billValue">Bill value</label>
          <input
            type="text"
            id="billValue"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <label for="unshared">Unshared</label>
          <span class="label-info"
            >Total value of items not being shared</span
          >
          <input
            type="text"
            id="unshared"
            value="0"
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group checkbox-group">
          <div
            class="checkbox"
            id="directlyOwed"
            tabindex="0"
          >
            <span class="check-icon"></span>
          </div>
          <p>To be fully paid by <span id="directlyOwedBy"></span></p>
        </div>

        <div class="form-group">
          <div class="btn-div">
            <button
              type="submit"
              class="btn btn-cta"
              id="billSubmitBtn"
            >
              Add bill
            </button>
          </div>
          <div class="btn-div">
            <div class="btn btn-border-light cancelBtn">Cancel</div>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

let billModal;

beforeEach(() => {
  document.body.innerHTML = billModalHTML;
  billModal = new BillModal();
});

afterEach(() => {
  document.body.innerHTML = '';
  billModal = null;
  jest.resetAllMocks();

  sessionInfo.sharedWith = undefined;
  sessionInfo.yourTotal = 0;
  sessionInfo.sharedWithTotal = 0;
  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];
});

describe('_handleFormSubmission(e)', () => {
  it('should always return undefined if a valid event listener is passed in', () => {
    const mockEvent1 = { preventDefault: () => {} };
    const mockEvent2 = { preventDefault: () => {}, someProperty: 'someValue'};

    expect(billModal._handleFormSubmission(mockEvent1)).toBeUndefined();
    expect(billModal._handleFormSubmission(mockEvent2)).toBeUndefined();
  });
  
  it(`should check for a billID through the "data-editing" attribute on the billModalForm element, and if one doesn't exist, call _addNewBill() then return undefined`, () => {
    billModal._billModalForm.removeAttribute('data-editing');
    const mockEvent = { preventDefault: () => {} };
    const _addNewBillSpy = jest.spyOn(billModal, '_addNewBill').mockImplementation(() => {});

    expect(billModal._handleFormSubmission(mockEvent)).toBeUndefined();
    expect(_addNewBillSpy).toHaveBeenCalled();
  });

  it(`should check for a billID through the "data-editing" attribute on the billModalForm element, and if one exists, call _updateBill(editingBillId) then return undefined`, () => {
    billModal._billModalForm.setAttribute('data-editing', 'mockID');
    const mockEvent = { preventDefault: () => {} };
    const _updateBill = jest.spyOn(billModal, '_updateBill').mockImplementation(() => {});

    expect(billModal._handleFormSubmission(mockEvent)).toBeUndefined();
    expect(_updateBill).toHaveBeenCalledWith('mockID');
  });
});

describe('_handleClickEvents(e)', () => {
  it('should always return undefined if a valid event listener is passed in', () => {
    const mockEvent1 = {
      stopImmediatePropagation: () => {},
      target: {
        className: 'mockClassName1',
        classList: {
          contains: () => { return false; },
        },
      },
    };

    const mockEvent2 = {
      stopImmediatePropagation: () => {},
      target: {
        className: 'mockClassName2',
        classList: {
          contains: () => { return true; },
        },
      },
    };

    expect(billModal._handleClickEvents(mockEvent1)).toBeUndefined();
    expect(billModal._handleClickEvents(mockEvent2)).toBeUndefined();
  });
  
  it(`should check if the target contains a class of "bill-modal", "container", or "cancelBtn", and if that's the case, call hide() and return undefined`, () => {
    const _hideSpy = jest.spyOn(billModal, 'hide').mockImplementation(() => {});
    const mockEvent = {
      stopImmediatePropagation: () => {},
      target: {
        className: 'mockClassName',
        classList: {
          contains: () => { return true; },
        },
      },
    };

    expect(billModal._handleClickEvents(mockEvent)).toBeUndefined();
    expect(_hideSpy).toHaveBeenCalled();
  });

  it(`should check if the target contains a class of "bill-modal", "container", or "cancelBtn", and if that's not the case, return undefined and not call hide()`, () => {
    const _hideSpy = jest.spyOn(billModal, 'hide').mockImplementation(() => {});
    const mockEvent = {
      stopImmediatePropagation: () => {},
      target: {
        className: 'mockClassName',
        classList: {
          contains: () => { return false; },
        },
      },
    };

    expect(billModal._handleClickEvents(mockEvent)).toBeUndefined();
    expect(_hideSpy).not.toHaveBeenCalled();
  });
});

describe('_addNewBill()', () => {
  it('should always return undefined', () => {
    expect(billModal._addNewBill()).toBeUndefined();
    expect(billModal._addNewBill(null)).toBeUndefined();
    expect(billModal._addNewBill(0)).toBeUndefined();
    expect(billModal._addNewBill('')).toBeUndefined();
    expect(billModal._addNewBill({})).toBeUndefined();
    expect(billModal._addNewBill([])).toBeUndefined();
    expect(billModal._addNewBill('some value')).toBeUndefined();
    expect(billModal._addNewBill(5)).toBeUndefined();
  });

  it('should return undefined and stop the function if the bill name does not at least contain a single letter', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    
    billModal._billNameInput.value = '200';

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);

    expect(_validValueAndUnsharedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the bill value contains anything but a number', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    
    billModal._billNameInput.value = 'mock name';
    billModal._billValueInput.value = 'invalid_number_100';

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);
    
    expect(_validValueAndUnsharedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });

  it('should return undefined and stop the function if the bill value is less than 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    billModal._billValueInput.value = '-1';
  
    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });

  it('should return undefined and stop the function if the bill value is equal to 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    billModal._billValueInput.value = '0';
  
    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });

  it('should return undefined and stop the function if the unshared value is less than 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '-50';
  
    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });

  it('should return undefined and stop the function if the unshared value is greater than the bill value', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '200';
  
    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and set the directlyOwed property to true if _directlyOwedCheckbox contains a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeTruthy();
  });
  
  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and set the directlyOwed property to false if _directlyOwedCheckbox does not contain a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.remove('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeFalsy();
  });

  it(`should set the billOwner property to "main", if the value of the "data-bill-owner" attribute on the billModalForm is set to "main"`, () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    expect(billModal._addNewBill()).toBeUndefined();

    const billOwnerValue = sessionInfo.billsPaid[0].billOwner;
    expect(billOwnerValue).toBe('main');
  });

  it(`should set the billOwner property to "secondary", if the value of the "data-bill-owner" attribute on the billModalForm is set to "secondary"`, () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'secondary');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    expect(billModal._addNewBill()).toBeUndefined();

    const billOwnerValue = sessionInfo.billsToPay[0].billOwner;
    expect(billOwnerValue).toBe('secondary');
  });

  it('should, assuming the input values are valid, call generateBillID() to create an ID for the bill, then push a bill object to sessionInfo with the correct data values and data types', () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    billModal._directlyOwedCheckbox.classList.remove('checked');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    generateBillID.mockImplementationOnce(() => { return 'mockBillID'; });

    expect(billModal._addNewBill()).toBeUndefined();
    expect(generateBillID).toHaveBeenCalled();

    const firstAddedBill = sessionInfo.billsPaid[0];
    expect(firstAddedBill.id).toBe('mockBillID');
    expect(firstAddedBill.name).toBe('mock bill');
    expect(firstAddedBill.value).toBe(100);
    expect(firstAddedBill.unshared).toBe(0);
    expect(firstAddedBill.billOwner).toBe('main');
    expect(firstAddedBill.directlyOwed).toBeFalsy();

    // Testing another bill --- --- ---
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];

    billModal._billModalForm.setAttribute('data-bill-owner', 'secondary');
    billModal._directlyOwedCheckbox.classList.add('checked');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '0';

    generateBillID.mockImplementationOnce(() => { return 'mockBillID'; });

    expect(billModal._addNewBill()).toBeUndefined();
    expect(generateBillID).toHaveBeenCalled();

    const secondAddedBill = sessionInfo.billsToPay[0];
    expect(secondAddedBill.id).toBe('mockBillID');
    expect(secondAddedBill.name).toBe('mock bill');
    expect(secondAddedBill.value).toBe(200);
    expect(secondAddedBill.unshared).toBe(0);
    expect(secondAddedBill.splitValue).toBe(100);
    expect(secondAddedBill.billOwner).toBe('secondary');
    expect(secondAddedBill.directlyOwed).toBeTruthy();
  });

  it(`should, if all input values are valid, call hide() and messagePopup(), as well as dispatch two events: "updateSessionInfo" and "render"`, () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    billModal._directlyOwedCheckbox.classList.remove('checked');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';
    
    const hideSpy = jest.spyOn(billModal, 'hide');
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => {});

    const firstMockEVent = new Event('updateSessionInfo');
    const secondMockEvent = new Event('render');

    expect(billModal._addNewBill()).toBeUndefined();
    expect(hideSpy).toHaveBeenCalled();
    expect(messagePopup).toHaveBeenCalledWith('New bill added', 'success');
    
    expect(dispatchEventSpy).toHaveBeenCalledWith(firstMockEVent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(secondMockEvent);
  });
});

describe('_updateBill()', () => {
  let mockBillMain;
  let mockBillSecondary;

  beforeEach(() => {
    mockBillMain = {
      id: 'mockBillID',
      name: 'mock bill',
      value: 200,
      unshared: 50,
      splitValue: 75,
      directlyOwed: false,
      billOwner: 'main',
    };

    mockBillSecondary = {
      id: 'mockBillID',
      name: 'mock bill',
      value: 200,
      unshared: 50,
      splitValue: 75,
      directlyOwed: false,
      billOwner: 'secondary',
    };

    sessionInfo.billsPaid.push(mockBillMain);
    sessionInfo.billsToPay.push(mockBillSecondary);
  });

  afterEach(() => {
    mockBillMain = null;
    mockBillSecondary = null;
  });
  
  it('should always return undefined', () => {
    expect(billModal._updateBill()).toBeUndefined();
    expect(billModal._updateBill(null)).toBeUndefined();
    expect(billModal._updateBill(0)).toBeUndefined();
    expect(billModal._updateBill('')).toBeUndefined();
    expect(billModal._updateBill({})).toBeUndefined();
    expect(billModal._updateBill([])).toBeUndefined();
    expect(billModal._updateBill('mockBillID')).toBeUndefined();
    expect(billModal._updateBill(5)).toBeUndefined();
  });

  it('should return undefined and stop the function if the bill name does not at least contain a single letter', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    
    billModal._billNameInput.value = '200';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);
  
    expect(_validValueAndUnsharedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the bill value contains anything but a number', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    
    billModal._billNameInput.value = 'mock name';
    billModal._billValueInput.value = 'invalid_number_100';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);
    
    expect(_validValueAndUnsharedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the bill value is less than 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    billModal._billValueInput.value = '-1';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the bill value is equal to 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    billModal._billValueInput.value = '0';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the unshared value is less than 0', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '-50';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });
  
  it('should return undefined and stop the function if the unshared value is greater than the bill value', () => {
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');
    
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '200';
  
    expect(billModal._updateBill()).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // the function above is next. It not being called proves the function stopped.
  });

  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and update the directlyOwed property to true if _directlyOwedCheckbox contains a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '50';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._updateBill(mockBillMain.id)).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeTruthy();
  });

  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and update the directlyOwed property to false if _directlyOwedCheckbox does not contain a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.remove('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '50';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._updateBill(mockBillMain.id)).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeFalsy();
  });

  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and update the directlyOwed property to true if _directlyOwedCheckbox contains a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '50';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._updateBill(mockBillMain.id)).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeTruthy();
  });

  it('should update the selected bill object in sessionInfo with the correct data values and data types, and should not alter the bill ID', () => {
    billModal._directlyOwedCheckbox.classList.remove('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';

    const mockBillMainID = sessionInfo.billsPaid[0].id;
    expect(billModal._updateBill(mockBillMainID)).toBeUndefined();

    const updatedMockBillMain = sessionInfo.billsPaid[0];
    expect(updatedMockBillMain.id).toBe(mockBillMainID); // no change
    expect(updatedMockBillMain.name).toBe('mock bill');
    expect(updatedMockBillMain.value).toBe(100);
    expect(updatedMockBillMain.unshared).toBe(0);
    expect(updatedMockBillMain.billOwner).toBe('main');
    expect(updatedMockBillMain.directlyOwed).toBeFalsy();

    // Testing a secondary bill --- --- ---

    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'secondary');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '0';

    const mockBillSecondaryID = sessionInfo.billsToPay[0].id;
    expect(billModal._updateBill(mockBillSecondaryID)).toBeUndefined();

    const updatedMockBillSecondary = sessionInfo.billsToPay[0];
    expect(updatedMockBillSecondary.id).toBe(mockBillSecondaryID);
    expect(updatedMockBillSecondary.name).toBe('mock bill');
    expect(updatedMockBillSecondary.value).toBe(200);
    expect(updatedMockBillSecondary.unshared).toBe(0);
    expect(updatedMockBillSecondary.billOwner).toBe('secondary');
    expect(updatedMockBillSecondary.directlyOwed).toBeTruthy();
  });

  it(`should, if all input values are valid, call hide() and messagePopup(), as well as dispatch two events: "updateSessionInfo" and "render"`, () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    billModal._directlyOwedCheckbox.classList.remove('checked');

    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '0';
    
    const hideSpy = jest.spyOn(billModal, 'hide');
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => {});

    const firstMockEVent = new Event('updateSessionInfo');
    const secondMockEvent = new Event('render');

    expect(billModal._updateBill(mockBillMain.id)).toBeUndefined();
    expect(hideSpy).toHaveBeenCalled();
    expect(messagePopup).toHaveBeenCalledWith('Bill updated', 'success');
    
    expect(dispatchEventSpy).toHaveBeenCalledWith(firstMockEVent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(secondMockEvent);
  });
});

describe('_validateBillName(input)', () => {
  let mockFormGroupDiv;
  let mockInputElement;

  beforeEach(() => {
    ErrorSpan.prototype.display.mockImplementation(() => {});
    ErrorSpan.prototype.hide.mockImplementation(() => {});
    
    mockFormGroupDiv = document.createElement('div');
    mockFormGroupDiv.className = 'form-group';

    mockInputElement = document.createElement('input');
    mockFormGroupDiv.appendChild(mockInputElement);
  });

  afterEach(() => {
    mockFormGroupDiv = null;
    mockInputElement = null;
  });
  
  it('should always return a boolean value', () => {
    expect(typeof billModal._validateBillName(mockInputElement)).toBe('boolean');

    mockInputElement.value = 'someValue';
    expect(typeof billModal._validateBillName(mockInputElement)).toBe('boolean');

    mockInputElement.value = '2500';
    expect(typeof billModal._validateBillName(mockInputElement)).toBe('boolean');
  });

  it('should check if the input value is longer than 50 characters, and return false if it is', () => {
    mockInputElement.value = 'Unbelievably long bill name for no reason whatsoever';
    expect(billModal._validateBillName(mockInputElement)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(mockFormGroupDiv, 'Bill name can not contain more than 50 characters.');
  });

  it('should test the input value against a specific regex. If the value is valid, true is returned and ErrorSpan.prototype.hide() is called with the input parent element', () => {
    // regex: /.*[a-zA-Z].*/ - ensuring at least 1 letter is passed anywhere within the string
    mockInputElement.value = 'mock bill'; // valid value
    expect(billModal._validateBillName(mockInputElement)).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(mockFormGroupDiv);
  });
  
  it('should test the input value against a specific regex. If the value is invalid, false is returned and ErrorSpan.prototype.display() is called with the input parent element and an error message', () => {
    // regex: /.*[a-zA-Z].*/ - ensuring at least 1 letter is passed anywhere within the string
    mockInputElement.value = '2500'; // invalid value
    expect(billModal._validateBillName(mockInputElement)).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(mockFormGroupDiv, 'Bill name must contain at least 1 letter.');
  });
});

describe('_isNumber(input)', () => {
  let mockFormGroupDiv;
  let mockInputElement;

  beforeEach(() => {
    ErrorSpan.prototype.display.mockImplementation(() => {});
    ErrorSpan.prototype.hide.mockImplementation(() => {});
    
    mockFormGroupDiv = document.createElement('div');
    mockFormGroupDiv.className = 'form-group';

    mockInputElement = document.createElement('input');
    mockFormGroupDiv.appendChild(mockInputElement);
  });

  afterEach(() => {
    mockFormGroupDiv = null;
    mockInputElement = null;
  });
  
  it('should always return a boolean value', () => {
    expect(typeof billModal._isNumber(mockInputElement)).toBe('boolean');

    mockInputElement.value = 'someValue';
    expect(typeof billModal._isNumber(mockInputElement)).toBe('boolean');

    mockInputElement.value = '2500';
    expect(typeof billModal._isNumber(mockInputElement)).toBe('boolean');
  });

  it('should test the input value against a specific regex. If the value is valid, true is returned and ErrorSpan.prototype.hide() is called with the input parent element', () => {
    // regex: /^\d+(\.\d+)?$/
    
    mockInputElement.value = '100'; // valid value
    expect(billModal._isNumber(mockInputElement)).toBeTruthy();
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(mockFormGroupDiv);
  });
  
  it('should test the input value against a specific regex. If the value is invalid, false is returned and ErrorSpan.prototype.display() is called with the input parent element and an error message', () => {
    // regex: /^\d+(\.\d+)?$/
    
    mockInputElement.value = 'some string'; // invalid value
    expect(billModal._isNumber(mockInputElement)).toBeFalsy();
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(mockFormGroupDiv, 'Please enter a valid number.');
  });
});

describe('_validValueAndUnshared()', () => {
  it('should always return a boolean', () => {
    expect(typeof billModal._validValueAndUnshared()).toBe('boolean');

    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '100';
    expect(typeof billModal._validValueAndUnshared()).toBe('boolean');
  });

  it('should always call ErrorSpan.prototype.hide() with the parent element of both _billValueInput and _billUnsharedInput at the beginning of the function', () => {
    billModal._validValueAndUnshared();
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(billModal._billValueInput.parentElement);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(billModal._billUnsharedInput.parentElement);
  });
  
  it('should return false and call Error.prototype.display() with the parent element of _billValueInput if its value is equal to or less than 0', () => {
    billModal._billValueInput.value = '0';
    expect(billModal._validValueAndUnshared()).toBeFalsy();
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(billModal._billValueInput.parentElement, 'Bill value can not be equal to or below 0.');

    billModal._billValueInput.value = '-100';
    expect(billModal._validValueAndUnshared()).toBeFalsy();
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(billModal._billValueInput.parentElement, 'Bill value can not be equal to or below 0.');
  });
  
  it('should return false and call Error.prototype.display() with the parent element of _billUnsharedInput if its value is less than 0', () => {
    billModal._billValueInput.value = '300'; // valid value
    billModal._billUnsharedInput.value = '-100';

    expect(billModal._validValueAndUnshared()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(billModal._billUnsharedInput.parentElement, 'Unshared value can not be a negative value.');
  });

  it('should return false and call Error.prototype.display() with the parent element of _billUnsharedInput if its value is greater than or equal to the bill value', () => {
    billModal._billValueInput.value = '300';
    billModal._billUnsharedInput.value = '500';

    expect(billModal._validValueAndUnshared()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(billModal._billUnsharedInput.parentElement, `Unshared value can not exceed or be equal to the bill's value.`);
  });

  it('should return true if both the bill value and unshared value are valid', () => {
    billModal._billValueInput.value = '500';
    billModal._billUnsharedInput.value = '100';

    expect(billModal._validValueAndUnshared()).toBe(true);
    expect(ErrorSpan.prototype.display).not.toHaveBeenCalled();
  });
});

describe('display(billOwner, editingBillID = false)', () => {
  it('should always return undefined', () => {
    expect(billModal.display()).toBeUndefined();
    expect(billModal.display(null)).toBeUndefined();
    expect(billModal.display(0)).toBeUndefined();
    expect(billModal.display('')).toBeUndefined();
    expect(billModal.display({})).toBeUndefined();
    expect(billModal.display([])).toBeUndefined();
    expect(billModal.display('some value')).toBeUndefined();
    expect(billModal.display(5)).toBeUndefined();
  });

  it(`should set the billOwnerName span element's textContent to "you" if billOwner argument is equal to "main"`, () => {
    const billOwnerNameSpan = document.querySelector('#billOwnerName');
    billModal.display('main');
    expect(billOwnerNameSpan.textContent).toBe('you');
  });

  it(`should set the billOwnerName span element's textContent to sessionInfo.sharedWith if billOwner argument is not equal to "main"`, () => {
    const billOwnerNameSpan = document.querySelector('#billOwnerName');
    sessionInfo.sharedWith = 'mock value';
    billModal.display('secondary');
    expect(billOwnerNameSpan.textContent).toBe('mock value');
  });
  
  it(`should add an attribute of "data-bill-owner" on _billModalForm, and set it to the value of billOwner argument `, () => {
    billModal.display('main');
    expect(billModal._billModalForm.getAttribute('data-bill-owner')).toBe('main');

    // resetting:
    document.body.innerHTML = '';
    document.body.innerHTML = billModalHTML;

    billModal.display('secondary');
    expect(billModal._billModalForm.getAttribute('data-bill-owner')).toBe('secondary');
  });
  
  it(`should set the _directlyOwedBySpan textContent to sessionInfo.sharedWith if the billOwner argument is equal to "main"`, () => {
    sessionInfo.sharedWith = 'mock value';
    billModal.display('main');
    expect(billModal._directlyOwedBySpan.textContent).toBe('mock value');
  });
  
  it(`should set the _directlyOwedBySpan textContent to "you" if the billOwner argument is not equal to "main"`, () => {
    billModal.display('secondary');
    expect(billModal._directlyOwedBySpan.textContent).toBe('you');
  });

  it(`should call _startEditMode() and _populate() if a truthy editingBillID is passed in. It should also add a "data-editing" attribute to _billModalForm, and set it to the editingBillID argument`, () => {
    const _startEditModeSpy = jest.spyOn(billModal, '_startEditMode').mockImplementationOnce(() => {});
    const _populateSpy = jest.spyOn(billModal, '_populate').mockImplementationOnce(() => {});
    
    billModal.display('main', 'mockBillID');
    expect(billModal._billModalForm.getAttribute('data-editing')).toBe('mockBillID');
    expect(_startEditModeSpy).toHaveBeenCalled();
    expect(_populateSpy).toHaveBeenCalledWith('main', 'mockBillID');
  });
  
  it('should focus _billNameInput if the editingBillID value is falsy', () => {
    const focusSpy = jest.spyOn(billModal._billNameInput, 'focus').mockImplementationOnce(() => {});
    billModal.display('main');
    expect(focusSpy).toHaveBeenCalled();
  });
});

describe('hide()', () => {
  it('should always return undefined', () => {
    expect(billModal.hide()).toBeUndefined();
    expect(billModal.hide(null)).toBeUndefined();
    expect(billModal.hide(0)).toBeUndefined();
    expect(billModal.hide('')).toBeUndefined();
    expect(billModal.hide({})).toBeUndefined();
    expect(billModal.hide([])).toBeUndefined();
    expect(billModal.hide('some value')).toBeUndefined();
    expect(billModal.hide(5)).toBeUndefined();
  });

  it(`should remove both the "data-bill-owner" and "data-editing" attributes from _billModalForm and call _clearForm(). After 200 milliseconds, it should also call _endEditMode()`, () => {
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    billModal._billModalForm.setAttribute('data-editing', 'true');

    const _clearFormSpy = jest.spyOn(billModal, '_clearForm').mockImplementationOnce(() => {});
    const _endEditModeSpy = jest.spyOn(billModal, '_endEditMode').mockImplementationOnce(() => {});

    jest.useFakeTimers();
    billModal.hide();
    expect(_clearFormSpy).toHaveBeenCalled();

    expect(billModal._billModalForm.getAttribute('data-bill-owner')).toBeNull();
    expect(billModal._billModalForm.getAttribute('data-editing')).toBeNull();

    jest.advanceTimersByTime(200);
    expect(_endEditModeSpy).toHaveBeenCalled();

    jest.now();
  });
});

describe('_clearForm()', () => {
  it('should always return undefined', () => {
    expect(billModal._clearForm()).toBeUndefined();
    expect(billModal._clearForm(null)).toBeUndefined();
    expect(billModal._clearForm(0)).toBeUndefined();
    expect(billModal._clearForm('')).toBeUndefined();
    expect(billModal._clearForm({})).toBeUndefined();
    expect(billModal._clearForm([])).toBeUndefined();
    expect(billModal._clearForm('some value')).toBeUndefined();
    expect(billModal._clearForm(5)).toBeUndefined();
  });
  
  it('should clear all inputs, by setting the bill name and value to an empty string, the unshared value to 0, unchecking the directlyOwed checkbox, and enabling the unsharedInput if it was otherwise disabled. It should also call ErrorSpan.prototype.hide() on the parent element of all 3 inputs', () => {
    billModal._billNameInput.value = 'mock value';
    billModal._billValueInput.value = '1000';
    billModal._billUnsharedInput.value = '200';
    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._disableUnsharedInput();

    const _enableUnsharedInputSpy = jest.spyOn(billModal, '_enableUnsharedInput');
    billModal.hide();

    expect(billModal._billNameInput.value).toBe('');
    expect(billModal._billValueInput.value).toBe('');
    expect(billModal._billUnsharedInput.value).toBe('0');
    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeFalsy();
    expect(_enableUnsharedInputSpy).toHaveBeenCalled();
  });
});

describe('_startEditMode()', () => {
  it('should always return undefined', () => {
    expect(billModal._startEditMode()).toBeUndefined();
    expect(billModal._startEditMode(null)).toBeUndefined();
    expect(billModal._startEditMode(0)).toBeUndefined();
    expect(billModal._startEditMode('')).toBeUndefined();
    expect(billModal._startEditMode({})).toBeUndefined();
    expect(billModal._startEditMode([])).toBeUndefined();
    expect(billModal._startEditMode('some value')).toBeUndefined();
    expect(billModal._startEditMode(5)).toBeUndefined();
  });

  it(`should set the textContent of _billSubmitBtn to "Update bill", and change the form title to "Editing a bill paid by " (space included)`, () => {
    billModal._startEditMode();
    expect(billModal._billSubmitBtn.textContent).toBe('Update bill');

    const billModalFormTitle = document.querySelector('.bill-modal-form .form-group-title p');
    expect(billModalFormTitle.textContent).toBe('Editing a bill paid by ');
  });
});

describe('_startEditMode()', () => {
  it('should always return undefined', () => {
    expect(billModal._endEditMode()).toBeUndefined();
    expect(billModal._endEditMode(null)).toBeUndefined();
    expect(billModal._endEditMode(0)).toBeUndefined();
    expect(billModal._endEditMode('')).toBeUndefined();
    expect(billModal._endEditMode({})).toBeUndefined();
    expect(billModal._endEditMode([])).toBeUndefined();
    expect(billModal._endEditMode('some value')).toBeUndefined();
    expect(billModal._endEditMode(5)).toBeUndefined();
  });

  it(`should set the textContent of _billSubmitBtn to "Add bill", and change the form title to "Adding a bill paid by " (space included)`, () => {
    billModal._billSubmitBtn.textContent = 'Update bill';
    
    billModal._endEditMode();
    expect(billModal._billSubmitBtn.textContent).toBe('Add bill');

    const billModalFormTitle = document.querySelector('.bill-modal-form .form-group-title p');
    expect(billModalFormTitle.textContent).toBe('Adding a bill paid by ');
  });
});

describe('_populate(billOwner, billID)', () => {
  let mockBillMain;
  let mockBillSecondary;

  beforeEach(() => {
    mockBillMain = {
      id: 'mockBillID',
      name: 'mock bill',
      value: 200,
      unshared: 50,
      splitValue: 75,
      directlyOwed: false,
      billOwner: 'main',
    };

    mockBillSecondary = {
      id: 'mockBillID',
      name: 'mock bill',
      value: 200,
      unshared: 50,
      splitValue: 75,
      directlyOwed: false,
      billOwner: 'secondary',
    };

    sessionInfo.billsPaid.push(mockBillMain);
    sessionInfo.billsToPay.push(mockBillSecondary);
  });

  afterEach(() => {
    mockBillMain = null;
    mockBillSecondary = null;
  });
  
  it(`should return undefined and stop the function if the billOwner argument is not equal to "main" or "secondary"`, () => {
    expect(billModal._populate()).toBeUndefined();
    expect(billModal._populate(null)).toBeUndefined();
    expect(billModal._populate(0)).toBeUndefined();
    expect(billModal._populate('')).toBeUndefined();
    expect(billModal._populate({})).toBeUndefined();
    expect(billModal._populate([])).toBeUndefined();
    expect(billModal._populate('some value')).toBeUndefined();
    expect(billModal._populate(5)).toBeUndefined();
  });

  it(`should fetch the correct bill based on its ID from sessionInfo.billsPaid if the billOwner argument is equal to "main", and populate all 3 inputs accordingly. It should also return undefined`, () => {
    const _disableUnsharedInputSpy = jest.spyOn(billModal, '_disableUnsharedInput');
    expect(billModal._populate('main', 'mockBillID')).toBeUndefined();

    expect(billModal._billNameInput.value).toBe('mock bill');
    expect(billModal._billValueInput.value).toBe('200');
    expect(billModal._billUnsharedInput.value).toBe('50');

    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeFalsy();
    expect(_disableUnsharedInputSpy).not.toHaveBeenCalled();
  });

  it(`should fetch the correct bill based on its ID from sessionInfo.billsToPay if the billOwner argument is equal to "secondary", and populate all 3 inputs accordingly. It should also return undefined`, () => {
    const _disableUnsharedInputSpy = jest.spyOn(billModal, '_disableUnsharedInput');
    expect(billModal._populate('secondary', 'mockBillID')).toBeUndefined();

    expect(billModal._billNameInput.value).toBe('mock bill');
    expect(billModal._billValueInput.value).toBe('200');
    expect(billModal._billUnsharedInput.value).toBe('50');

    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeFalsy();
    expect(_disableUnsharedInputSpy).not.toHaveBeenCalled();
  });

  it(`should, if directlyOwed for the bill in question is set to true, call _disableUnsharedInput() and add a "checked" class to _directlyOwedCheckBox`, () => {
    mockBillSecondary.directlyOwed = true;
    
    const _disableUnsharedInputSpy = jest.spyOn(billModal, '_disableUnsharedInput');
    expect(billModal._populate('secondary', 'mockBillID')).toBeUndefined();

    expect(billModal._billNameInput.value).toBe('mock bill');
    expect(billModal._billValueInput.value).toBe('200');

    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeTruthy();
    expect(_disableUnsharedInputSpy).toHaveBeenCalled();
  });
});

describe('_handleCheckBoxKeyEvents(e)', () => {
  it('should always return undefined if a valid even is passed in', () => {
    const mockEvent1 = { key: 'Enter' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: ' ' };

    jest.spyOn(billModal, '_displayCheckBox').mockImplementation(() => {});

    expect(billModal._handleCheckBoxKeyEvents(mockEvent1)).toBeUndefined();
    expect(billModal._handleCheckBoxKeyEvents(mockEvent2)).toBeUndefined();
    expect(billModal._handleCheckBoxKeyEvents(mockEvent3)).toBeUndefined();
  });
  
  it('should return undefined and not call _displayCheckBox() if the user clicks a key that is not Enter while the directlyOwed checkbox is outlined', () => {
    const _displayCheckBoxSpy = jest.spyOn(billModal, '_displayCheckBox');
    const mockEvent = { key: 'Shift' };

    expect(billModal._handleCheckBoxKeyEvents(mockEvent)).toBeUndefined();
    expect(_displayCheckBoxSpy).not.toHaveBeenCalled();
  });

  it('should return undefined and call _displayCheckBox() if the user clicks the Enter key while the directlyOwed checkbox is outlined', () => {
    const _displayCheckBoxSpy = jest.spyOn(billModal, '_displayCheckBox').mockImplementationOnce(() => {});
    const mockEvent = { key: 'Enter' };

    expect(billModal._handleCheckBoxKeyEvents(mockEvent)).toBeUndefined();
    expect(_displayCheckBoxSpy).toHaveBeenCalled();
  });
});

describe('_displayCheckBox()', () => {
  it('should always return undefined', () => {
    expect(billModal._displayCheckBox()).toBeUndefined();
    expect(billModal._displayCheckBox(null)).toBeUndefined();
    expect(billModal._displayCheckBox(0)).toBeUndefined();
    expect(billModal._displayCheckBox('')).toBeUndefined();
    expect(billModal._displayCheckBox({})).toBeUndefined();
    expect(billModal._displayCheckBox([])).toBeUndefined();
    expect(billModal._displayCheckBox('some value')).toBeUndefined();
    expect(billModal._displayCheckBox(5)).toBeUndefined();
  });

  it(`should, if the directlyOwed checkbox is checked, remove the "checked" class from it and call _enableUnsharedInput()`, () => {
    const _enableUnsharedInputSpy = jest.spyOn(billModal, '_enableUnsharedInput');
    billModal._directlyOwedCheckbox.classList.add('checked');

    billModal._displayCheckBox();
    expect(_enableUnsharedInputSpy).toHaveBeenCalled();
    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeFalsy();
  });
  
  it(`should, if the directlyOwed checkbox is not checked, add a "checked" class to it and call _disableUnsharedInput()`, () => {
    const _disableUnsharedInputSpy = jest.spyOn(billModal, '_disableUnsharedInput');
    billModal._directlyOwedCheckbox.classList.remove('checked');

    billModal._displayCheckBox();
    expect(_disableUnsharedInputSpy).toHaveBeenCalled();
    expect(billModal._directlyOwedCheckbox.classList.contains('checked')).toBeTruthy();
  });
});

describe('_directlyOwedCheckboxChecked()', () => {
  it('should always return a boolean', () => {
    expect(typeof billModal._directlyOwedCheckboxChecked()).toBe('boolean');

    billModal._directlyOwedCheckbox.classList.add('checked');
    expect(typeof billModal._directlyOwedCheckboxChecked()).toBe('boolean');

    billModal._directlyOwedCheckbox.classList.remove('checked');
    expect(typeof billModal._directlyOwedCheckboxChecked()).toBe('boolean');
  });
  
  it(`should return true if the directlyOwed checkbox contains a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.add('checked');
    expect(billModal._directlyOwedCheckboxChecked()).toBe(true);
  });
  
  it(`should return false if the directlyOwed checkbox does not contain a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.remove('checked');
    expect(billModal._directlyOwedCheckboxChecked()).toBe(false);
  });
});

describe('_disableUnsharedInput()', () => {
  it('should always return undefined', () => {
    expect(billModal._disableUnsharedInput()).toBeUndefined();
    expect(billModal._disableUnsharedInput(null)).toBeUndefined();
    expect(billModal._disableUnsharedInput(0)).toBeUndefined();
    expect(billModal._disableUnsharedInput('')).toBeUndefined();
    expect(billModal._disableUnsharedInput({})).toBeUndefined();
    expect(billModal._disableUnsharedInput([])).toBeUndefined();
    expect(billModal._disableUnsharedInput('some value')).toBeUndefined();
    expect(billModal._disableUnsharedInput(5)).toBeUndefined();
  });

  it(`should add a "disabled" attribute to the unshared input, set it to true, and also add a class of "disabled" to its form-group parent element`, () => {
    billModal._billUnsharedInput.removeAttribute('disabled');
    billModal._billUnsharedInput.parentElement.classList.remove('disabled');

    billModal._disableUnsharedInput();

    expect(billModal._billUnsharedInput.getAttribute('disabled')).toBe('true');
    expect(billModal._billUnsharedInput.parentElement.classList.contains('disabled')).toBeTruthy();
  });
});

describe('_enableUnsharedInput()', () => {
  it('should always return undefined', () => {
    expect(billModal._enableUnsharedInput()).toBeUndefined();
    expect(billModal._enableUnsharedInput(null)).toBeUndefined();
    expect(billModal._enableUnsharedInput(0)).toBeUndefined();
    expect(billModal._enableUnsharedInput('')).toBeUndefined();
    expect(billModal._enableUnsharedInput({})).toBeUndefined();
    expect(billModal._enableUnsharedInput([])).toBeUndefined();
    expect(billModal._enableUnsharedInput('some value')).toBeUndefined();
    expect(billModal._enableUnsharedInput(5)).toBeUndefined();
  });

  it(`should set the value of the unshared input to 0, add to it a "disabled" attribute and set it to true, and also add a class of "disabled" to its form-group parent element`, () => {
    billModal._billUnsharedInput.value = '0';
    billModal._billUnsharedInput.setAttribute('disabled', 'true');
    billModal._billUnsharedInput.parentElement.classList.add('disabled');

    billModal._enableUnsharedInput();

    expect(billModal._billUnsharedInput.value).toBe('0');
    expect(billModal._billUnsharedInput.getAttribute('disabled')).toBeNull();
    expect(billModal._billUnsharedInput.parentElement.classList.contains('disabled')).toBeFalsy();
  });
});