import addThousandComma from "./addThousandComma";

class BillElement {

  create(billItem) {
    const billDiv = this._createParentBillElement(billItem.id);

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

  _createParentBillElement(billID) {
    const billDiv = document.createElement('div');
    billDiv.className = 'bill';
    billDiv.setAttribute('data-id', billID);

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

    const editIcon = document.createElement('i');
    editIcon.className = 'fa-solid fa-pen-to-square editBillIcon';
    editIcon.setAttribute('title', 'Edit bill');

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash-can removeBillIcon';
    deleteIcon.setAttribute('title', 'Remove bill');

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);
    
    return iconContainer;
  };

  _createDirectlyOwedTag() {
    const toBeFullyPaidAlert = document.createElement('p');
    toBeFullyPaidAlert.className = 'directlyOwedTag';
    toBeFullyPaidAlert.appendChild(document.createTextNode('Directly owed'));

    return toBeFullyPaidAlert;
  };
};

export default BillElement;