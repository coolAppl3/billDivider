import InitSession from "../../../js/components/session/InitSession";

import SessionAPI from "../../../js/components/services/SessionAPI";
import sessionInfo from "../../../js/components/session/SessionInfo";
import Cookies from "../../../js/components/global/Cookies";
import ErrorSpan from "../../../js/components/global/ErrorSpan";
import LoadingModal from "../../../js/components/global/LoadingModal";
import locateLoginToken from "../../../js/components/global/locateLoginToken";
import SessionReference from "../../../js/components/session/SessionReference";
import redirectAfterDelayMillisecond from "../../../js/components/global/redirectAfterDelayMillisecond";

jest.mock('../../../js/components/services/SessionAPI');
jest.mock('../../../js/components/session/SessionInfo');
jest.mock('../../../js/components/global/Cookies');
jest.mock('../../../js/components/global/ErrorSpan');
jest.mock('../../../js/components/global/LoadingModal');
jest.mock('../../../js/components/global/locateLoginToken');
jest.mock('../../../js/components/session/SessionReference');
jest.mock('../../../js/components/global/redirectAfterDelayMillisecond');

const startModalHTML = `
  <div class="start-modal">
    <div class="container">
      <form class="start-modal-form">
        <div class="form-group">
          <label for="sharingWith">Sharing bills with</label>
          <input
            type="text"
            id="sharingWith"
            autocomplete="off"
            autofocus
          />
          <span class="error-span"></span>
        </div>

        <div class="form-group">
          <p for="currency">Currency</p>
          <div class="options-container">
            <div
              class="options-container-item selected"
              data-currency="RSD"
              tabindex="0"
            >
              RSD
            </div>
            <div
              class="options-container-item"
              data-currency="EUR"
              tabindex="0"
            >
              EUR
            </div>
            <div
              class="options-container-item"
              data-currency="USD"
              tabindex="0"
            >
              USD
            </div>
          </div>
          <span class="error-span"></span>
        </div>

        <div class="form-group btn-div">
          <button
            type="submit"
            class="btn btn-cta"
            id="startModalStartBtn"
          >
            Start session
          </button>
        </div>

        <div class="form-group btn-div">
          <p
            class="btn btn-border-light hidden"
            tabindex="0"
            id="startModalCancelBtn"
          >
            Cancel
          </p>
        </div>
      </form>
    </div>
  </div>
`;

let initSession;

beforeEach(() => {
  document.body.innerHTML = startModalHTML;
  initSession = new InitSession();
});

afterEach(() => {
  document.body.innerHTML = '';
  initSession = null;
  jest.resetAllMocks();
});

