import SessionContent from "../../../js/components/session/SessionContent";

import sessionInfo from "../../../js/components/session/SessionInfo";
import BillModal from "../../../js/components/session/BillModal";
import BillElement from "../../../js/components/session/BillElement";
import ConfirmModal from "../../../js/components/global/ConfirmModal";
import messagePopup from "../../../js/components/global/messagePopup";


jest.mock('../../../js/components/session/SessionInfo');
jest.mock('../../../js/components/session/BillModal');
jest.mock('../../../js/components/session/BillElement');
jest.mock('../../../js/components/global/ConfirmModal');
jest.mock('../../../js/components/global/messagePopup');
jest.mock('../../../js/components/session/SessionReference');

const sessionContentHTML = `
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
            class="svg-icon"
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
            class="svg-icon"
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
`;

let sessionContent;

beforeEach(() => {
  document.body.innerHTML = sessionContentHTML;
  sessionContent = new SessionContent();
});

afterEach(() => {
  document.body.innerHTML = '';
  sessionContent = null;
  jest.resetAllMocks();

  sessionInfo.sharedWith = undefined;
  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];
});

describe('_handleSessionContentKeyEvents(e)', () => {
  it('should return undefined if the pressed key is not Enter', () => {
    const mockEvent = { key: 'G' };
    expect(sessionContent._handleSessionContentKeyEvents(mockEvent)).toBeUndefined();
  });
  
  it(`should call _resizeList() with the event object if Enter is pressed while the outlined element contains a class of "expandList", then return undefined`, () => {
    const mockEvent = {
      key: 'Enter',
      target: {
        classList: {
          contains: (className) => {
            if(className === 'expandList') {
              return true;
            };

            return false;
          },
        },
      },
    };

    const _resizeListSpy = jest.spyOn(sessionContent, '_resizeList').mockImplementationOnce(() => {});
    expect(sessionContent._handleSessionContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_resizeListSpy).toHaveBeenCalledWith(mockEvent);
  });


  it(`should call _editBill() with the event object if Enter is pressed while the outlined element contains a class of "editBillIcon", then return undefined`, () => {
    const mockEvent = {
      key: 'Enter',
      target: {
        classList: {
          contains: (className) => {
            if(className === 'editBillIcon') {
              return true;
            };

            return false;
          },
        },
      },
    };

    const _editBillSpy = jest.spyOn(sessionContent, '_editBill').mockImplementationOnce(() => {});
    expect(sessionContent._handleSessionContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_editBillSpy).toHaveBeenCalledWith(mockEvent);
  });
  
  it(`should call _deleteBill() with the event object if Enter is pressed while the outlined element contains a class of "removeBillIcon", then return undefined`, () => {
    const mockEvent = {
      key: 'Enter',
      target: {
        classList: {
          contains: (className) => {
            if(className === 'removeBillIcon') {
              return true;
            };

            return false;
          },
        },
      },
    };

    const _deleteBillSpy = jest.spyOn(sessionContent, '_deleteBill').mockImplementationOnce(() => {});
    expect(sessionContent._handleSessionContentKeyEvents(mockEvent)).toBeUndefined();
    expect(_deleteBillSpy).toHaveBeenCalledWith(mockEvent);
  });
});


