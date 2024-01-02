import addThousandComma from "./addThousandComma";

class BillElement {

  create(billItem) {
    const billDiv = this._createParentBillElement(billItem.id);

    billDiv.appendChild(this._createBillNameElement(billItem.name));
    billDiv.appendChild(this._createBillValueElement(billItem.value));
    billDiv.appendChild(this._createBillUnsharedElement(billItem.unshared));
    billDiv.appendChild(this._createBillSplitValueElement(billItem.splitValue));

    return billDiv;

    // const billName = this._createBillNameElement();
    // const billValue = this._createBillValueElement();
    // const billUnshared = this._createBillUnsharedElement();
    // const billSplitValue = this._createBillSplitValueElement();

    
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
};

export default BillElement;