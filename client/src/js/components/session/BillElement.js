import addThousandComma from '../global/addThousandComma';

class BillElement {

  create(billItem) {
    const billDiv = this._createParentBillElement(billItem.id, billItem.billOwner);

    billDiv.appendChild(this._createBillNameElement(billItem.name));
    billDiv.appendChild(this._createBillValueElement(billItem.value));

    if(billItem.directlyOwed) {
      billDiv.appendChild(this._createDirectlyOwedTag(billItem.billOwner));
      billDiv.appendChild(this._createIconContainer());
      return billDiv;
    };
    
    billDiv.appendChild(this._createBillUnsharedElement(billItem.unshared));
    billDiv.appendChild(this._createBillSplitValueElement(billItem.splitValue));
    billDiv.appendChild(this._createIconContainer());

    return billDiv;
  };

  _createParentBillElement(billID, billOwner) {
    const billDiv = document.createElement('div');
    billDiv.className = 'bill';
    
    billDiv.setAttribute('data-id', billID);
    billDiv.setAttribute('data-bill-owner', billOwner);

    return billDiv;
  };

  _createBillNameElement(name) {
    const billName = document.createElement('p');
    billName.className = 'bill-name';
    billName.appendChild(document.createTextNode('Name: '));
    billName.appendChild(this._createSpanElement(name));

    return billName;
  };

  _createBillValueElement(value) {
    const billValue = document.createElement('p');
    billValue.className = 'bill-value';
    billValue.appendChild(document.createTextNode('Total value: '));
    billValue.appendChild(this._createSpanElement(addThousandComma(value)));

    return billValue;
  };

  _createBillUnsharedElement(unshared) {
    const billUnshared = document.createElement('p');
    billUnshared.className = 'bill-unshared';
    billUnshared.appendChild(document.createTextNode('Unshared: '));
    billUnshared.appendChild(this._createSpanElement(addThousandComma(unshared)));

    return billUnshared;
  };

  _createBillSplitValueElement(splitValue) {
    const billSplitValue = document.createElement('p');
    billSplitValue.className = 'bill-splitValue';
    billSplitValue.appendChild(document.createTextNode('Split value: '));
    billSplitValue.appendChild(this._createSpanElement(addThousandComma(splitValue)));

    return billSplitValue;
  };

  _createSpanElement(spanContent) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(spanContent));

    return span;
  };

  _createIconContainer() {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';

    const deleteIconDiv = document.createElement('div');
    deleteIconDiv.className = 'svg-div removeBillIcon';
    deleteIconDiv.setAttribute('title', 'Remove bill');
    deleteIconDiv.appendChild(this._createDeleteIconSVG());

    const editIconDiv = document.createElement('div');
    editIconDiv.className = 'svg-div editBillIcon';
    editIconDiv.setAttribute('title', 'Edit bill');
    editIconDiv.appendChild(this._createEditIconSVG());

    iconContainer.appendChild(deleteIconDiv);
    iconContainer.appendChild(editIconDiv);
    
    return iconContainer;
  };

  _createDeleteIconSVG() {
    const deleteIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    deleteIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    deleteIconSVG.setAttribute('viewBox', '0 0 448 512');
    deleteIconSVG.setAttribute('class', 'svg-icon');

    deleteIconSVG.appendChild(document.createTextNode(`<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->`));

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', 'M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z');

    deleteIconSVG.appendChild(pathElement);
    return deleteIconSVG;
  };

  _createEditIconSVG() {
    const editIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    editIconSVG.setAttribute('viewBox', '0 0 512 512');
    editIconSVG.setAttribute('class', 'svg-icon');

    editIconSVG.appendChild(document.createTextNode(`<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->`));

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', 'M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z');

    editIconSVG.appendChild(pathElement);
    return editIconSVG;
  };

  _createDirectlyOwedTag() {
    const toBeFullyPaidAlert = document.createElement('p');
    toBeFullyPaidAlert.className = 'directlyOwedTag';
    toBeFullyPaidAlert.appendChild(document.createTextNode('Directly owed'));

    return toBeFullyPaidAlert;
  };
};

export default BillElement;