describe('_handleSessionContentClickEvents(e)', () => {
  let mockEvent;

  beforeEach(() => {
    mockEvent = {
      stopImmediatePropagation: () => {},
      target: {
        classList: {
          contains: undefined,
        },
      },
    };
  });

  afterEach(() => {
    mockEvent = null;
  });

  it('should always return undefined', () => {
    mockEvent.target.classList.contains = () => {};
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();

    mockEvent.target.classList.contains = (className) => { if(className === 'expandList') return true; };
    jest.spyOn(sessionContent, '_resizeList').mockImplementation(() => {});
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();

    mockEvent.target.classList.contains = (className) => { if(className === 'addBillBtn') return true; };
    jest.spyOn(sessionContent, '_startNewBill').mockImplementation(() => {});
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();

    mockEvent.target.classList.contains = (className) => { if(className === 'editBillIcon') return true; };
    jest.spyOn(sessionContent, '_editBill').mockImplementation(() => {});
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();

    mockEvent.target.classList.contains = (className) => { if(className === 'removeBillIcon') return true; };
    jest.spyOn(sessionContent, '_deleteBill').mockImplementation(() => {});
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();

    mockEvent.target.classList.contains = (className) => { if(className === 'clearListBtn') return true; };
    jest.spyOn(sessionContent, '_startClearContentList').mockImplementation(() => {});
    expect(sessionContent._handleSessionContentClickEvents(mockEvent)).toBeUndefined();
  });
  
  it(`should call _resizeList() with the event object, if the target element contains a class of "expandList"`, () => {
    mockEvent.target.classList.contains = (className) => { if(className === 'expandList') return true; };
    const _resizeListSpy = jest.spyOn(sessionContent, '_resizeList').mockImplementation(() => {});

    sessionContent._handleSessionContentClickEvents(mockEvent);
    expect(_resizeListSpy).toHaveBeenCalledWith(mockEvent);
  });
  
  it(`should call _startNewBill() with the event object, if the target element contains a class of "addBillBtn"`, () => {
    mockEvent.target.classList.contains = (className) => { if(className === 'addBillBtn') return true; };
    const _startNewBillSpy = jest.spyOn(sessionContent, '_startNewBill').mockImplementation(() => {});

    sessionContent._handleSessionContentClickEvents(mockEvent);
    expect(_startNewBillSpy).toHaveBeenCalledWith(mockEvent);
  });

  it(`should call _editBill() with the event object, if the target element contains a class of "editBillIcon"`, () => {
    mockEvent.target.classList.contains = (className) => { if(className === 'editBillIcon') return true; };
    const _editBillSpy = jest.spyOn(sessionContent, '_editBill').mockImplementation(() => {});

    sessionContent._handleSessionContentClickEvents(mockEvent);
    expect(_editBillSpy).toHaveBeenCalledWith(mockEvent);
  });

  it(`should call _deleteBill() with the event object, if the target element contains a class of "removeBillIcon"`, () => {
    mockEvent.target.classList.contains = (className) => { if(className === 'removeBillIcon') return true; };
    const _deleteBillSpy = jest.spyOn(sessionContent, '_deleteBill').mockImplementation(() => {});

    sessionContent._handleSessionContentClickEvents(mockEvent);
    expect(_deleteBillSpy).toHaveBeenCalledWith(mockEvent);
  });

  it(`should call _startClearContentList() with the event object, if the target element contains a class of "clearListBtn"`, () => {
    mockEvent.target.classList.contains = (className) => { if(className === 'clearListBtn') return true; };
    const _startClearContentListSpy = jest.spyOn(sessionContent, '_startClearContentList').mockImplementation(() => {});

    sessionContent._handleSessionContentClickEvents(mockEvent);
    expect(_startClearContentListSpy).toHaveBeenCalledWith(mockEvent);
  });
});

describe('_render()', () => {
  it('should always return undefined', () => {
    jest.spyOn(sessionContent, '_emptyContentList').mockImplementation(() => {});
    jest.spyOn(sessionContent, '_loadBills').mockImplementation(() => {});
    jest.spyOn(sessionContent, '_enableClearButtons').mockImplementation(() => {});
    
    expect(sessionContent._render()).toBeUndefined();
    expect(sessionContent._render(null)).toBeUndefined();
    expect(sessionContent._render(0)).toBeUndefined();
    expect(sessionContent._render('')).toBeUndefined();
    expect(sessionContent._render({})).toBeUndefined();
    expect(sessionContent._render([])).toBeUndefined();
    expect(sessionContent._render('some value')).toBeUndefined();
    expect(sessionContent._render(5)).toBeUndefined();
  });

  it('should call a number of functions', () => {
    const _emptyContentListSpy = jest.spyOn(sessionContent, '_emptyContentList').mockImplementation(() => {});
    const _loadBillsSpy = jest.spyOn(sessionContent, '_loadBills').mockImplementation(() => {});
    const _enableClearButtonsSpy = jest.spyOn(sessionContent, '_enableClearButtons').mockImplementation(() => {});

    sessionContent._render();
    expect(_emptyContentListSpy).toHaveBeenCalledWith(sessionContent._mainContentList);
    expect(_emptyContentListSpy).toHaveBeenCalledWith(sessionContent._secondaryContentList);
    expect(_loadBillsSpy).toHaveBeenCalled();
    expect(_enableClearButtonsSpy).toHaveBeenCalled();
  });
});

