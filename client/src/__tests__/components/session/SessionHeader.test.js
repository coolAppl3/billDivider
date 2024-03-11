import SessionHeader from "../../../js/components/session/SessionHeader";

import sessionInfo from "../../../js/components/session/SessionInfo";
import SessionAPI from "../../../js/components/services/SessionAPI";
import ConfirmModal from "../../../js/components/global/ConfirmModal";
import addThousandComma from "../../../js/components/global/addThousandComma";
import messagePopup from "../../../js/components/global/messagePopup";
import locateLoginToken from "../../../js/components/global/locateLoginToken";
import SessionReference from "../../../js/components/session/SessionReference";
import LoadingModal from "../../../js/components/global/LoadingModal";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";


jest.mock('../../../js/components/session/SessionInfo');
jest.mock('../../../js/components/services/SessionAPI');
jest.mock('../../../js/components/global/ConfirmModal');
jest.mock('../../../js/components/global/addThousandComma');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/global/locateLoginToken');
jest.mock('../../../js/components/session/SessionReference');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');

const sessionHeaderHTML = `
  <section class="session section-p">
    <div class="container">
      <!-- Session Header -->
      <div class="session-header">
        <div class="session-header-container">
          <div class="session-header-container-item">
            <p class="session-header-container-item-title">Your total</p>
            <p class="session-header-container-item-value">
              <span id="yourTotal">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>

          <div class="session-header-container-item">
            <div id="updateSharedWith">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                />
              </svg>
            </div>
            <p class="session-header-container-item-title">
              <span
                id="sharedWith"
                class="sharedWithSpan"
              ></span
              >'s total
            </p>
            <p class="session-header-container-item-value">
              <span id="sharedWithTotal">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>

          <div class="session-header-container-item">
            <p
              class="session-header-container-item-title"
              id="debtResult"
            >
              You're owed
            </p>
            <p class="session-header-container-item-value">
              <span id="debtResultValue">0.00</span>
              <span class="currency">RSD</span>
            </p>
          </div>
        </div>

        <div class="session-header-controls">
          <div class="btn-div">
            <button
              class="btn btn-border-light disabled"
              id="resetSessionBtn"
              disabled
            >
              Reset
            </button>
          </div>
          <div class="btn-div">
            <button
              class="btn btn-light disabled"
              id="saveSessionBtn"
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- Session Content -->
      <div class="session-content">
        <!-- Person 1 (user) -->
        <div
          class="session-content-container"
          id="content-main"
        >
          <!-- Header -->
          <div
            class="session-content-container-header"
            data-list="main"
          >
            <h3 class="expandList">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="svg-icon chevron-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
              Your bills
            </h3>
            <button
              class="btn btn-border-danger clearListBtn disabled"
              disabled
            >
              Clear
            </button>
            <button class="btn btn-cta addBillBtn">Add a bill</button>
          </div>

          <div class="h-line"></div>

          <!-- List -->
          <div
            class="session-content-container-list list-main"
            data-list="main"
          ></div>
        </div>

        <!-- --- --- --- -->

        <!-- Person 2 (sharedWith) -->
        <div
          class="session-content-container"
          id="content-secondary"
        >
          <!-- Header -->
          <div
            class="session-content-container-header"
            data-list="secondary"
          >
            <h3 class="expandList">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="svg-icon chevron-icon"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
              <span
                id="sharedWithListHeader"
                class="sharedWithSpan"
              ></span
              >'s bills
            </h3>
            <button
              class="btn btn-border-danger clearListBtn disabled"
              disabled
            >
              Clear
            </button>
            <button class="btn btn-cta addBillBtn">Add a bill</button>
          </div>

          <div class="h-line"></div>

          <!-- List -->
          <div
            class="session-content-container-list list-secondary"
            data-list="secondary"
          ></div>
        </div>
      </div>
    </div>
  </section>
`;

let sessionHeader;

beforeEach(() => {
  document.body.innerHTML = sessionHeaderHTML;
  sessionHeader = new SessionHeader();
});

afterEach(() => {
  document.body.innerHTML = '';
  sessionHeader = null;
  jest.resetAllMocks();

  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];
  sessionInfo.yourTotal = 0;
  sessionInfo.sharedWithTotal = 0;

  sessionInfo.sharedWith = undefined;
  sessionInfo.currency = undefined;

  sessionInfo.createdOn = undefined;
  sessionInfo.sessionID = undefined;
});

