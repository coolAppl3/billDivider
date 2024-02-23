import HistoryContent from "../../../js/components/history/HistoryContent";

import fetchUserHistory from "../../../js/components/history/fetchUserHistory";
import deleteSession from "../../../js/components/history/deleteSession";
import SessionElement from "../../../js/components/history/SessionElement";
import messagePopup from "../../../js/components/global/messagePopup";
import ConfirmModal from "../../../js/components/global/ConfirmModal";

jest.mock('../../../js/components/history/fetchUserHistory');
jest.mock('../../../js/components/history/deleteSession');
jest.mock('../../../js/components/history/SessionElement');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/global/ConfirmModal');

let historyContent;

beforeEach(() => {
  document.body.innerHTML = '<div class="history-content"></div>';
  historyContent = new HistoryContent();
});

afterEach(() => {
  document.body.innerHTML = '';
  historyContent = null;
  jest.resetAllMocks();
});

describe('_render()', () => {
  it('should always return undefined', () => {
    expect(historyContent._render()).toBeUndefined();
    expect(historyContent._render(null)).toBeUndefined();
    expect(historyContent._render(0)).toBeUndefined();
    expect(historyContent._render('')).toBeUndefined();
    expect(historyContent._render({})).toBeUndefined();
    expect(historyContent._render([])).toBeUndefined();
    expect(historyContent._render('some value')).toBeUndefined();
    expect(historyContent._render(5)).toBeUndefined();
  });
  
  it('should call _clearSessions() and _renderSessions()', () => {
    const _clearSessionsSpy = jest.spyOn(historyContent, '_clearSessions');
    const _renderSessionsSpy = jest.spyOn(historyContent, '_renderSessions');

    historyContent._render();
    expect(_clearSessionsSpy).toHaveBeenCalled();
    expect(_renderSessionsSpy).toHaveBeenCalled();
  });
});