describe('_emptyContentList()', () => {
  it('should always return undefined if a valid contentList is provided as an argument', () => {
    expect(sessionContent._emptyContentList(sessionContent._mainContentList)).toBeUndefined();
    expect(sessionContent._emptyContentList(sessionContent._secondaryContentList)).toBeUndefined();
  });

  it('should clear all the bill elements (children) from the contentList element passed in as an argument', () => {
    for(let i = 0; i < 3; i++) {
      sessionContent._mainContentList.appendChild(document.createElement('div'));
      sessionContent._secondaryContentList.appendChild(document.createElement('div'));
    };

    sessionContent._emptyContentList(sessionContent._mainContentList);
    sessionContent._emptyContentList(sessionContent._secondaryContentList);

    expect(sessionContent._mainContentList.children.length).toBe(0);
    expect(sessionContent._secondaryContentList.children.length).toBe(0);
  });
});

describe('_loadBills()', () => {
  let _expandContentListSpy;
  
  beforeEach(() => {
    BillElement.prototype.create.mockImplementation((mockBillItem) => {
      const mockDiv = document.createElement('div');
      mockDiv.appendChild(document.createTextNode(mockBillItem.mockProperty));

      return mockDiv;
    });

    _expandContentListSpy = jest.spyOn(sessionContent, '_expandContentList').mockImplementation(() => {});
    
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];
  });

  afterEach(() => {
    _expandContentListSpy = null;
  });
  
  it('should not do anything and return undefined if both contentLists are empty (no bills in the session)', () => {
    expect(sessionContent._loadBills()).toBeUndefined();
    expect(BillElement.prototype.create).not.toHaveBeenCalled();
    expect(_expandContentListSpy).not.toHaveBeenCalled();
  });

  it('should, if sessionInfo.billsPaid contains bill objects, call BillElement.prototype.create() for the number of elements within the array and with the bill objects, call _expandContentList() with _mainContentList, then return undefined. It should also append new bill elements into _mainContentList', () => {
    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);

    expect(sessionContent._loadBills()).toBeUndefined();
    expect(_expandContentListSpy).toHaveBeenCalledWith(sessionContent._mainContentList);
    
    expect(BillElement.prototype.create).toHaveBeenCalledTimes(1);
    expect(BillElement.prototype.create).toHaveBeenCalledWith(mockBill);

    expect(sessionContent._mainContentList.firstElementChild.textContent).toBe('mockValue');
  });
  
  it('should, if sessionInfo.billsToPay contains bill objects, call BillElement.prototype.create() for the number of elements within the array and with the bill objects, call _expandContentList() with _secondaryContentList, then return undefined. It should also append new bill elements into _secondaryContentList', () => {
    const mockBill1 = { mockProperty: 'mockValue' };
    const mockBill2 = { mockProperty: 'mockValue' };

    sessionInfo.billsToPay.push(mockBill1);
    sessionInfo.billsToPay.push(mockBill2);

    expect(sessionContent._loadBills()).toBeUndefined();
    expect(_expandContentListSpy).toHaveBeenCalledWith(sessionContent._secondaryContentList);

    expect(BillElement.prototype.create).toHaveBeenCalledTimes(2);
    expect(BillElement.prototype.create).toHaveBeenCalledWith(mockBill1);
    expect(BillElement.prototype.create).toHaveBeenCalledWith(mockBill2);

    expect(sessionContent._secondaryContentList.firstElementChild.textContent).toBe('mockValue');
    expect(sessionContent._secondaryContentList.firstElementChild.nextElementSibling.textContent).toBe('mockValue');
  });

  it('should, if both sessionInfo.billsPaid and sessionInfo.billsToPay contain bill objects, call BillElement.prototype.create() for the number of elements within both arrays separately and with the bill objects, call _expandContentList() with the respective contentList, then return undefined. It should also append new bill elements into the respectiveContentList', () => {
    const mockBillMain = { mockProperty: 'mockValueMain' };
    const mockBillSecondary = { mockProperty: 'mockValueSecondary' };

    sessionInfo.billsPaid.push(mockBillMain);
    sessionInfo.billsToPay.push(mockBillSecondary);

    expect(sessionContent._loadBills()).toBeUndefined();

    expect(_expandContentListSpy).toHaveBeenCalledTimes(2);
    expect(_expandContentListSpy).toHaveBeenCalledWith(sessionContent._mainContentList);
    expect(_expandContentListSpy).toHaveBeenCalledWith(sessionContent._secondaryContentList);

    expect(BillElement.prototype.create).toHaveBeenCalledTimes(2);
    expect(BillElement.prototype.create).toHaveBeenCalledWith(mockBillMain);
    expect(BillElement.prototype.create).toHaveBeenCalledWith(mockBillSecondary);

    expect(sessionContent._mainContentList.firstElementChild.textContent).toBe('mockValueMain');
    expect(sessionContent._secondaryContentList.firstElementChild.textContent).toBe('mockValueSecondary');
  });
});

