class BillElement {

  create(billItem) {
    const billDiv = this._createParentBillElement();

    billDiv.appendChild(this._createBillNameElement(billItem.name));
    billDiv.appendChild(this._createBillValueElement(billItem.value));
    billDiv.appendChild(this._createBillUnsharedElement(billItem.unshared));
    billDiv.appendChild(this._createBillSplitValueElement(billItem));

    return billDiv;

    // const billName = this._createBillNameElement();
    // const billValue = this._createBillValueElement();
    // const billUnshared = this._createBillUnsharedElement();
    // const billSplitValue = this._createBillSplitValueElement();

    
  };

  _createParentBillElement() {
    const billDiv = document.createElement('div');
    billDiv.className = 'bill';

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
    billValue.appendChild(this._createSpanElement(value));

    return billValue;
  };

  _createBillUnsharedElement(unshared) {
    const billUnshared = document.createElement('p');
    billUnshared.className = 'bill-unshared';
    billUnshared.appendChild(document.createTextNode('Unshared: '));
    billUnshared.appendChild(this._createSpanElement(unshared));

    return billUnshared;
  };

  _createBillSplitValueElement(billItem) {
    const billSplitValue = document.createElement('p');
    billSplitValue.className = 'bill-splitValue';
    billSplitValue.appendChild(document.createTextNode('Split value: '));

    const calculatedSplitValue = (billItem.value - billItem.unshared) / 2;
    billSplitValue.appendChild(this._createSpanElement(calculatedSplitValue));

    return billSplitValue;
  };

  _createSpanElement(spanContent) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(spanContent));

    return span;
  };
};

export default BillElement;