describe('_handleHistoryContentKeyEvents(e)', () => {
  it('should always return undefined if a valid event object is passed in', () => {
    const mockEvent1 = { key: 'Enter' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: ' ' };

    // Mocking implementation to isolate the test and prevent further function calls
    jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementation(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent1)).toBeUndefined();
    expect(historyContent._handleHistoryContentKeyEvents(mockEvent2)).toBeUndefined();
    expect(historyContent._handleHistoryContentKeyEvents(mockEvent3)).toBeUndefined();
  });

  it('should return undefined and not call _handleHistoryContentClickEvents(e) if the pressed key is not Enter', () => {
    const mockEvent1 = { key: 'Shift' };
    const mockEvent2 = { key: 'G' };
    const mockEvent3 = { key: ' ' };

    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents');

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent1)).toBeUndefined();
    expect(historyContent._handleHistoryContentKeyEvents(mockEvent2)).toBeUndefined();
    expect(historyContent._handleHistoryContentKeyEvents(mockEvent3)).toBeUndefined();

    expect(_handleHistoryContentClickEventsSpy).not.toHaveBeenCalled();
  });
  
  it('should return undefined and call _handleHistoryContentClickEvents(e) if the pressed key is  Enter', () => {
    const mockEvent = { key: 'Enter' };

    // Mocking implementation to isolate the test and prevent further function calls
    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementationOnce(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_handleHistoryContentClickEventsSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_handleHistoryContentClickEvents(e)', () => {
  it('should always return undefined if a valid event object is passed in', () => {
    const mockEvent1 = {
      target: {
        classList: {
          contains: () => { return true },
        },
      },
    };
    const mockEvent2 = {
      target: {
        classList: {
          contains: () => { return false },
        },
      },
    };
    const mockEvent3 = {
      target: {
        classList: {
          contains: () => { return true },
        },
      },
    };

    // Mocking implementation to isolate the test and prevent further function calls
    jest.spyOn(historyContent, '_removeSession').mockImplementation(() => {});

    expect(historyContent._handleHistoryContentClickEvents(mockEvent1)).toBeUndefined();
    expect(historyContent._handleHistoryContentClickEvents(mockEvent2)).toBeUndefined();
    expect(historyContent._handleHistoryContentClickEvents(mockEvent3)).toBeUndefined();
  });

  it(`should return undefined and not call _removeSession(e) if the clicked element does not contain the class "removeSessionBtn"`, () => {
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return false },
        },
      },
    };

    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession');
    
    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).not.toHaveBeenCalled();
  });

  it('should return undefined and call _removeSession(e) if the clicked element contains the class "removeSessionBtn"', () => {
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return true },
        },
      },
    };

    // Mocking implementation to isolate the test and prevent further function calls
    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession').mockImplementationOnce(() => {});
    
    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_renderSessions()', () => {
  it('should always return undefined', async () => {
    const mockDivElement = document.createElement('div');
    SessionElement.prototype.createNoSessionsElement.mockImplementation(() => { return mockDivElement; });
    SessionElement.prototype.create.mockImplementation(() => { return mockDivElement; });
    
    fetchUserHistory
      .mockImplementationOnce(() => { return undefined; })
      .mockImplementationOnce(() => { return []; })
      .mockImplementationOnce(() => { return [{ mockItem: 'mockValue' }] })
      .mockImplementation(() => {})
    ;
    
    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(await historyContent._renderSessions(null)).toBeUndefined();
    expect(await historyContent._renderSessions(0)).toBeUndefined();
    expect(await historyContent._renderSessions('')).toBeUndefined();
    expect(await historyContent._renderSessions({})).toBeUndefined();
    expect(await historyContent._renderSessions([])).toBeUndefined();
    expect(await historyContent._renderSessions('some value')).toBeUndefined();
    expect(await historyContent._renderSessions(5)).toBeUndefined();
  });
  
  it('should call fetchUserHistory(), and if it returns undefined (API request failed), return undefined and stop the function', async () => {
    fetchUserHistory.mockImplementationOnce(() => { return undefined; });

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
  });
  
  it(`should call fetchUserHistory(), and if the user history is an empty array, call SessionElement.prototype.createNoSessionsElement(), append it to the historyContentElement, dispatch a "sessionsLoaded" on the window, and return undefined`, async () => {
    fetchUserHistory.mockImplementationOnce(() => { return []; });
    
    const mockDiv = document.createElement('div');
    SessionElement.prototype.createNoSessionsElement.mockImplementationOnce(() => { return mockDiv; });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const expectedDispatchedEvent = new Event('sessionsLoaded');

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
    expect(SessionElement.prototype.createNoSessionsElement).toHaveBeenCalled();
    expect(historyContent._historyContentElement.firstElementChild).toEqual(mockDiv);
    expect(dispatchEventSpy).toHaveBeenCalledWith(expectedDispatchedEvent);
  });
  
  it('should call fetchUserHistory(), and if the user history is an array with one more elements, reverse the array, loop over it, call SessionElement.prototype.create() in every loop and append the resulting element in the historyContent element, dispatch a "sessionsLoaded" on the window, and return undefined`', async () => {
    const mockUserHistory = [ { mockProperty: 'mockValue1' }, { mockProperty: 'mockValue2'} ];
    fetchUserHistory.mockImplementationOnce(() => { return mockUserHistory; });

    SessionElement.prototype.create.mockImplementation((mockSession) => {
      const mockDiv = document.createElement('div');
      mockDiv.textContent = mockSession.mockProperty;

      return mockDiv;
    });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const expectedDispatchedEvent = new Event('sessionsLoaded');

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();

    expect(SessionElement.prototype.create).toHaveBeenCalledTimes(2);
    expect(dispatchEventSpy).toHaveBeenCalledWith(expectedDispatchedEvent);

    expect(historyContent._historyContentElement.firstElementChild.textContent).toBe('mockValue2');
    expect(historyContent._historyContentElement.lastElementChild.textContent).toBe('mockValue1');
  });
});