describe('_startNewNill(e)', () => {
  it('should always return undefined if a valid event object is passed in', () => {
    const mockEvent1 = {
      target: {
        parentElement: {
          getAttribute: () => { return 'mockValue1'; }
        },
      },
    };

    const mockEvent2 = {
      target: {
        parentElement: {
          getAttribute: () => { return 'mockValue2'; }
        },
      },
    };

    expect(sessionContent._startNewBill(mockEvent1)).toBeUndefined();
    expect(sessionContent._startNewBill(mockEvent2)).toBeUndefined();
  });
  
  it('should call BillModal.prototype.display with the billOwner value', () => {
    const mockEvent = {
      target: {
        parentElement: {
          getAttribute: () => { return 'main'; }
        },
      },
    };

    BillModal.prototype.display.mockImplementationOnce(() => {});
    
    sessionContent._startNewBill(mockEvent);
    expect(BillModal.prototype.display).toHaveBeenCalledWith('main');
  });
});

describe('_editBill(e)', () => {
  it('should fetch the billOwner and billID from the data-attributes of surrounding elements, call BillModal.prototype.display(billOwner, billID), then return undefined ', () => {
    const mockBillElement = document.createElement('div');
    mockBillElement.setAttribute('data-id', 'mockBillID');

    const mockContentListElement = document.createElement('div');
    mockContentListElement.setAttribute('data-list', 'mockBillOwner');

    const mockEvent = {
      target: {
        closest: () => { return mockContentListElement; },
        parentElement: {
          parentElement: mockBillElement,
        },
      },
    };

    expect(sessionContent._editBill(mockEvent)).toBeUndefined();
    expect(BillModal.prototype.display).toHaveBeenCalledWith('mockBillOwner', 'mockBillID');
  });
});

describe('_deleteBill(e)', () => {
  function addMockBillElement(id, billOwner) {
    const billElement = document.createElement('div');
    billElement.setAttribute('data-id', id);
    billElement.setAttribute('data-bill-owner', billOwner);

    const mainContentList = document.querySelector('.list-main');
    const secondaryContentList = document.querySelector('.list-secondary');

    if(billOwner === 'main') {
      mainContentList.appendChild(billElement);
      return billElement;
    };

    secondaryContentList.appendChild(billElement);
    return billElement;
  };

  beforeEach(() => {
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];
  });

  it('should return undefined and end the function if the billID obtained from the billElement is not found in sessionInfo', () => {
    const mockBillElement = addMockBillElement('mockBillID', 'main');

    const _slideAndRemoveBillSpy = jest.spyOn(sessionContent, '_slideAndRemoveBill').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        parentElement: {
          parentElement: mockBillElement,
        },
      },
    };

    expect(sessionContent._deleteBill(mockEvent)).toBeUndefined();
    expect(_slideAndRemoveBillSpy).not.toHaveBeenCalled();
  });
  
  it(`should, if the billID obtained is found in sessionInfo, remove it from sessionInfo, call _slideAndRemoveBill, and after 250 milliseconds, call a number of function and dispatch teh following events: "updateSessionInfo" and "render". It should also return undefined`, () => {
    const mockBillElement = addMockBillElement('mockBillID', 'main');

    const mockBillObject = { id: 'mockBillID' };
    sessionInfo.billsPaid.push(mockBillObject);

    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementationOnce(() => {});
    const mockUpdateSessionInfoEvent = new Event('updateSessionInfo');
    const mockRenderEvent = new Event('render');

    const _slideAndRemoveBillSpy = jest.spyOn(sessionContent, '_slideAndRemoveBill').mockImplementationOnce(() => {});
    jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});
    
    const mockEvent = {
      target: {
        parentElement: {
          parentElement: mockBillElement,
        },
      },
    };

    jest.useFakeTimers();
    expect(sessionContent._deleteBill(mockEvent)).toBeUndefined();
    expect(_slideAndRemoveBillSpy).toHaveBeenCalledWith(mockBillElement);

    jest.advanceTimersByTime(250);
    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockUpdateSessionInfoEvent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);

    expect(messagePopup).toHaveBeenCalledWith('Bill deleted', 'danger');
    jest.now();
  });
  
  it('should call _retractContentList() with the respective content list, if the bill being deleted is the last one in its respective array', () => {
    const mockBillElement = addMockBillElement('mockBillID', 'secondary');
    
    const mockBillObject = { id: 'mockBillID' };
    sessionInfo.billsToPay.push(mockBillObject);
    
    jest.spyOn(sessionContent, '_slideAndRemoveBill').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        parentElement: {
          parentElement: mockBillElement,
        },
      },
    };
    
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});

    jest.useFakeTimers();
    sessionContent._deleteBill(mockEvent);

    jest.advanceTimersByTime(250);
    expect(_retractContentListSpy).toHaveBeenCalledWith(mockBillElement.parentElement);
    jest.now();
  });
  

  it('should not call _retractContentList() if the bill being deleted is not the last one in its respective array', () => {
    addMockBillElement('mockBillID1', 'secondary');
    const mockBillElement2 = addMockBillElement('mockBillID2', 'secondary');
    
    const mockBillObject1 = { id: 'mockBillID1' };
    const mockBillObject2 = { id: 'mockBillID2' };

    sessionInfo.billsToPay.push(mockBillObject1);
    sessionInfo.billsToPay.push(mockBillObject2);
    
    jest.spyOn(sessionContent, '_slideAndRemoveBill').mockImplementationOnce(() => {});
    const mockEvent = {
      target: {
        parentElement: {
          parentElement: mockBillElement2,
        },
      },
    };
    
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});

    jest.useFakeTimers();
    sessionContent._deleteBill(mockEvent);

    jest.advanceTimersByTime(250);
    expect(_retractContentListSpy).not.toHaveBeenCalledWith();
    jest.now();
  });
});

