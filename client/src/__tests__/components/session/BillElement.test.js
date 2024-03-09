import BillElement from "../../../js/components/session/BillElement";

import addThousandComma from "../../../js/components/global/addThousandComma";
jest.mock('../../../js/components/global/addThousandComma');

let mockBillItem;
let billElement;

let createSpy;
let _createParentBillElementSpy;
let _createBillNameElementSpy;
let _createBillValueElementSpy;
let _createBillUnsharedElementSpy;
let _createBillSplitValueElementSpy;
let _createSpanElementSpy;
let _createIconContainerSpy;
let _createDeleteIconSVGSpy;
let _createEditIconSVGSpy;
let _createDirectlyOwedTagSpy;

beforeEach(() => {
  billElement = new BillElement();

  mockBillItem = {
    id: "VNej9uwZAD",
    name: "mock bill",
    value: 500,
    unshared: 100,
    splitValue: 200,
    directlyOwed: false,
    billOwner: "main"
  };

  createSpy = jest.spyOn(billElement, 'create');
  _createParentBillElementSpy = jest.spyOn(billElement, '_createParentBillElement');
  _createBillNameElementSpy = jest.spyOn(billElement, '_createBillNameElement');
  _createBillValueElementSpy = jest.spyOn(billElement, '_createBillValueElement');
  _createBillUnsharedElementSpy = jest.spyOn(billElement, '_createBillUnsharedElement');
  _createBillSplitValueElementSpy = jest.spyOn(billElement, '_createBillSplitValueElement');
  _createSpanElementSpy = jest.spyOn(billElement, '_createSpanElement');
  _createIconContainerSpy = jest.spyOn(billElement, '_createIconContainer');
  _createDeleteIconSVGSpy = jest.spyOn(billElement, '_createDeleteIconSVG');
  _createEditIconSVGSpy = jest.spyOn(billElement, '_createEditIconSVG');
  _createDirectlyOwedTagSpy = jest.spyOn(billElement, '_createDirectlyOwedTag');
});

afterEach(() => {
  createSpy = null;
  _createParentBillElementSpy = null;
  _createBillNameElementSpy = null;
  _createBillValueElementSpy = null;
  _createBillUnsharedElementSpy = null;
  _createBillSplitValueElementSpy = null;
  _createSpanElementSpy = null;
  _createIconContainerSpy = null;
  _createDeleteIconSVGSpy = null;
  _createEditIconSVGSpy = null;
  _createDirectlyOwedTagSpy = null;

  mockBillItem = null;
  billElement = null;
  jest.resetAllMocks();
});

describe('create(billItem)', () => {
  it('should call a number of functions and return a billDiv element. If directlyOwed is false, _createDirectlyOwedTag() will not be called', () => {
    mockBillItem.directlyOwed = false;
    const billDiv = billElement.create(mockBillItem);

    // Verifying the entire element's values against the data provided will be done in UI testing
    expect(billDiv instanceof HTMLElement).toBeTruthy();

    expect(_createParentBillElementSpy).toHaveBeenCalledWith(mockBillItem.id, mockBillItem.billOwner);
    expect(_createBillNameElementSpy).toHaveBeenCalledWith(mockBillItem.name);
    expect(_createBillValueElementSpy).toHaveBeenCalledWith(mockBillItem.value);

    expect(_createDirectlyOwedTagSpy).not.toHaveBeenCalled();

    expect(_createBillUnsharedElementSpy).toHaveBeenCalledWith(mockBillItem.unshared);
    expect(_createBillSplitValueElementSpy).toHaveBeenCalledWith(mockBillItem.splitValue);
    expect(_createIconContainerSpy).toHaveBeenCalled();
  });

  it('should call a number of functions and return a billDiv element. If directlyOwed is true, _createDirectlyOwedTag() will be called, but _createBillUnsharedElement() and _createBillSplitValueElement() will not', () => {
    mockBillItem.directlyOwed = true;
    const billDiv = billElement.create(mockBillItem);

    // Verifying the entire element's values against the data provided will be done in UI testing
    expect(billDiv instanceof HTMLElement).toBeTruthy();

    expect(_createParentBillElementSpy).toHaveBeenCalledWith(mockBillItem.id, mockBillItem.billOwner);
    expect(_createBillNameElementSpy).toHaveBeenCalledWith(mockBillItem.name);
    expect(_createBillValueElementSpy).toHaveBeenCalledWith(mockBillItem.value);

    expect(_createDirectlyOwedTagSpy).toHaveBeenCalledWith(mockBillItem.billOwner);
    expect(_createIconContainerSpy).toHaveBeenCalled();

    expect(_createBillUnsharedElementSpy).not.toHaveBeenCalled();
    expect(_createBillSplitValueElementSpy).not.toHaveBeenCalled();
  });
});

describe('_createParentBillElement(billID, billOwner)', () => {
  it(`should create and return the parent billDiv element, assign it a "bill" class, set a "data-id" attribute equal to bilID, and set a "data-bill-owner" attribute equal to billOwner`, () => {
    const expectedBillDiv = document.createElement('div');
    expectedBillDiv.className = 'bill';

    expectedBillDiv.setAttribute('data-id', mockBillItem.billID);
    expectedBillDiv.setAttribute('data-bill-owner', mockBillItem.billOwner);

    expect(billElement._createParentBillElement(mockBillItem.billID, mockBillItem.billOwner)).toEqual(expectedBillDiv);
  });
});

