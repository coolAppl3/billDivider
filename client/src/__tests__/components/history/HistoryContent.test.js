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
  it('should call _clearSessions() and _renderSession(), then return undefined', () => {
    const _clearSessionsSpy = jest.spyOn(historyContent, '_clearSessions').mockImplementationOnce(() => {});
    const _renderSessionsSpy = jest.spyOn(historyContent, '_renderSessions').mockImplementationOnce(() => {});
    
    expect(historyContent._render()).toBeUndefined();
    expect(_clearSessionsSpy).toHaveBeenCalled();
    expect(_renderSessionsSpy).toHaveBeenCalled();
  });
});

describe('_handleHistoryContentKeyEvents', () => {
  it('should, if a key that is not Enter is pressed, return undefined and not call _handleHistoryContentClickEVents(e)', () => {
    const mockEvent = { key: 'G' };
    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementationOnce(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_handleHistoryContentClickEventsSpy).not.toHaveBeenCalled();
  });

  it('should, if Enter is pressed, return undefined and call _handleHistoryContentClickEVents(e)', () => {
    const mockEvent = { key: 'Enter' };
    const _handleHistoryContentClickEventsSpy = jest.spyOn(historyContent, '_handleHistoryContentClickEvents').mockImplementationOnce(() => {});

    expect(historyContent._handleHistoryContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_handleHistoryContentClickEventsSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_handleHistoryContentClickEvents(e)', () => {
  it(`should, if the event target does not contain a class of "removeSessionBtn", not call _removeSession(e) then return undefined`, () => {
    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return false; }
        },
      },
    };

    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).not.toHaveBeenCalled();
  });
  
  it(`should, if the event target contains a class of "removeSessionBtn", call _removeSession(e) then return undefined`, () => {
    const _removeSessionSpy = jest.spyOn(historyContent, '_removeSession').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        classList: {
          contains: () => { return true; }
        },
      },
    };

    expect(historyContent._handleHistoryContentClickEvents(mockEvent)).toBeUndefined();
    expect(_removeSessionSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_renderSessions()', () => {
  it(`should always dispatch a custom "updateHeader" with the history object`, async () => {
    fetchUserHistory.mockImplementationOnce(() => { return { sessions: undefined, username: 'mockUsername' }; });
    
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockCustomEvent = new CustomEvent('sessionsLoaded', { detail: { sessions: undefined, username: 'mockUsername' } });

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockCustomEvent);
  });
  
  it(`should fetch the user's history by calling fetchUserHistory(), then destructure the sessions array out of it. If the sessions object is falsy, it should stop the function and return undefined`, async () => {
    fetchUserHistory.mockImplementationOnce(() => { return { sessions: undefined, username: 'mockUsername' }; });

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
    expect(SessionElement.prototype.createNoSessionsElement).not.toHaveBeenCalled();
  });
  
  it(`should fetch the user's history by calling fetchUserHistory(), then destructure the sessions object out of it. If the sessions array length is 0, it should call SessionElement.prototype.createNoSessionElement(), then dispatch a "sessionsLoaded" event`, async () => {
    fetchUserHistory.mockImplementationOnce(() => { return { sessions: [], username: 'mockUsername' }; });
    
    const mockDiv = document.createElement('div');
    SessionElement.prototype.createNoSessionsElement.mockImplementationOnce(() => { return mockDiv; });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockEvent = new Event('sessionsLoaded');

    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
    expect(SessionElement.prototype.createNoSessionsElement).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockEvent);
  });

  it(`should fetch the user's history by calling fetchUserHistory(), destructure the sessions object out of it, reverse it, loop through it and call SessionElement.prototype.create() with every session, and append the elements. It should then dispatch a "sessionsLoaded" and return undefined`, async () => {
    const mockHistory = {
      username: 'mockUsername',
      sessions: [
        { mockProperty: 'mockValue' },
        { mockProperty: 'mockValue' },
      ],
    };

    fetchUserHistory.mockImplementationOnce(() => { return mockHistory; });

    const mockDiv = document.createElement('div');
    SessionElement.prototype.create.mockImplementation(() => { return mockDiv; });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockEvent = new Event('sessionsLoaded');
    
    expect(await historyContent._renderSessions()).toBeUndefined();
    expect(fetchUserHistory).toHaveBeenCalled();
    expect(SessionElement.prototype.create).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_removeSession()', () => {
  let mockEvent;
  let mockSessionElement;

  beforeEach(() => {
    ConfirmModal.prototype.display.mockImplementation(() => {
      const mockConfirmModal = document.createElement('div');
      mockConfirmModal.className = 'confirm-modal';
      document.body.appendChild(mockConfirmModal);
    });
    
    mockSessionElement = document.createElement('div');
    mockSessionElement.setAttribute('data-sessionID', 'mockSessionID');
    
    mockEvent = {
      target: {
        parentElement: {
          parentElement: mockSessionElement,
        },
      },
    };
  });

  afterEach(() => {
    mockEvent = null;
    mockSessionElement = null;
  });

  it(`should call ConfirmModal.prototype.display(), add an event listener to the confirmModal element, then return undefined. If the user makes an "exit click", it should call ConfirmModal.prototype.remove()`, async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalled();

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return true; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => {});
    
    const isExitClickEvent = new MouseEvent('click');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.dispatchEvent(isExitClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(isExitClickEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });
  
  it(`should call ConfirmModal.prototype.display(), add an event listener to the confirmModal element, then return undefined. If the user clicks the confirmModalConfirmBtn, it should call deleteSession() with the sessionID, messagePopup(), and ConfirmModal.prototype.remove(). It should also dispatch a "render" event`, async () => {
    expect(await historyContent._removeSession(mockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalled();

    deleteSession.mockImplementationOnce(() => {});
    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return false; });
    ConfirmModal.prototype.remove.mockImplementationOnce(() => {});
    
    const mockConfirmEvent = new MouseEvent('click');
    Object.defineProperty(mockConfirmEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockRenderEvent = new Event('render');

    const confirmModalElement = document.querySelector('.confirm-modal');
    confirmModalElement.dispatchEvent(mockConfirmEvent);

    expect(await deleteSession).toHaveBeenCalledWith('mockSessionID');
    expect(messagePopup).toHaveBeenCalledWith('Session removed', 'success');
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);
  });
  
});