describe('_removeSession(e)', () => {
  let mockEvent;
  let mockSessionItem;
  
  beforeEach(() => {
    mockSessionItem = document.createElement('div');
    mockSessionItem.setAttribute('data-sessionID', 'mockSessionID');
    document.body.appendChild(mockSessionItem);
    
    // Mocking the necessary properties of the event resulting from clicking the removeSessionBtn in a sessionItem element
    mockEvent = {
      target: {
        parentElement: {
          parentElement: mockSessionItem,
        },
      },
    };

    const mockConfirmModalElement = document.createElement('div');
    mockConfirmModalElement.className = 'confirm-modal';
    ConfirmModal.prototype.display.mockImplementation(() => { document.body.appendChild(mockConfirmModalElement); });
  });

  afterEach(() => {
    mockSessionItem = null;
    mockEvent = null;
    document.body.innerHTML = '';
  });
  
  it('should always return undefined', async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    // the function is called through an event listener, so there's no point in checking for edge cases through jest
  });
  
  it(`should call ConfirmModal.prototype.display(), add an event listener to the confirmModalElement, and return undefined. If an "exitClick" is made by the user, ConfirmModal.prototype.remove() should be called and the confirmModalElement should be removed`, async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to remove this session?', 'danger');

    // Mocking a click event to test the rest of the function
    const confirmModalElement = document.querySelector('.confirm-modal');

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return true; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => { confirmModalElement.remove(); });

    const mockClickEvent = new MouseEvent('click');
    confirmModalElement.dispatchEvent(mockClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalled();
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    expect(document.querySelector('.confirm-modal')).toBeNull();
  });

  it('should call ConfirmModal.prototype.display(), add an event listener to the confirmModalElement, and return undefined. If the user clicks the confirm button, the following should be called: deleteSession(sessionID), messagePopup(), and ConfirmModal.prototype.remove(). Moreover, the confirmModalElement should also be removed, and a "render" event should be dispatched to the window', async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to remove this session?', 'danger');

    // Mocking a click event to test the rest of the function
    const confirmModalElement = document.querySelector('.confirm-modal');

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return false; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => { confirmModalElement.remove(); });

    deleteSession.mockImplementation(() => {});
    messagePopup.mockImplementation(() => {});

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const expectedDispatchedEvent = new Event('render');

    const mockClickEvent = new MouseEvent('click');
    Object.defineProperty(mockClickEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });

    confirmModalElement.dispatchEvent(mockClickEvent);

    await expect(deleteSession).toHaveBeenCalled();
    expect(messagePopup).toHaveBeenCalledWith('Session removed', 'success');
    expect(dispatchEventSpy).toHaveBeenCalledWith(expectedDispatchedEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalled();
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    expect(document.querySelector('.confirm-modal')).toBeNull();
  });
});

describe('_clearSessions()', () => {
  it('should always return undefined', () => {
    expect(historyContent._clearSessions()).toBeUndefined();
    expect(historyContent._clearSessions(null)).toBeUndefined();
    expect(historyContent._clearSessions(0)).toBeUndefined();
    expect(historyContent._clearSessions('')).toBeUndefined();
    expect(historyContent._clearSessions({})).toBeUndefined();
    expect(historyContent._clearSessions([])).toBeUndefined();
    expect(historyContent._clearSessions('some value')).toBeUndefined();
    expect(historyContent._clearSessions(5)).toBeUndefined();
  });
  
  it('should clear all child nodes of the historyContentElement', () => {
    const historyContentElement = document.querySelector('.history-content');

    for(let i = 0; i < 3; i++) {
      const mockDiv = document.createElement('div');
      historyContentElement.appendChild(mockDiv);
    };

    historyContent._clearSessions();
    expect(historyContentElement.childNodes.length).toBe(0);
  });
});