describe('_createBillNameElement(name)', () => {
  it(`should create and return a <o> element, assign it a class of "bill-name", then create and append a span by calling _createSpanElement(name)`, () => {
    const expectedBillNameElement = document.createElement('p');
    expectedBillNameElement.className = 'bill-name';
    expectedBillNameElement.setAttribute('title', 'mock bill');
    expectedBillNameElement.innerHTML = 'Name: <span>mock bill</span>';
    
    expect(billElement._createBillNameElement(mockBillItem.name)).toEqual(expectedBillNameElement);
    expect(_createSpanElementSpy).toHaveBeenCalledWith(mockBillItem.name);
  });
});

describe('_createBillValueElement(value)', () => {
  it(`should create and return a <o> element, assign it a class of "bill-value", then create and append a span by calling _createSpanElement(addThousandComma(value))`, () => {
    const expectedBillValueElement = document.createElement('p');
    expectedBillValueElement.className = 'bill-value';
    expectedBillValueElement.setAttribute('title', 500);
    expectedBillValueElement.innerHTML = 'Total value: <span>500.00</span>';
    
    addThousandComma.mockImplementation(() => { return '500.00'; });

    expect(billElement._createBillValueElement(mockBillItem.value)).toEqual(expectedBillValueElement);
    expect(_createSpanElementSpy).toHaveBeenCalledWith(addThousandComma(mockBillItem.value));
  });
});

describe('_createBillUnsharedElement(unshared)', () => {
  it(`should create and return a <o> element, assign it a class of "bill-unshared", then create and append a span by calling _createSpanElement(addThousandComma(unshared))`, () => {
    const expectedBillUnsharedElement = document.createElement('p');
    expectedBillUnsharedElement.className = 'bill-unshared';
    expectedBillUnsharedElement.setAttribute('title', 100);
    expectedBillUnsharedElement.innerHTML = 'Unshared: <span>100.00</span>';
    
    addThousandComma.mockImplementation(() => { return '100.00'; });
    
    expect(billElement._createBillUnsharedElement(mockBillItem.unshared)).toEqual(expectedBillUnsharedElement);
    expect(_createSpanElementSpy).toHaveBeenCalledWith(addThousandComma(mockBillItem.unshared));
  });
});

describe('_createBillSplitValueElement(splitValue)', () => {
  it(`should create and return a <o> element, assign it a class of "bill-unshared", then create and append a span by calling _createSpanElement(addThousandComma(unshared))`, () => {
    const expectedBillSplitValueElement = document.createElement('p');
    expectedBillSplitValueElement.className = 'bill-splitValue';
    expectedBillSplitValueElement.setAttribute('title', 200);
    expectedBillSplitValueElement.innerHTML = 'Split value: <span>200.00</span>';
    
    addThousandComma.mockImplementation(() => { return '200.00'; });
    
    expect(billElement._createBillSplitValueElement(mockBillItem.splitValue)).toEqual(expectedBillSplitValueElement);
    expect(_createSpanElementSpy).toHaveBeenCalledWith(addThousandComma(mockBillItem.splitValue));
  });
});

describe('_createSpanElement(spanContent)', () => {
  it('should create and return a <span> element with the spanContent text appended to it', () => {
    const expectedSpanElement = document.createElement('span');
    expectedSpanElement.appendChild(document.createTextNode('some value'));

    expect(billElement._createSpanElement('some value')).toEqual(expectedSpanElement);
  });
});

describe('_createIconContainer()', () => {
  it('should create a div element, with two child div elements, both of which contain an svg element representing an icon. _createDeleteIconSVG() and _createEditIconSVG() should both be called once', () => {
    const iconContainer = billElement._createIconContainer();
    expect(iconContainer.className).toBe('icon-container');
    
    const firstChild = iconContainer.firstElementChild;
    expect(firstChild.className).toBe('svg-div removeBillIcon');
    expect(firstChild.getAttribute('title')).toBe('Remove bill');
    expect(firstChild.firstElementChild.nodeName).toBe('svg');
    expect(_createDeleteIconSVGSpy).toHaveBeenCalled();
    
    const secondChild = iconContainer.lastElementChild;
    expect(secondChild.className).toBe('svg-div editBillIcon');
    expect(secondChild.getAttribute('title')).toBe('Edit bill');
    expect(secondChild.firstElementChild.nodeName).toBe('svg');
    expect(_createEditIconSVGSpy).toHaveBeenCalled();
  });
});

describe('_createDeleteIconSVG()', () => {
  it('should return an svg displaying a Font Awesome trash icon to represent a delete icon', () => {
    const expectedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expectedSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expectedSVG.setAttribute('viewBox', '0 0 448 512');
    expectedSVG.setAttribute('class', 'svg-icon');
    
    expectedSVG.innerHTML = `&lt;!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--&gt;<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>`;

    expect(billElement._createDeleteIconSVG()).toEqual(expectedSVG);
  });
});

describe('_createEditIconSVG()', () => {
  it('should return an svg displaying a Font Awesome trash icon to represent a delete icon', () => {
    const expectedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expectedSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expectedSVG.setAttribute('viewBox', '0 0 512 512');
    expectedSVG.setAttribute('class', 'svg-icon');
    
    expectedSVG.innerHTML = `&lt;!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--&gt;<path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"></path>`;

    expect(billElement._createEditIconSVG()).toEqual(expectedSVG);
  });
});

describe('_createDirectlyOwedTag()', () => {
  it(`should create a <p> element with a class of "directlyOwedTag" and a textContent of "Directly owed"`, () => {
    const expectedTagElement = document.createElement('p');
    expectedTagElement.className = 'directlyOwedTag';
    expectedTagElement.appendChild(document.createTextNode('Directly owed'));

    expect(billElement._createDirectlyOwedTag()).toEqual(expectedTagElement);
  });
});