describe('_render()', () => {
  it('should call a number of functions and return undefined', () => {
    const _updateTotalsSpy = jest.spyOn(sessionHeader, '_updateTotals').mockImplementationOnce(() => {});
    const _updateDebtResultSpy = jest.spyOn(sessionHeader, '_updateDebtResult').mockImplementationOnce(() => {});
    const _enableResetButtonSpy = jest.spyOn(sessionHeader, '_enableResetButton').mockImplementationOnce(() => {});
    const _handleSaveButtonStatusSpy = jest.spyOn(sessionHeader, '_handleSaveButtonStatus').mockImplementationOnce(() => {});
    
    expect(sessionHeader._render()).toBeUndefined();

    expect(_updateTotalsSpy).toHaveBeenCalled();
    expect(_updateDebtResultSpy).toHaveBeenCalled();
    expect(_enableResetButtonSpy).toHaveBeenCalled();
    expect(_handleSaveButtonStatusSpy).toHaveBeenCalled();
  });
});

describe('_handleSessionStartedEvents()', () => {
  it('should call a number of functions and return undefined', () => {
    const _setSharedWithSpy = jest.spyOn(sessionHeader, '_setSharedWith').mockImplementationOnce(() => {});
    const _setCurrencySpy = jest.spyOn(sessionHeader, '_setCurrency').mockImplementationOnce(() => {});
    const _handleSaveButtonStatusSpy = jest.spyOn(sessionHeader, '_handleSaveButtonStatus').mockImplementationOnce(() => {});

    expect(sessionHeader._handleSessionStartedEvents()).toBeUndefined();
    
    expect(_setSharedWithSpy).toHaveBeenCalled();
    expect(_setCurrencySpy).toHaveBeenCalled();
    expect(_handleSaveButtonStatusSpy).toHaveBeenCalled();
  });
});

