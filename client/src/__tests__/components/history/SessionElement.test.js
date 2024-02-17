import SessionElement from "../../../js/components/history/SessionElement";

import createDateString from "../../../js/components/global/createDateString";
import addThousandComma from "../../../js/components/global/addThousandComma";


// jest.mock('../../../js/components/history/SessionElement');
jest.mock('../../../js/components/global/createDateString');
jest.mock('../../../js/components/global/addThousandComma');

const mockSessionHTML = `<div class="history-content-session" data-sessionid="nG05Mdzf0tmCYWuc"><div class="history-content-session-item"><p>Created on:</p><p>6 Feb 2024</p></div><div class="history-content-session-item"><p>Shared with:</p><p>person</p></div><div class="history-content-session-item"><p>You're owed:</p><p>0.00 RSD</p></div><div class="history-content-session-item"><p>Total bills:</p><p>2</p></div><div class="history-content-session-item"><a href="session.html?nG05Mdzf0tmCYWuc" class="btn btn-border-cta displaySessionBtn">Display session</a><p tabindex="0" class="delete-session text-danger removeSessionBtn">Remove session</p></div></div>`;

let mockSessionData;
let sessionElement;

let _createSessionDivSpy;
let _createSessionDateSpy;
let _createSessionSharedWithSpy;
let _createSessionResultSpy;
let _createSessionTotalBillsSpy;
let _createSessionBtnContainerSpy;
let _createSessionItemSpy;
let _createTextElementSpy;
let _createSessionDisplayBtnSpy;
let _createSessionRemoveBtnSpy;

beforeEach(() => {
  document.body.innerHTML = mockSessionHTML;
  sessionElement = new SessionElement();

  mockSessionData = {
    sharedWith: "person",
    currency: "RSD",
    yourTotal: 61.5,
    sharedWithTotal: 61.5,
    billsPaid: [
      {
        id: "yRe05Bnu15",
        name: "bill",
        value: 123,
        unshared: 0,
        splitValue: 61.5,
        directlyOwed: false,
        billOwner: "main"
      }
    ],
    billsToPay: [
      {
        id: "te1W36yQxC",
        name: "bill",
        value: 123,
        unshared: 0,
        splitValue: 61.5,
        directlyOwed: false,
        billOwner: "secondary"
      }
    ],
    createdOn: 1707180143971,
    sessionID: "nG05Mdzf0tmCYWuc"
  };

  _createSessionDivSpy = jest.spyOn(sessionElement, '_createSessionDiv');
  _createSessionDateSpy = jest.spyOn(sessionElement, '_createSessionDate');
  _createSessionSharedWithSpy = jest.spyOn(sessionElement, '_createSessionSharedWith');
  _createSessionResultSpy = jest.spyOn(sessionElement, '_createSessionResult');
  _createSessionTotalBillsSpy = jest.spyOn(sessionElement, '_createSessionTotalBills');
  _createSessionBtnContainerSpy = jest.spyOn(sessionElement, '_createSessionBtnContainer');
  _createSessionItemSpy = jest.spyOn(sessionElement, '_createSessionItem');
  _createTextElementSpy = jest.spyOn(sessionElement, '_createTextElement');
  _createSessionDisplayBtnSpy = jest.spyOn(sessionElement, '_createSessionDisplayBtn');
  _createSessionRemoveBtnSpy = jest.spyOn(sessionElement, '_createSessionRemoveBtn');
});

afterEach(() => {
  _createSessionDivSpy = null;
  _createSessionDateSpy = null;
  _createSessionSharedWithSpy = null;
  _createSessionResultSpy = null;
  _createSessionTotalBillsSpy = null;
  _createSessionBtnContainerSpy = null;
  _createSessionItemSpy = null;
  _createTextElementSpy = null;
  _createSessionDisplayBtnSpy = null;
  _createSessionRemoveBtnSpy = null;
  
  mockSessionData = null;
  document.body.innerHTML = '';
  jest.resetAllMocks();
});