describe('_startClearContentList(e)', () => {
  let mockConfirmModal;

  beforeEach(() => {
    mockConfirmModal = document.createElement('div');
    mockConfirmModal.className = 'confirm-modal';
    document.body.appendChild(mockConfirmModal);
  });

  afterEach(() => {
    mockConfirmModal = null;
    sessionInfo.sharedWith = undefined;
  });

  it(`should obtain the listOwner value through the "data-list" attribute, call ConfirmModal.prototype.display(), and return undefined`, () => {
    const mockEvent1 = {
      target: {
        parentElement: {
          getAttribute: () => { return 'main'; },
        },
      },
    };

    sessionInfo.sharedWith = 'mockValue';
    const mockEvent2 = {
      target: {
        parentElement: {
          getAttribute: () => { return 'secondary'; },
        },
      },
    };

    expect(sessionContent._startClearContentList(mockEvent1)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to delete all the bills paid by you?', 'danger');

    expect(sessionContent._startClearContentList(mockEvent2)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to delete all the bills paid by mockValue?', 'danger');
  });
  
  it(`should add an eventListener to the confirmModal element, and if the user generates an "exit click" call ConfirmModal.prototype.remove()`, () => {
    const mainMockEvent = {
      target: {
        parentElement: {
          getAttribute: () => { return 'main'; },
        },
      },
    };

    expect(sessionContent._startClearContentList(mainMockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to delete all the bills paid by you?', 'danger');

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return true; });
    const mockExitClickEvent = new MouseEvent('click');

    mockConfirmModal.dispatchEvent(mockExitClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockExitClickEvent);
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });

  it(`should add an eventListener to the confirmModal element, and if the user clicks the confirmModalConfirmBtn, call _clearContentList(listOwner) and ConfirmModal.prototype.remove(). The function will still call ConfirmModal.prototype.isExitClick() to check if an "exit click" was made`, () => {
    sessionInfo.sharedWith = 'mockValue';
    const mainMockEvent = {
      target: {
        parentElement: {
          getAttribute: () => { return 'secondary'; },
        },
      },
    };

    expect(sessionContent._startClearContentList(mainMockEvent)).toBeUndefined();
    expect(ConfirmModal.prototype.display).toHaveBeenCalledWith('Are you sure you want to delete all the bills paid by mockValue?', 'danger');

    ConfirmModal.prototype.isExitClick.mockImplementationOnce(() => { return false; });
    const _clearContentListSpy = jest.spyOn(sessionContent, '_clearContentList').mockImplementationOnce(() => {});

    const mockExitClickEvent = new MouseEvent('click');
    Object.defineProperty(mockExitClickEvent, 'target', {
      writable: false,
      value: {
        id: 'confirmModalConfirmBtn',
      },
    });

    mockConfirmModal.dispatchEvent(mockExitClickEvent);

    expect(ConfirmModal.prototype.isExitClick).toHaveBeenCalledWith(mockExitClickEvent);
    expect(_clearContentListSpy).toHaveBeenCalledWith('secondary');
    expect(ConfirmModal.prototype.remove).toHaveBeenCalled();
  });
});

describe('_clearContentList(listOwner)', () => {
  let dispatchEventSpy;

  beforeEach(() => {
    dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => {});
  });

  afterEach(() => {
    dispatchEventSpy = null;
  });
  
  it('should always return undefined', () => {
    expect(sessionContent._clearContentList()).toBeUndefined();
    expect(sessionContent._clearContentList(null)).toBeUndefined();
    expect(sessionContent._clearContentList(0)).toBeUndefined();
    expect(sessionContent._clearContentList('')).toBeUndefined();
    expect(sessionContent._clearContentList({})).toBeUndefined();
    expect(sessionContent._clearContentList([])).toBeUndefined();
    expect(sessionContent._clearContentList('some value')).toBeUndefined();
    expect(sessionContent._clearContentList(5)).toBeUndefined();
  });

  it(`should, if the listOwner is equal to "main", empty the sessionInfo.billsPaid array, call messagePopup(), call _retractContentList() with _mainContentList, and dispatch the following events: "updateSessionInfo" and "render"`, () => {
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});

    const mockBillItem = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBillItem);
    sessionInfo.billsPaid.push(mockBillItem);

    const mockUpdateSessionInfoEvent = new Event('updateSessionInfo');
    const mockRenderEvent = new Event('render');
    
    sessionContent._clearContentList('main');

    expect(sessionInfo.billsPaid).toEqual([]);
    expect(messagePopup).toHaveBeenCalledWith('Cleared bills paid by you', 'success');
    expect(_retractContentListSpy).toHaveBeenCalledWith(sessionContent._mainContentList);

    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockUpdateSessionInfoEvent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);
  });
  
  it(`should, if the listOwner is equal to "secondary", empty the sessionInfo.billsToPay array, call messagePopup(), call _retractContentList() with _secondaryContentList, and dispatch the following events: "updateSessionInfo" and "render"`, () => {
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});

    const mockBillItem = { mockProperty: 'mockValue' };
    sessionInfo.billsToPay.push(mockBillItem);
    sessionInfo.billsToPay.push(mockBillItem);
    sessionInfo.sharedWith = 'mockSharedWith';

    const mockUpdateSessionInfoEvent = new Event('updateSessionInfo');
    const mockRenderEvent = new Event('render');
    
    sessionContent._clearContentList('secondary');

    expect(sessionInfo.billsToPay).toEqual([]);
    expect(messagePopup).toHaveBeenCalledWith('Cleared bills paid by mockSharedWith', 'success');
    expect(_retractContentListSpy).toHaveBeenCalledWith(sessionContent._secondaryContentList);

    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockUpdateSessionInfoEvent);
    expect(dispatchEventSpy).toHaveBeenCalledWith(mockRenderEvent);
  });

  it(`should, if the listOwner is not equal to "main" or "secondary",call messagePopup, stop the function, return undefined, and not dispatch any events`, () => {
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});

    expect(sessionContent._clearContentList('someOTherValue')).toBeUndefined();
    expect(messagePopup).toHaveBeenCalledWith('Something went wrong', 'danger');

    expect(_retractContentListSpy).not.toHaveBeenCalled();
    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });
});