describe('_updateTotals()', () => {
  it('should update the textContent of _yourTotal and _sharedWithTotal by calling addThousandComma() for sessionInfo.yourTotal and SessionInfo.sharedWithTotal', () => {
    sessionInfo.yourTotal = 100;
    sessionInfo.sharedWithTotal = 200;

    addThousandComma.mockImplementation((number) => {
      if(!number || Number.isNaN(+number)) {
        if(number === 0) return '0.00';
        return ;
      };
    
      return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    expect(sessionHeader._updateTotals()).toBeUndefined();
    expect(sessionHeader._yourTotal.textContent).toBe('100.00');
    expect(sessionHeader._sharedWithTotal.textContent).toBe('200.00');

    expect(addThousandComma).toHaveBeenCalledTimes(2);
    expect(addThousandComma).toHaveBeenCalledWith(100);
    expect(addThousandComma).toHaveBeenCalledWith(200);
  });
});

describe('_updateDebtResult()', () => {
  it('should always return undefined', () => {
    expect(sessionHeader._updateDebtResult()).toBeUndefined();
    expect(sessionHeader._updateDebtResult(null)).toBeUndefined();
    expect(sessionHeader._updateDebtResult(0)).toBeUndefined();
    expect(sessionHeader._updateDebtResult('')).toBeUndefined();
    expect(sessionHeader._updateDebtResult({})).toBeUndefined();
    expect(sessionHeader._updateDebtResult([])).toBeUndefined();
    expect(sessionHeader._updateDebtResult('some value')).toBeUndefined();
    expect(sessionHeader._updateDebtResult(5)).toBeUndefined();
  });

  it(`should subtract sessionInfo.sharedWithTotal from sessionInfo.yourTotal, and if the difference is negative: set the textContent of _debtResults to "You owe", and call addThousandComma(Math.abs(difference)) to set the textContent of _debtResultValue`, () => {
    sessionInfo.yourTotal = 100;
    sessionInfo.sharedWithTotal = 200;

    addThousandComma.mockImplementationOnce(() => { return '100.00'; });
    sessionHeader._updateDebtResult();

    expect(addThousandComma).toHaveBeenCalledWith(Math.abs(-100));
    expect(sessionHeader._debtResult.textContent).toBe('You owe');
    expect(sessionHeader._debtResultValue.textContent).toBe('100.00');
  });

  it(`should subtract sessionInfo.sharedWithTotal from sessionInfo.yourTotal, and if the difference is positive: set the textContent of _debtResults to "You're owed", and call addThousandComma(difference) to set the textContent of _debtResultValue`, () => {
    sessionInfo.yourTotal = 300;
    sessionInfo.sharedWithTotal = 200;

    addThousandComma.mockImplementationOnce(() => { return '100.00'; });
    sessionHeader._updateDebtResult();

    expect(addThousandComma).toHaveBeenCalledWith(100);
    expect(sessionHeader._debtResult.textContent).toBe(`You're owed`);
    expect(sessionHeader._debtResultValue.textContent).toBe('100.00');
  });
});

describe('_setSharedWith()', () => {
  it('should always return undefined', () => {
    expect(sessionHeader._setSharedWith()).toBeUndefined();
    expect(sessionHeader._setSharedWith(null)).toBeUndefined();
    expect(sessionHeader._setSharedWith(0)).toBeUndefined();
    expect(sessionHeader._setSharedWith('')).toBeUndefined();
    expect(sessionHeader._setSharedWith({})).toBeUndefined();
    expect(sessionHeader._setSharedWith([])).toBeUndefined();
    expect(sessionHeader._setSharedWith('some value')).toBeUndefined();
    expect(sessionHeader._setSharedWith(5)).toBeUndefined();
  });

  it(`should loop through all the elements with a class of "sharedWithSpan" and set their textContent to sessionInfo.sharedWith`, () => {
    const mockParentElement = document.createElement('div');
    mockParentElement.className = 'mockElement';
    document.body.appendChild(mockParentElement);
    
    for(let i = 0; i < 3; i++) {
      const mockSpan = document.createElement('span');
      mockSpan.className = 'sharedWithSpan';
      mockSpan.appendChild(document.createTextNode('mockValue'));
      mockParentElement.appendChild(mockSpan);
    };
    
    sessionInfo.sharedWith = 'newMockValue';
    sessionHeader._setSharedWith();

    expect(mockParentElement.firstElementChild.textContent).toBe('newMockValue');
    expect(mockParentElement.firstElementChild.nextElementSibling.textContent).toBe('newMockValue');
    expect(mockParentElement.lastElementChild.textContent).toBe('newMockValue');
  });
});

describe('_handleUnsharedWithBtnKeyEvents(e)', () => {
  it('should return undefined and not call _updateSharedWith() if the key pressed is not Enter', () => {
    const mockEvent = { key: 'G' };
    const _updateSharedWithSpy = jest.spyOn(sessionHeader, '_updateSharedWith');

    expect(sessionHeader._handleUnsharedWithBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_updateSharedWithSpy).not.toHaveBeenCalled();
  });
  
  it('should call _updateSharedWith() with the event object if Enter is pressed', () => {
    const mockEvent = { key: 'Enter' };
    const _updateSharedWithSpy = jest.spyOn(sessionHeader, '_updateSharedWith').mockImplementationOnce(() => {});

    expect(sessionHeader._handleUnsharedWithBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_updateSharedWithSpy).toHaveBeenCalled();
  });
});

describe('_updateSharedWith()', () => {
  it(`should dispatch a "editSharedWith" event then return undefined`, () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockEditSharedWithEvent = new Event('editSharedWith');
    
    expect(sessionHeader._updateSharedWith()).toBeUndefined();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockEditSharedWithEvent);
  });
});

describe('_setCurrency()', () => {
  it(`should set the textContent for all elements with the class of ".currency" to sessionInfo.currency, then return undefined`, () => {
    for(const span of sessionHeader._currencySpans) {
      span.textContent = 'mockCurrency';
    };

    sessionInfo.currency = 'RSD';
    expect(sessionHeader._setCurrency()).toBeUndefined();

    for(const span of sessionHeader._currencySpans) {
      expect(span.textContent).toBe('RSD');
    };
  });
  
});

describe('_handleSessionHeaderControlsClickEvents(e)', () => {
  it(`it should call _resetSession() if the click event targets an element inside the sessionHeaderControls that contains an ID of "resetSessionBtn"`, () => {
    const mockEvent = {
      target: {
        id: 'resetSessionBtn',
      },
    };

    const _resetSessionSpy = jest.spyOn(sessionHeader, '_resetSession').mockImplementationOnce(() => {});
    
    expect(sessionHeader._handleSessionHeaderControlsClickEvents(mockEvent)).toBeUndefined();
    expect(_resetSessionSpy).toHaveBeenCalled();
  });

  it(`it should call _saveSession() if the click event targets an element inside the sessionHeaderControls that contains an ID of "saveSessionBtn"`, () => {
    const mockEvent = {
      target: {
        id: 'saveSessionBtn',
      },
    };

    const _saveSessionSpy= jest.spyOn(sessionHeader, '_saveSession').mockImplementationOnce(() => {});
    
    expect(sessionHeader._handleSessionHeaderControlsClickEvents(mockEvent)).toBeUndefined();
    expect(_saveSessionSpy).toHaveBeenCalled();
  });
});