describe('create(session)', () => {
  it('should return an HTML session element using the data from the passed in session', () => {
    createDateString.mockImplementationOnce(() => { return '6 Feb 2024' });
    addThousandComma.mockImplementationOnce(() => { return '0.00' });
    
    const expectedSessionElement = document.querySelector('.history-content-session');
    expect(sessionElement.create(mockSessionData)).toEqual(expectedSessionElement);
  });

  it('should call a number of functions with the appropriate values', () => {
    sessionElement.create(mockSessionData);

    expect(_createSessionDivSpy).toHaveBeenCalledWith(mockSessionData.sessionID);
    expect(_createSessionDateSpy).toHaveBeenCalledWith(mockSessionData.createdOn);
    expect(_createSessionSharedWithSpy).toHaveBeenCalledWith(mockSessionData.sharedWith);
    expect(_createSessionResultSpy).toHaveBeenCalledWith({ yourTotal: mockSessionData.yourTotal, sharedWithTotal: mockSessionData.sharedWithTotal }, mockSessionData.currency);
    expect(_createSessionTotalBillsSpy).toHaveBeenCalledWith(mockSessionData.billsPaid, mockSessionData.billsToPay);
    expect(_createSessionBtnContainerSpy).toHaveBeenCalledWith(mockSessionData.sessionID);
    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(_createTextElementSpy).toHaveBeenCalledTimes(8);
    expect(_createSessionDisplayBtnSpy).toHaveBeenCalledWith(mockSessionData.sessionID);
    expect(_createSessionRemoveBtnSpy).toHaveBeenCalled();
    
    expect(createDateString).toHaveBeenCalled();
    expect(addThousandComma).toHaveBeenCalled();
  });
});

describe('_CreateSessionDiv(sessionID)', () => {
  it('should return a sessionDiv element with data-sessionID attribute equal to the sessionID', () => {
    const sessionDiv = sessionElement._createSessionDiv(mockSessionData.sessionID);
    expect(sessionDiv.getAttribute('data-sessionID')).toEqual(mockSessionData.sessionID);
  });
});

describe('_createSessionDate(createdOn)', () => {
  it('should return a sessionDate element with two <o> child elements, call createTextElement() twice, and call createDateString(createdOn)', () => {
    createDateString.mockImplementationOnce(() => { return '6 Feb 2024' });
    const sessionDateElement = sessionElement._createSessionDate(mockSessionData.createdOn);

    expect(sessionDateElement.firstElementChild.textContent).toEqual('Created on:');
    expect(sessionDateElement.lastElementChild.textContent).toEqual('6 Feb 2024');

    expect(createDateString).toHaveBeenCalledWith(mockSessionData.createdOn);
    expect(_createTextElementSpy).toHaveBeenCalledTimes(2);
  });
});

describe('_createSessionSharedWith(sharedWith)', () => {
  it('should create a sessionSharedWith element with two <p> child elements, call createTextElement() twice, and call _createSessionItem()', () => {
    const sessionSharedWithElement = sessionElement._createSessionSharedWith(mockSessionData.sharedWith);

    expect(sessionSharedWithElement.firstElementChild.textContent).toEqual('Shared with:');
    expect(sessionSharedWithElement.lastElementChild.textContent).toEqual(mockSessionData.sharedWith);

    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(_createTextElementSpy).toHaveBeenCalledTimes(2);
  });
});

describe('_createSessionResult(totals, currency)', () => {
  it(`should create a sessionResultElement with two <p> child elements, the first of which having the text of "You owe:" if difference is negative. It should also call _createTextElement() twice, call _createSEssionItem(), and call addThousandComma(Math.abs(result)))`, () => {
    const totals = { yourTotal: 100, sharedWithTotal: 200 };
    addThousandComma.mockImplementationOnce(() => { return `100.00` });
    
    const sessionResultElement = sessionElement._createSessionResult(totals, mockSessionData.currency);
    
    expect(sessionResultElement.firstElementChild.textContent).toEqual('You owe:');
    expect(sessionResultElement.lastElementChild.textContent).toEqual(`100.00 ${mockSessionData.currency}`);

    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(addThousandComma).toHaveBeenCalledWith(Math.abs(-100));
    expect(_createTextElementSpy).toHaveBeenCalledTimes(2);
  });

  it(`should create a sessionResult element with two <p> child elements, the first of which having the text of "You're owed:" if difference is positive. It should also call _createTextElement() twice, call _createSEssionItem(), and call addThousandComma(Math.abs(result)))`, () => {
    const totals = { yourTotal: 200, sharedWithTotal: 100 };
    addThousandComma.mockImplementationOnce(() => { return `100.00` });
    
    const sessionResultElement = sessionElement._createSessionResult(totals, mockSessionData.currency);
    
    expect(sessionResultElement.firstElementChild.textContent).toEqual(`You're owed:`);
    expect(sessionResultElement.lastElementChild.textContent).toEqual(`100.00 ${mockSessionData.currency}`);

    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(addThousandComma).toHaveBeenCalledWith(100);
    expect(_createTextElementSpy).toHaveBeenCalledTimes(2);
  });
});