describe('_checkUrlForSessionID()', () => {
  beforeEach(() => {
    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?mockSessionID',
        href: 'session.html',
      },
    });
  });

  afterEach(() => {
    delete window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '',
        href: 'session.html',
      },
    });
  });
  
  it(`should call LoadingModal.display(), grab the URL's query string, and check for a sessionID. If there isn't any, it should call LoadingModal.remove(), return undefined, and stop the function`, async () => {
    window.location.search = '';
    
    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(LoadingModal.display).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();

    // locateLoginToken() runs if a sessionID is available in the URL. It not being called confirms that the function stopped. 
    expect(locateLoginToken).not.toHaveBeenCalled();
  });

  it(`should call locateLoginToken() if a sessionID is found in the URL. If there's no loginToken, redirectAFterDelayMilliseconds() is called and undefined is returned to stop the function`, async () => {
    locateLoginToken.mockImplementationOnce(() => { return false; });
    
    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(locateLoginToken).toHaveBeenCalled();
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('session.html', 1000, 'Session not found');

    // sessionAPI.getSession runs if a valid loginToken is found. It not being called confirms that the function stopped. 
    expect(SessionAPI.prototype.getSession).not.toHaveBeenCalled();
  });

  it('should, assuming both a sessionID and a loginToken are located, call SessionAPI.prototype.getSession(loginToken, sessionID). If the API request is successful, it will call sessionInfo.set() to populate it with the data received, call a number of other functions, and return undefined', async () => {
    const mockSuccessfulResponse = {
      data: {
        success: true,
        data: {
          mockProperty: 'mockValue',
        },
      },
    };
    SessionAPI.prototype.getSession.mockResolvedValueOnce(mockSuccessfulResponse);

    locateLoginToken.mockImplementationOnce(() => { return 'mockLoginToken'; });

    sessionInfo.set.mockImplementationOnce(() => {});
    SessionReference.set.mockImplementationOnce(() => {});

    const _collapseStartModalSpy = jest.spyOn(initSession, '_collapseStartModal').mockImplementationOnce(() => {});
    const _displayMainSessionElementSpy = jest.spyOn(initSession, '_displayMainSessionElement').mockImplementationOnce(() => {});

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => {});
    const sessionStartedEvent = new Event('sessionStarted');
    const renderEvent = new Event('render');

    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(SessionAPI.prototype.getSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID');

    expect(sessionInfo.set).toHaveBeenCalledWith(mockSuccessfulResponse.data.data);
    expect(SessionReference.set).toHaveBeenCalledWith(mockSuccessfulResponse.data.data);

    expect(_collapseStartModalSpy).toHaveBeenCalled();
    expect(_displayMainSessionElementSpy).toHaveBeenCalled();
    expect(LoadingModal.remove).toHaveBeenCalled();

    expect(dispatchEventSpy).toHaveBeenCalledWith(sessionStartedEvent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(renderEvent);
  });

  it('should catch any errors with the API request, and if the error object does not have a response property, call Cookies.prototype.remove() and redirectAfterDelayMilliseconds(), then return undefined', async () => {
    locateLoginToken.mockImplementation(() => { return 'mockLoginToken' });
    
    const mockError = new Error('mock error'); // no response property
    SessionAPI.prototype.getSession.mockRejectedValueOnce(mockError);
    

    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(SessionAPI.prototype.getSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID');


    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html');
  });

  it(`should catch any errors with the API request, console log it, and if the error's status code is 403, call Cookies.prototype.remove() and redirectAfterDelayMilliseconds('signIn.html', 1000, 'Not logged in'), then return undefined`, async () => {
    locateLoginToken.mockImplementation(() => { return 'mockLoginToken' });
    
    const mockError = new Error('mock error');
    Object.defineProperty(mockError, 'response', {
      writable: true,
      value: {
        data: { mockProperty: 'mockValue' },
      },
    });
    
    mockError.response = {
      status: 403,
    };
    SessionAPI.prototype.getSession.mockRejectedValueOnce(mockError);
    
    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(SessionAPI.prototype.getSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID');

    expect(consoleSpy).toHaveBeenCalledWith(mockError.response.data);

    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html', 1000, 'Not logged in');
  });

  it(`should catch any errors with the API request, console log it, and if the error's status code is 404, not call Cookies.prototype.remove(), call redirectAfterDelayMilliseconds('session.html', 1000, 'Session not found'), then return undefined`, async () => {
    locateLoginToken.mockImplementation(() => { return 'mockLoginToken' });
    
    const mockError = new Error('mock error');
    Object.defineProperty(mockError, 'response', {
      writable: true,
      value: {
        data: { mockProperty: 'mockValue' },
      },
    });
    
    mockError.response = {
      status: 404,
    };
    SessionAPI.prototype.getSession.mockRejectedValueOnce(mockError);
    
    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(SessionAPI.prototype.getSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID');

    expect(consoleSpy).toHaveBeenCalledWith(mockError.response.data);

    expect(Cookies.prototype.remove).not.toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('session.html', 1000, 'Session not found');
  });


  it(`should catch any errors with the API request, console log it, and if the error's status code is not 403 or 404 (most likely 500), call Cookies.prototype.remove() and redirectAfterDelayMilliseconds('signIn.html', 1000, 'Something went wrong'), then return undefined`, async () => {
    locateLoginToken.mockImplementation(() => { return 'mockLoginToken' });
    
    const mockError = new Error('mock error');
    Object.defineProperty(mockError, 'response', {
      writable: true,
      value: {
        data: { mockProperty: 'mockValue' },
      },
    });
    
    mockError.response = {
      status: 500,
    };
    SessionAPI.prototype.getSession.mockRejectedValueOnce(mockError);
    
    const consoleSpy = jest.spyOn(window.console, 'log');

    expect(await initSession._checkUrlForSessionID()).toBeUndefined();
    expect(SessionAPI.prototype.getSession).toHaveBeenCalledWith('mockLoginToken', 'mockSessionID');

    expect(consoleSpy).toHaveBeenCalledWith(mockError.response.data);

    expect(Cookies.prototype.remove).toHaveBeenCalledWith('loginToken');
    expect(redirectAfterDelayMillisecond).toHaveBeenCalledWith('signIn.html', 1000, 'Something went wrong');
  });
});

describe('_start(e)', () => {
  let mockEvent;
  let _displayMainSessionElement;

  beforeEach(() => {
    mockEvent = { preventDefault: () => {} };
    _displayMainSessionElement = jest.spyOn(initSession, '_displayMainSessionElement').mockImplementation(() => {});
  });

  afterEach(() => {
    mockEvent = null;
    _displayMainSessionElement = null;
  });
  
  it('should always return undefined', () => {
    
    expect(initSession._start(mockEvent)).toBeUndefined();
    
    initSession._sharedWithInput.value = 'some value';
    expect(initSession._start(mockEvent)).toBeUndefined();
    
    initSession._sharedWithInput.value = '2500';
    expect(initSession._start(mockEvent)).toBeUndefined();
  });
  
  it('should call _validateSharedWithInput() and stop the function if the sharedWithInput value is invalid', () => {
    const _validateSharedWithInputSpy = jest.spyOn(initSession, '_validateSharedWithInput').mockImplementationOnce(() => { return false; });
    const _getSelectedCurrencySpy = jest.spyOn(initSession, '_getSelectedCurrency');
    
    expect(initSession._start(mockEvent)).toBeUndefined();
    expect(_validateSharedWithInputSpy).toHaveBeenCalled();

    // _getSelectedCurrency() would be called next. It not being called, confirms that the function stopped
    expect(_getSelectedCurrencySpy).not.toHaveBeenCalled();
  });

  it(`should, if a valid sharedWithInput value is provided, call a number of functions and dispatch a "sessionStarted" event, then return undefined`, () => {
    const _validateSharedWithInputSpy = jest.spyOn(initSession, '_validateSharedWithInput').mockImplementationOnce(() => { return true; });
    const _getSelectedCurrencySpy = jest.spyOn(initSession, '_getSelectedCurrency');
    const _collapseStartModalSpy = jest.spyOn(initSession, '_collapseStartModal');

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const sessionStartedEvent = new Event('sessionStarted');

    expect(initSession._start(mockEvent)).toBeUndefined();
    expect(_validateSharedWithInputSpy).toHaveBeenCalled();
    expect(_getSelectedCurrencySpy).toHaveBeenCalled();
    expect(_collapseStartModalSpy).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(sessionStartedEvent);
  });
});

describe('_validateSharedWithInput()', () => {
  it('should call ErrorSpan.prototype.display() with the parent element of the sharedWithInput, if its value is an empty string, then return false', () => {
    initSession._sharedWithInput.value = '';
    const parentFormGroup = initSession._sharedWithInput.parentElement;

    expect(initSession._validateSharedWithInput()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(parentFormGroup, 'This field is required.');
  });

  it('should call ErrorSpan.prototype.display() with the parent element of the sharedWithInput, if its value does not pass the regex noted below, then return false', () => {
    // regex: /^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/ - must contain at least 1 letter, and must not contain any special characters

    initSession._sharedWithInput.value = 'invalid_value'; // contains special characters
    const parentFormGroup = initSession._sharedWithInput.parentElement;

    expect(initSession._validateSharedWithInput()).toBe(false);
    expect(ErrorSpan.prototype.display).toHaveBeenCalledWith(parentFormGroup, 'This field must contain at least 1 letter, and must not contain special characters.');
  });
  
  it('should call ErrorSpan.prototype.hide() with the parent element of the sharedWithInput, if its value passes the regex noted below, then return true', () => {
    // regex: /^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/ - must contain at least 1 letter, and must not contain any special characters
    
    initSession._sharedWithInput.value = 'validSharedWithValue'; // contains special characters
    const parentFormGroup = initSession._sharedWithInput.parentElement;

    expect(initSession._validateSharedWithInput()).toBe(true);
    expect(ErrorSpan.prototype.hide).toHaveBeenCalledWith(parentFormGroup);
  });
});

describe('_editSharedWith()', () => {
  it('should always return undefined', () => {
    jest.spyOn(initSession, '_displayStartModal').mockImplementation(() => {});
    
    expect(initSession._editSharedWith()).toBeUndefined();
    expect(initSession._editSharedWith(null)).toBeUndefined();
    expect(initSession._editSharedWith(0)).toBeUndefined();
    expect(initSession._editSharedWith('')).toBeUndefined();
    expect(initSession._editSharedWith({})).toBeUndefined();
    expect(initSession._editSharedWith([])).toBeUndefined();
    expect(initSession._editSharedWith('some value')).toBeUndefined();
    expect(initSession._editSharedWith(5)).toBeUndefined();
  });

  it(`should call _displayStartModal() and set the textContent for _startModalStartBtn to "Update"`, () => {
    initSession._startModalStartBtn.textContent = 'Start session'; // this is the default value
    const _displayStartModalSpy = jest.spyOn(initSession, '_displayStartModal').mockImplementationOnce(() => {});

    initSession._editSharedWith();
    expect(_displayStartModalSpy).toHaveBeenCalled();
    expect(initSession._startModalStartBtn.textContent).toBe('Update');
  });
});

describe('_handleOptionsContainerKeyEvents(e)', () => {
  it('should return undefined and not call _changeCurrency() if the key pressed is not Enter', () => {
    const mockEvent = { key: 'G' };
    const _changeCurrencySpy = jest.spyOn(initSession, '_changeCurrency');

    expect(initSession._handleOptionsContainerKeyEvents(mockEvent)).toBeUndefined();
    expect(_changeCurrencySpy).not.toHaveBeenCalled();
  });
  
  it('should call _changeCurrency() with the event object if Enter is pressed', () => {
    const mockEvent = { key: 'Enter' };
    const _changeCurrencySpy = jest.spyOn(initSession, '_changeCurrency').mockImplementationOnce(() => {});

    expect(initSession._handleOptionsContainerKeyEvents(mockEvent)).toBeUndefined();
    expect(_changeCurrencySpy).toHaveBeenCalledWith(mockEvent);
  });
});


describe('_changeCurrency(e)', () => {
  it('should always return undefined', () => {
    
    const mockEvent1 = {
      target: {
        classList: {
          contains: () => { return true; },
          add: () => {},
        },
      },
    };

    const mockEvent2 = {
      target: {
        classList: {
          contains: () => { return false; },
          add: () => {},
        },
      },
    };

    expect(initSession._changeCurrency(mockEvent1)).toBeUndefined();
    expect(initSession._changeCurrency(mockEvent2)).toBeUndefined();
  });
  
  it(`should return undefined and stop the function if the clicked element already has a class of "selected"`, () => {
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return true; },
          add: () => {},
        },
      },
    };
    const classListAddSpy = jest.spyOn(mockEvent.target.classList, 'add');

    initSession._changeCurrency(mockEvent);
    expect(classListAddSpy).not.toHaveBeenCalled();
  });

  it(`should remove the "selected" class from all currency option elements, and if the clicked element did not initially contain a "selected" class, add it to its classList`, () => {
    const mockEvent = {
      target: {
        classList: {
          contains: (className) => {
            if(className === 'options-container-item') {
              return true;
            };
            return false;
          },
          add: () => {},
        },
      },
    };
    const classListAddSpy = jest.spyOn(mockEvent.target.classList, 'add');

    initSession._changeCurrency(mockEvent);
    expect(classListAddSpy).toHaveBeenCalledWith('selected');
  });
  
});