describe('_resetSession(', () => {
  let mockConfirmModalElement;

  beforeEach(() => {
    mockConfirmModalElement = document.createElement('div');
    mockConfirmModalElement.className = 'confirm-modal';
    document.body.appendChild(mockConfirmModalElement);
  });

  afterEach(() => {
    mockConfirmModalElement = null;
  });
  
  it('should always return undefined', () => {
    expect(sessionHeader._resetSession()).toBeUndefined();
    expect(sessionHeader._resetSession(null)).toBeUndefined();
    expect(sessionHeader._resetSession(0)).toBeUndefined();
    expect(sessionHeader._resetSession('')).toBeUndefined();
    expect(sessionHeader._resetSession({})).toBeUndefined();
    expect(sessionHeader._resetSession([])).toBeUndefined();
    expect(sessionHeader._resetSession('some value')).toBeUndefined();
    expect(sessionHeader._resetSession(5)).toBeUndefined();
  });

  it('should call ConfirmModal.prototype.display(), add an event listener to the confirmModalElement, then return undefined', () => {
    expect(sessionHeader._resetSession()).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to clear all the bills in this session?', 'danger');
  });
  
  it(`should, once an even listener has been added to the confirmModalElement, call ConfirmModal.prototype.remove() if the user makes an "exitClick"`, () => {
    ConfirmModal.prototype.isExitClick.mockImplementation(() => { return true; });
    const mockClickEvent = new MouseEvent('click');

    sessionHeader._resetSession();
    mockConfirmModalElement.dispatchEvent(mockClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockClickEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });

  it(`should, once an even listener has been added to the confirmModalElement, call a number of functions if the targeted element has an ID of "confirmModalConfirmBtn"`, () => {
    ConfirmModal.prototype.isExitClick.mockImplementation(() => { return false; });
    sessionInfo.reset.mockImplementationOnce(() => {});

    const mockClickEvent = new MouseEvent('click');
    Object.defineProperty(mockClickEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockRenderEvent = new Event('render');

    sessionHeader._resetSession();
    mockConfirmModalElement.dispatchEvent(mockClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockClickEvent);
    expect(sessionInfo.reset).toHaveBeenCalled();
    expect(messagePopup).toHaveBeenCalledWith('Session reset', 'success');
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });
});

describe('_saveSession()', () => {
  beforeEach(() => {
    delete window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        getItem: () => {},
      },
    });
  });

  it('should always call LoadingModal.display()', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return false; });
    SessionReference.referenceExists.mockImplementationOnce(() => { return false; });
    
    await sessionHeader._saveSession();
    expect(LoadingModal.display).toHaveBeenCalled();
  });
  
  
  it('should stop the function, redirect the user, and return undefined, if despite there being no unsaved changes, the function is forcefully called. If there is a session reference, the user should be redirected to history.html', async () => {
    const sessionStorageGetItemSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return null; });
    SessionReference.referenceExists.mockImplementationOnce(() => { return true; });
    
    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(sessionStorageGetItemSpy).toHaveBeenCalledWith('unsavedSessionChanges');
    expect(SessionReference.referenceExists).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html');
  });

  it('should stop the function, redirect the user, and return undefined, if despite there being no unsaved changes, the function is forcefully called. If there is no session reference, the user should be redirected to session.html', async () => {
    const sessionStorageGetItemSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return null; });
    SessionReference.referenceExists.mockImplementationOnce(() => { return false; });
    
    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(sessionStorageGetItemSpy).toHaveBeenCalledWith('unsavedSessionChanges');
    expect(SessionReference.referenceExists).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('session.html');
  });

  it('should stop the function, redirect the user to session.html, and return undefined, if there is no loginToken', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { return true; });
    locateLoginToken.mockImplementationOnce(() => { return false; });
    
    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('session.html');
  });
  
  it('should, if a session reference exists and changes have been made, call SessionAPI.prototype.updateSession() to update the session, then redirect the user to history.html with a successful message. It should also return undefined', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { return true; });
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });

    SessionReference.referenceExists.mockImplementationOnce(() => { return true; });
    SessionReference.changesMade.mockImplementationOnce(() => { return true; });
    
    SessionAPI.prototype.updateSession.mockResolvedValueOnce('mockResolvedValue');
    sessionInfo.sessionID = 'mockSessionID';

    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(SessionAPI.prototype.updateSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID', sessionInfo);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Session successfully updated', 'success');
  });
  
  it('should, if a session reference exists and changes have been made, call SessionAPI.prototype.updateSession() to update the session. If the API request fails, the error should be logged, the user should be redirect to history.html, and the function should return undefined', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { return true; });
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });

    SessionReference.referenceExists.mockImplementationOnce(() => { return true; });
    SessionReference.changesMade.mockImplementationOnce(() => { return true; });
    
    const mockError = { value: 'mockErrorValue' };
    const consoleSpy = jest.spyOn(window.console, 'log');

    SessionAPI.prototype.updateSession.mockRejectedValueOnce(mockError);
    sessionInfo.sessionID = 'mockSessionID';

    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(SessionAPI.prototype.updateSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID', sessionInfo);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html');
  });

  it('should, if the user is logged in but not editing a session, set sessionInfo.createdOn to Date.now(), call SessionAPI.addSession(), redirect the user to history.html, then return undefined', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { return true; });
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });

    SessionReference.referenceExists.mockImplementationOnce(() => { return false; }); // not editing a session

    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementationOnce(() => { return 'mockTimeStamp'; });
    SessionAPI.prototype.addSession.mockResolvedValueOnce('mockResolvedValue');

    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(dateNowSpy).toHaveBeenCalled();
    expect(SessionAPI.prototype.addSession).toHaveBeenCalledWith('mockLoginToken', sessionInfo);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('history.html', 1000, 'Session saved', 'success');
  });

  it('should, if the user is logged in but not editing a session, set sessionInfo.createdOn to Date.now(), and call SessionAPI.addSession(). If the API request fails, it should log the error, redirect the user to session.html, the return undefined', async () => {
    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation(() => { return true; });
    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });

    SessionReference.referenceExists.mockImplementationOnce(() => { return false; }); // not editing a session

    const mockError = { value: 'mockErrorValue' };
    const consoleSpy = jest.spyOn(window.console, 'log');
    
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementationOnce(() => { return 'mockTimeStamp'; });
    SessionAPI.prototype.addSession.mockRejectedValueOnce(mockError);

    expect(await sessionHeader._saveSession()).toBeUndefined();
    expect(dateNowSpy).toHaveBeenCalled();
    expect(SessionAPI.prototype.addSession).toHaveBeenCalledWith('mockLoginToken', sessionInfo);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('session.html');
  });
  
});