describe('_createSessionTotalBills(billsPaid, billsToPay)', () => {
  it(`should create a sessionTotalBills element with two <p> child elements. It should also call _createTextElement() twice, and call _createSEssionItem()`, () => {
    const expectedNumberOfTotalBills = mockSessionData.billsPaid.length + mockSessionData.billsToPay.length;
    const sessionTotalBillsElement = sessionElement._createSessionTotalBills(mockSessionData.billsPaid, mockSessionData.billsToPay);

    expect(sessionTotalBillsElement.firstElementChild.textContent).toEqual('Total bills:');
    expect(sessionTotalBillsElement.lastElementChild.textContent).toEqual(expectedNumberOfTotalBills.toString());
    
    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(_createTextElementSpy).toHaveBeenCalledTimes(2);
  });
});

describe('_createSessionBtnContainer(sessionID)', () => {
  it('should create a sessionBtnContainer element with two button, the first being an <a> tag, and the second being a <p> tag. It should also call _createSessionDisplayBtn(sessionID), _createSessionRemoveBtn(), and _createSessionItem()', () => {
    const sessionBtnContainer = sessionElement._createSessionBtnContainer(mockSessionData.sessionID);

    expect(sessionBtnContainer.firstElementChild.tagName).toEqual('A');
    expect(sessionBtnContainer.firstElementChild.textContent).toEqual('Display session');
    expect(sessionBtnContainer.lastElementChild.tagName).toEqual('P');
    expect(sessionBtnContainer.lastElementChild.textContent).toEqual('Remove session');
    
    expect(_createSessionItemSpy).toHaveBeenCalled();
    expect(_createSessionDisplayBtnSpy).toHaveBeenCalled();
    expect(_createSessionRemoveBtnSpy).toHaveBeenCalled();
  });
  
});

describe('_createSessionItem()', () => {
  it(`should return an empty div with the class of "history-content-session-item"`, () => {
    const expectedSessionItemElement = document.createElement('div');
    expectedSessionItemElement.className = 'history-content-session-item';

    const createdSessionItemElement = sessionElement._createSessionItem();

    expect(createdSessionItemElement).toEqual(expectedSessionItemElement);
    expect(createdSessionItemElement.className).toEqual(expectedSessionItemElement.className);
  });
});

describe('_createTextElement(text)', () => {
  it('should return a <p> element containing the passed in text', () => {
    const textElement1 = sessionElement._createTextElement('some text');
    expect(textElement1.textContent).toEqual('some text');

    const textElement2 = sessionElement._createTextElement('some other text');
    expect(textElement2.textContent).toEqual('some other text');

    const textElement3 = sessionElement._createTextElement('');
    expect(textElement3.textContent).toEqual('');
  });
});

describe('_createSessionDisplayBtn(sessionID)', () => {
  it(`should create an <a> element with a href equal to "session.html?[sessionID]", a class of "btn btn-border-cta displaySessionBtn", and a textContent of "Display session"`, () => {
    const createdBtn = sessionElement._createSessionDisplayBtn(mockSessionData.sessionID);

    expect(createdBtn.tagName).toEqual('A');
    expect(createdBtn.getAttribute('href')).toEqual(`session.html?${mockSessionData.sessionID}`);
    expect(createdBtn.className).toEqual('btn btn-border-cta displaySessionBtn');
    expect(createdBtn.textContent).toEqual('Display session');
  });
});

describe('_createSessionRemoveBtn()', () => {
  it(`should create a <p> element with tabindex attribute equal to 9, a class of "delete-session text-danger removeSessionBtn", and a textContent of "Remove session"`, () => {
    const createdBtn = sessionElement._createSessionRemoveBtn();

    expect(createdBtn.tagName).toEqual('P');
    expect(createdBtn.getAttribute('tabindex')).toEqual('0');
    expect(createdBtn.className).toEqual('delete-session text-danger removeSessionBtn');
    expect(createdBtn.textContent).toEqual('Remove session');
  });
});