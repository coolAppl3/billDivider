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
          <p class="content-p">
            Adding a bill paid by <span id="billOwnerName"></span>
          </p>
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

  sessionInfo.yourTotal = 0;
  sessionInfo.sharedWithTotal = 0;
  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];
});

afterEach(() => {
  document.body.innerHTML = '';
  billModal = null;
  jest.resetAllMocks();
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

  it('should return undefined and stop the function if the bill value is less than 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '-1';

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() will run. It not running means the function stopped as expected.
  });
  
  it('should return undefined and stop the function if the bill value is equal to 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '0';

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() will run. It not running means the function stopped as expected.
  });

  it('should return undefined and stop the function if the unshared value is less than 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '-50';
    
    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() is called. It not being called means the function stopped as expected.
  });

  it('should return undefined and stop the function if the unshared value is greater than the bill value', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '200';

    expect(billModal._addNewBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() is called next. It not being called means the function stopped as expected.
  });
  
  it('should return undefined and stop the function if the bill name does not at least contain a single letter', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    _validValueAndUnsharedSpy.mockImplementation(() => { return true; });
    
    billModal._billNameInput.value = '200';
    expect(billModal._addNewBill()).toBeUndefined();
    
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);

    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // if the value is valid, _directlyOwedCheckboxCheckedSpy() is called next. It not being called means the function stopped as expected.
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
  let mockBill;

  beforeEach(() => {
    mockBill = {
      id: 'mockBillID',
      name: 'mock bill',
      value: 200,
      unshared: 50,
      splitValue: 75,
      directlyOwed: false,
      billOwner: 'main',
    };

    sessionInfo.billsPaid.push(mockBill);
  });

  afterEach(() => {
    mockBill = null;
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

  it('should return undefined and stop the function if the bill value is less than 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '-1';

    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() will run. It not running means the function stopped as expected.
  });
  
  it('should return undefined and stop the function if the bill value is equal to 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '0';

    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() will run. It not running means the function stopped as expected.
  });

  it('should return undefined and stop the function if the unshared value is less than 0', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '-50';
    
    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() is called. It not being called means the function stopped as expected.
  });

  it('should return undefined and stop the function if the unshared value is greater than the bill value', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    billModal._billValueInput.value = '100';
    billModal._billUnsharedInput.value = '200';

    expect(billModal._updateBill()).toBeUndefined();
    expect(_validateBillNameSpy).not.toHaveBeenCalled();
    // if the value is valid, _validateBillName() is called next. It not being called means the function stopped as expected.
  });
  
  it('should return undefined and stop the function if the bill name does not at least contain a single letter', () => {
    const _validateBillNameSpy = jest.spyOn(billModal, '_validateBillName');
    const _isNumberSpy = jest.spyOn(billModal, '_isNumber');
    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    const _validValueAndUnsharedSpy = jest.spyOn(billModal, '_validValueAndUnshared');
    _validValueAndUnsharedSpy.mockImplementation(() => { return true; });
    
    billModal._billNameInput.value = '200';
    expect(billModal._updateBill()).toBeUndefined();
    
    expect(_validateBillNameSpy).toHaveBeenCalledWith(billModal._billNameInput);
    expect(_isNumberSpy).toHaveBeenCalledTimes(2);

    expect(_directlyOwedCheckboxCheckedSpy).not.toHaveBeenCalled();
    // if the value is valid, _directlyOwedCheckboxCheckedSpy() is called next. It not being called means the function stopped as expected.
  });

  it(`should call _directlyOwedCheckboxChecked() if all input values are valid, and update the directlyOwed property to true if _directlyOwedCheckbox contains a class of "checked"`, () => {
    billModal._directlyOwedCheckbox.classList.add('checked');
    billModal._billModalForm.setAttribute('data-bill-owner', 'main');
    
    billModal._billNameInput.value = 'mock bill';
    billModal._billValueInput.value = '200';
    billModal._billUnsharedInput.value = '50';

    const _directlyOwedCheckboxCheckedSpy = jest.spyOn(billModal, '_directlyOwedCheckboxChecked');

    expect(billModal._updateBill(mockBill.id)).toBeUndefined();
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

    expect(billModal._updateBill(mockBill.id)).toBeUndefined();
    expect(_directlyOwedCheckboxCheckedSpy).toHaveBeenCalled();

    const directlyOwedValue = sessionInfo.billsPaid[0].directlyOwed;
    expect(directlyOwedValue).toBeFalsy();
  });

  // continue here
});