describe('_enableResetButton()', () => {
  it('should always return undefined', () => {
    expect(sessionHeader._enableResetButton()).toBeUndefined();
    expect(sessionHeader._enableResetButton(null)).toBeUndefined();
    expect(sessionHeader._enableResetButton(0)).toBeUndefined();
    expect(sessionHeader._enableResetButton('')).toBeUndefined();
    expect(sessionHeader._enableResetButton({})).toBeUndefined();
    expect(sessionHeader._enableResetButton([])).toBeUndefined();
    expect(sessionHeader._enableResetButton('some value')).toBeUndefined();
    expect(sessionHeader._enableResetButton(5)).toBeUndefined();
  });

  it(`should add a "disabled" attribute and class to _resetSessionBtn if the session contains no bills`, () => {
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];

    sessionHeader._resetSessionBtn.removeAttribute('disabled');
    sessionHeader._resetSessionBtn.classList.remove('disabled');

    sessionHeader._enableResetButton();

    expect(sessionHeader._resetSessionBtn.getAttribute('disabled')).toBe('');
    expect(sessionHeader._resetSessionBtn.classList.contains('disabled')).toBe(true);
  });
  
  it(`should remove the "disabled" attribute and class from _resetSessionBtn if the session contains one or more bills`, () => {
    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);

    sessionHeader._resetSessionBtn.setAttribute('disabled', '');
    sessionHeader._resetSessionBtn.classList.add('disabled');

    sessionHeader._enableResetButton();

    expect(sessionHeader._resetSessionBtn.getAttribute('disabled')).toBeNull();
    expect(sessionHeader._resetSessionBtn.classList.contains('disabled')).toBe(false);
  });
});