describe('_slideAndRemoveBill(billElement)', () => {
  function addMockBillElement(id, billOwner) {
    const billElement = document.createElement('div');
    billElement.setAttribute('data-id', id);
    billElement.setAttribute('data-bill-owner', billOwner);

    const mainContentList = document.querySelector('.list-main');
    const secondaryContentList = document.querySelector('.list-secondary');

    if(billOwner === 'main') {
      mainContentList.appendChild(billElement);
      return billElement;
    };

    secondaryContentList.appendChild(billElement);
    return billElement;
  };

  afterEach(() => {
    delete window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    });
  });

  it('should slide and fade out the element visually, and after 250 milliseconds, remove the billElement from the DOM then return undefined', () => {
    const mockBillElement = addMockBillElement('mockBillID', 'main');

    jest.useFakeTimers();
    expect(sessionContent._slideAndRemoveBill(mockBillElement)).toBeUndefined();

    jest.advanceTimersByTime(250);
    expect(sessionContent._mainContentList.firstElementChild).toBeNull();

    jest.now();
  });

  it('should stop the function and return undefined if the billElement passed in is falsy or not an instance of HTMLElement', () => {
    const mockBillElement = addMockBillElement('mockBillID', 'main');

    jest.useFakeTimers();
    expect(sessionContent._slideAndRemoveBill('notAnHtmlElement')).toBeUndefined();

    jest.advanceTimersByTime(250);
    expect(sessionContent._mainContentList.firstElementChild).toEqual(mockBillElement);

    jest.now();
  });
  
});