describe('_getSelectedCurrency()', () => {
  it(`should loop over the elements of _optionsContainerItems, find the element with a "selected" class, then return the value of its "data-currency" attribute`, () => {
    // removing the "selected" class from all the items before testing
    for(const item of initSession._optionsContainerItems) {
      item.classList.remove('selected');
    };
    
    initSession._optionsContainer.firstElementChild.classList.add('selected'); // RSD
    expect(initSession._getSelectedCurrency()).toBe('RSD');

    // removing the "selected" class from all the items before testing
    for(const item of initSession._optionsContainerItems) {
      item.classList.remove('selected');
    };

    initSession._optionsContainer.firstElementChild.nextElementSibling.classList.add('selected'); // EUR
    expect(initSession._getSelectedCurrency()).toBe('EUR');

    // removing the "selected" class from all the items before testing
    for(const item of initSession._optionsContainerItems) {
      item.classList.remove('selected');
    };

    initSession._optionsContainer.lastElementChild.classList.add('selected'); // USD
    expect(initSession._getSelectedCurrency()).toBe('USD');
  });
});

describe('_displayStartModal()', () => {
  let _hideMainSessionElementSpy;

  beforeEach(() => {
    _hideMainSessionElementSpy = jest.spyOn(initSession, '_hideMainSessionElement').mockImplementation(() => {});
  });
  
  afterEach(() => {
    _hideMainSessionElementSpy = null;
  });

  it('should always return undefined', () => {
    expect(initSession._displayStartModal()).toBeUndefined();
    expect(initSession._displayStartModal(null)).toBeUndefined();
    expect(initSession._displayStartModal(0)).toBeUndefined();
    expect(initSession._displayStartModal('')).toBeUndefined();
    expect(initSession._displayStartModal({})).toBeUndefined();
    expect(initSession._displayStartModal([])).toBeUndefined();
    expect(initSession._displayStartModal('some value')).toBeUndefined();
    expect(initSession._displayStartModal(5)).toBeUndefined();
  });
  
  it('should set the value of _sharedWithInput to sessionInfo.sharedWith, if it has been defined (user is editing the sharedWith value). Ot should also call _hideMainSessionElement()', () => {
    sessionInfo.sharedWith = 'mock value';
    initSession._displayStartModal();

    expect(initSession._sharedWithInput.value).toBe('mock value');
    expect(_hideMainSessionElementSpy).toHaveBeenCalled();
  });
});