describe('_handleSaveButtonStatus()', () => {
  it(`should try to locate a loginToken, and if there isn't one, it should set an attribute of "title" with a value of "Available when logged in" to _saveSessionBtn, disabled the button, stop the function, and return undefined`, () => {
    locateLoginToken.mockImplementationOnce(() => { return false; });
    sessionHeader._saveSessionBtn.removeAttribute('title');

    const _enableSaveBtnSpy = jest.spyOn(sessionHeader, '_enableSaveBtn').mockImplementationOnce(() => {});
    const _disableSaveBtnSpy = jest.spyOn(sessionHeader, '_disableSaveBtn').mockImplementationOnce(() => {});

    expect(sessionHeader._handleSaveButtonStatus()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(_disableSaveBtnSpy).toHaveBeenCalled();

    expect(_enableSaveBtnSpy).not.toHaveBeenCalled();

    expect(sessionHeader._saveSessionBtn.getAttribute('title')).toBe('Available when logged in');
  });
  
  it('should, if a loginToken is located, check for a session reference, and if one exists, check if any changes have been made. If changes have been made, the button should be enabled, the function should stop, and undefined should be returned', () => {
    SessionReference.referenceExists.mockImplementationOnce(() => { return true; });
    SessionReference.changesMade.mockImplementationOnce(() => { return true; });

    locateLoginToken.mockImplementationOnce(() => { return true; });

    const _enableSaveBtnSpy = jest.spyOn(sessionHeader, '_enableSaveBtn').mockImplementationOnce(() => {});
    const _disableSaveBtnSpy = jest.spyOn(sessionHeader, '_disableSaveBtn').mockImplementationOnce(() => {});

    expect(sessionHeader._handleSaveButtonStatus()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(_enableSaveBtnSpy).toHaveBeenCalled();

    expect(_disableSaveBtnSpy).not.toHaveBeenCalled();
  });

  it('should, if a loginToken is located, check for a session reference, and if one exists, check if any changes have been made. If no changes have been made, the button should be disabled, the function should stop, and undefined should be returned', () => {
    SessionReference.referenceExists.mockImplementationOnce(() => { return true; });
    SessionReference.changesMade.mockImplementationOnce(() => { return false; });

    locateLoginToken.mockImplementationOnce(() => { return true; });

    const _enableSaveBtnSpy = jest.spyOn(sessionHeader, '_enableSaveBtn').mockImplementationOnce(() => {});
    const _disableSaveBtnSpy = jest.spyOn(sessionHeader, '_disableSaveBtn').mockImplementationOnce(() => {});

    expect(sessionHeader._handleSaveButtonStatus()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(_disableSaveBtnSpy).toHaveBeenCalled();
    
    expect(_enableSaveBtnSpy).not.toHaveBeenCalled();
  });
});

describe('_enableSaveBtn()', () => {
  it(`should set "unsavedSessionChanges" in sessionStorage to true, remove the "disabled" attribute and class from _saveSessionBtn, then return undefined`, () => {
    delete window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        setItem: () => {},
      },
    });
    
    sessionStorageSpy = jest.spyOn(window.sessionStorage, 'setItem').mockImplementationOnce(() => {});
    
    sessionHeader._saveSessionBtn.setAttribute('disabled', '');
    sessionHeader._saveSessionBtn.classList.add('disabled');
    
    expect(sessionHeader._enableSaveBtn()).toBeUndefined();
    expect(sessionStorageSpy).toHaveBeenCalledWith('unsavedSessionChanges', true);
    
    expect(sessionHeader._saveSessionBtn.getAttribute('disabled')).toBeNull();
    expect(sessionHeader._saveSessionBtn.classList.contains('disabled')).toBe(false);
  });
});

describe('_disableSaveBtn()', () => {
  it(`should set "unsavedSessionChanges" in sessionStorage to false, add a "disabled" attribute and class to _saveSessionBtn, then return undefined`, () => {
    delete window.sessionStorage;
    Object.defineProperty(window, 'sessionStorage', {
      writable: true,
      value: {
        setItem: () => {},
      },
    });

    sessionStorageSpy = jest.spyOn(window.sessionStorage, 'setItem').mockImplementationOnce(() => {});
    
    sessionHeader._saveSessionBtn.remove('disabled');
    sessionHeader._saveSessionBtn.classList.remove('disabled');
    
    expect(sessionHeader._disableSaveBtn()).toBeUndefined();
    expect(sessionStorageSpy).toHaveBeenCalledWith('unsavedSessionChanges', false);
    
    expect(sessionHeader._saveSessionBtn.getAttribute('disabled')).toBe('true');
    expect(sessionHeader._saveSessionBtn.classList.contains('disabled')).toBe(true);
  });
});