describe('_resizeList(e)', () => {
  it(`should call _retractContentList() with the respective contentList, if the contentList contains a class of "expanded", then return undefined`, () => {
    const contentMainElement = document.querySelector('#content-main');
    const mockEVent = {
      target: {
        closest: () => { return contentMainElement; },
      },
    };

    const contentList = contentMainElement.lastElementChild;
    contentList.classList.add('expanded');
    
    const _retractContentListSpy = jest.spyOn(sessionContent, '_retractContentList').mockImplementationOnce(() => {});
    
    expect(sessionContent._resizeList(mockEVent)).toBeUndefined();
    expect(_retractContentListSpy).toHaveBeenCalledWith(contentList);
  });

  it(`should call _expandContentList() with the respective contentList, if the contentList does not contain a class of "expanded", then return undefined`, () => {
    const contentMainElement = document.querySelector('#content-main');
    const mockEVent = {
      target: {
        closest: () => { return contentMainElement; },
      },
    };

    const contentList = contentMainElement.lastElementChild;
    contentList.classList.remove('expanded');
    
    const _expandContentListSpy = jest.spyOn(sessionContent, '_expandContentList').mockImplementationOnce(() => {});
    
    expect(sessionContent._resizeList(mockEVent)).toBeUndefined();
    expect(_expandContentListSpy).toHaveBeenCalledWith(contentList);
  });
});

