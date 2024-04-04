import DisplayTerms from "../../../js/components/global/DisplayTerms";

let displayTerms;

beforeEach(() => {
  displayTerms = new DisplayTerms();
});

afterEach(() => {
  displayTerms = null;
  document.body.innerHTML = '';
  jest.resetAllMocks();
});

describe('_checkIfAccepted()', () => {
  afterEach(() => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {},
    });
  });
  
  it(`should fetch a "hasAcceptedTerms" item from local storage, and if there isn't one, call _displayTermsPopup() and return undefined`, () => {
    const _displayTermsPopupSpy = jest.spyOn(displayTerms, '_displayTermsPopup').mockImplementationOnce(() => {});

    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: () => { return null; },
      },
    });
    
    expect(displayTerms._checkIfAccepted()).toBeUndefined();
    expect(_displayTermsPopupSpy).toHaveBeenCalled();
  });
  
  it(`should fetch a "hasAcceptedTerms" item from local storage, and if one exists with a truthy value, not call _displayTermsPopup() and return undefined`, () => {
    const _displayTermsPopupSpy = jest.spyOn(displayTerms, '_displayTermsPopup').mockImplementationOnce(() => {});

    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: () => { return 'true'; },
      },
    });
    
    expect(displayTerms._checkIfAccepted()).toBeUndefined();
    expect(_displayTermsPopupSpy).not.toHaveBeenCalled();
  });
});

describe('_displayTermsPopup()', () => {
  it('should call _createTermsPopup() and append the termsPopupElement to the body', () => {
    const _createTermsPopupSpy = jest.spyOn(displayTerms, '_createTermsPopup');

    expect(document.querySelector('.termsPopup')).toBeNull();
    expect(displayTerms._displayTermsPopup()).toBeUndefined();
    expect(_createTermsPopupSpy).toHaveBeenCalled();
    expect(document.querySelector('.termsPopup')).not.toBeNull();
  });
});

describe('_handleConfirmTermsBtnKeyEvents(e)', () => {
  it('should call _confirmTerms(e) if the pressed key is Enter, then return undefined', () => {
    const _confirmTermsSpy = jest.spyOn(displayTerms, '_confirmTerms').mockImplementationOnce(() => {});
    const mockEvent = { key: 'Enter' };

    expect(displayTerms._handleConfirmTermsBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_confirmTermsSpy).toHaveBeenCalledWith(mockEvent);
  });
  
  it('should not call _confirmTerms(e) if the pressed key is not Enter, but it should still return undefined', () => {
    const _confirmTermsSpy = jest.spyOn(displayTerms, '_confirmTerms').mockImplementationOnce(() => {});
    const mockEvent = { key: 'G' };

    expect(displayTerms._handleConfirmTermsBtnKeyEvents(mockEvent)).toBeUndefined();
    expect(_confirmTermsSpy).not.toHaveBeenCalledWith(mockEvent);
  });
});


describe('_confirmTerms(e)', () => {
  it(`should set "hasAcceptedTerms" to true in localStorage, remove the termsPopupElement after 300 milliseconds, then return undefined`, () => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        setItem: () => {},
      },
    });

    const localStorageSpy = jest.spyOn(window.localStorage, 'setItem');
    const mockEvent = {
      target: {
        removeEventListener: () => {},
      },
    };

    const mockPopupElement = document.createElement('div');
    mockPopupElement.className = 'termsPopup';
    document.body.appendChild(mockPopupElement);
    
    jest.useFakeTimers();
    expect(displayTerms._confirmTerms(mockEvent)).toBeUndefined();
    expect(localStorageSpy).toHaveBeenCalledWith('hasAcceptedTerms', true);

    jest.advanceTimersByTime(300);
    expect(document.querySelector('.termsPopup')).toBeNull();

    jest.now();
  });
});