describe('_collapseStartModal()', () => {
  it('should always return undefined', () => {
    expect(initSession._collapseStartModal()).toBeUndefined();
    expect(initSession._collapseStartModal(null)).toBeUndefined();
    expect(initSession._collapseStartModal(0)).toBeUndefined();
    expect(initSession._collapseStartModal('')).toBeUndefined();
    expect(initSession._collapseStartModal({})).toBeUndefined();
    expect(initSession._collapseStartModal([])).toBeUndefined();
    expect(initSession._collapseStartModal('some value')).toBeUndefined();
    expect(initSession._collapseStartModal(5)).toBeUndefined();
  });

  it(`should hide the start modal (verified in UI testing) and change the textContent of _startModalStartBtn to "Start session"`, () => {
    initSession._startModalStartBtn.textContent = 'mock value';
    
    jest.useFakeTimers();
    initSession._collapseStartModal();

    jest.advanceTimersByTime(210)
    expect(initSession._startModalStartBtn.textContent).toBe('Start session');
    
    jest.now();
  });
});

describe('_handleStartModalCancelBtnKeyEvents(e)', () => {
  it('should not call _cancelStartModal(), if the pressed key is not Enter, then return undefined', () => {
    const _cancelStartModalSpy = jest.spyOn(initSession, '_cancelStartModal').mockImplementationOnce(() => {});
    const mockEvent = { key: 'G' };

    expect(initSession._handleStartModalCancelBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_cancelStartModalSpy).not.toHaveBeenCalled();
  });
  
  it('should call _cancelStartModal(), if the pressed key is Enter, then return undefined', () => {
    const _cancelStartModalSpy = jest.spyOn(initSession, '_cancelStartModal').mockImplementationOnce(() => {});
    const mockEvent = { key: 'Enter' };

    expect(initSession._handleStartModalCancelBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_cancelStartModalSpy).toHaveBeenCalled();
  });
});

describe('_cancelStartModal()', () => {
  it('should call a number of functions and return undefined', () => {
    const _collapseStartModalSpy = jest.spyOn(initSession, '_collapseStartModal').mockImplementationOnce(() => {});
    const _displayMainSessionElementSpy = jest.spyOn(initSession, '_displayMainSessionElement').mockImplementationOnce(() => {});
    const _reselectCurrentCurrencySpy = jest.spyOn(initSession, '_reselectCurrentCurrency').mockImplementationOnce(() => {});

    expect(initSession._cancelStartModal()).toBeUndefined();

    expect(_collapseStartModalSpy).toHaveBeenCalled();
    expect(_displayMainSessionElementSpy).toHaveBeenCalled();
    expect(_reselectCurrentCurrencySpy).toHaveBeenCalled();
  });
});