describe('_enableClearButtons()', () => {
  it(`it should add a "disabled" class and a "disabled" attribute equal to "" for mainClearListBtn if sessionInfo.billsPaid is empty, then return undefined`, () => {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    mainClearListBtn.removeAttribute('disabled');
    mainClearListBtn.classList.remove('disabled');
    
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [{ mockProperty: 'mockValue' }];

    expect(sessionContent._enableClearButtons()).toBeUndefined();
    expect(mainClearListBtn.getAttribute('disabled')).toBe('');
    expect(mainClearListBtn.classList.contains('disabled')).toBe(true);
  });
  
  it(`it should add a "disabled" class and a "disabled" attribute equal to "" for secondaryClearListBtn if sessionInfo.billsToPay is empty, then return undefined`, () => {
    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    secondaryClearListBtn.removeAttribute('disabled');
    secondaryClearListBtn.classList.remove('disabled');
    
    sessionInfo.billsPaid = [{ mockProperty: 'mockValue' }];
    sessionInfo.billsToPay = [];

    expect(sessionContent._enableClearButtons()).toBeUndefined();
    expect(secondaryClearListBtn.getAttribute('disabled')).toBe('');
    expect(secondaryClearListBtn.classList.contains('disabled')).toBe(true);
  });

  it(`it should add a "disabled" class and a "disabled" attribute equal to "" for both mainClearListBtn and secondaryClearListBtn if sessioninfo.billsPaid and sessionInfo.billsToPay are both empty, then return undefined`, () => {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    mainClearListBtn.removeAttribute('disabled');
    mainClearListBtn.classList.remove('disabled');

    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    secondaryClearListBtn.removeAttribute('disabled');
    secondaryClearListBtn.classList.remove('disabled');
    
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];

    expect(sessionContent._enableClearButtons()).toBeUndefined();

    expect(mainClearListBtn.getAttribute('disabled')).toBe('');
    expect(mainClearListBtn.classList.contains('disabled')).toBe(true);
    
    expect(secondaryClearListBtn.getAttribute('disabled')).toBe('');
    expect(secondaryClearListBtn.classList.contains('disabled')).toBe(true);
  });

  it(`it should remove the "disabled" class and attribute from mainClearListBtn if sessionInfo.billsPaid is not empty, then return undefined`, () => {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    mainClearListBtn.setAttribute('disabled', '');
    mainClearListBtn.classList.add('disabled');
    
    sessionInfo.billsPaid = [{ mockProperty: 'mockValue' }];
    sessionInfo.billsToPay = [];

    expect(sessionContent._enableClearButtons()).toBeUndefined();
    expect(mainClearListBtn.getAttribute('disabled')).toBe(null);
    expect(mainClearListBtn.classList.contains('disabled')).toBe(false);
  });

  it(`it should remove the "disabled" class and attribute from secondaryClearListBtn if sessionInfo.billsToPay is not empty, then return undefined`, () => {
    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    secondaryClearListBtn.setAttribute('disabled', '');
    secondaryClearListBtn.classList.add('disabled');
    
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [{ mockProperty: 'mockValue' }];

    expect(sessionContent._enableClearButtons()).toBeUndefined();
    expect(secondaryClearListBtn.getAttribute('disabled')).toBe(null);
    expect(secondaryClearListBtn.classList.contains('disabled')).toBe(false);
  });

  it(`it should remove the "disabled" class and attribute from both mainClearListBtn and secondaryClearListBtn if both sessionInfo.billsPaid and sessionInfo.billsToPay are not empty, then return undefined`, () => {
    const mainClearListBtn = document.querySelector('#content-main .clearListBtn');
    mainClearListBtn.setAttribute('disabled', '');
    mainClearListBtn.classList.add('disabled');

    const secondaryClearListBtn = document.querySelector('#content-secondary .clearListBtn');
    secondaryClearListBtn.setAttribute('disabled', '');
    secondaryClearListBtn.classList.add('disabled');
    
    sessionInfo.billsPaid = [{ mockProperty: 'mockValue' }];
    sessionInfo.billsToPay = [{ mockProperty: 'mockValue' }];

    expect(sessionContent._enableClearButtons()).toBeUndefined();

    expect(mainClearListBtn.getAttribute('disabled')).toBe(null);
    expect(mainClearListBtn.classList.contains('disabled')).toBe(false);
    
    expect(secondaryClearListBtn.getAttribute('disabled')).toBe(null);
    expect(secondaryClearListBtn.classList.contains('disabled')).toBe(false);
  });
});

describe('_enableAddBillButtons()', () => {
  let addBillButtons;

  beforeEach(() => {
    addBillButtons = document.querySelectorAll('.addBillBtn');
  });

  afterEach(() => {
    addBillButtons = null;
  });
  
  it(`should, if the bill limit has been reached, add to the addBill buttons a class of "disabled", an attribute of "disabled", and an attribute of "title" equal to "Bill limit reached", then return undefined`, () => {
    sessionInfo.billLimitReached.mockImplementationOnce(() => { return true; });
    
    for(const btn of addBillButtons) {
      btn.removeAttribute('disabled');
      btn.removeAttribute('title');
      btn.classList.remove('disabled');
    };

    expect(sessionContent._enableAddBillButtons()).toBeUndefined();

    for(const btn of addBillButtons) {
      expect(btn.getAttribute('disabled')).toBe('');
      expect(btn.getAttribute('title')).toBe('Bill limit reached');
      expect(btn.classList.contains('disabled')).toBe(true);
    };
  });

  it(`should, if the bill limit has not been reached, remove from the addBill buttons the class of "disabled", the attribute of "disabled", and the attribute of "title", then return undefined`, () => {
    sessionInfo.billLimitReached.mockImplementationOnce(() => { return false; });
    
    for(const btn of addBillButtons) {
      btn.setAttribute('disabled', '');
      btn.setAttribute('title', 'Bill limit reached');
      btn.classList.add('disabled');
    };

    expect(sessionContent._enableAddBillButtons()).toBeUndefined();

    for(const btn of addBillButtons) {
      expect(btn.getAttribute('disabled')).toBeNull();
      expect(btn.getAttribute('title')).toBeNull();
      expect(btn.classList.contains('disabled')).toBe(false);
    };
  });
});
