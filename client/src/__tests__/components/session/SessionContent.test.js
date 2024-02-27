import SessionContent from "../../../js/components/session/SessionContent";

import sessionInfo from "../../../js/components/session/SessionInfo";
import BillModal from "../../../js/components/session/BillModal";
import BillElement from "../../../js/components/session/BillElement";
import ConfirmModal from "../../../js/components/global/ConfirmModal";
import messagePopup from "../../../js/components/global/messagePopup";
import SessionReference from "../../../js/components/session/SessionReference";


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
});

describe('_handleSessionContentClickEvents()', () => {
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

// continue here...