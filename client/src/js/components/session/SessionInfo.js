class SessionInfo {
  constructor() {
    this.sharedWith = undefined;
    this.currency = undefined;
    this.yourTotal = 0;
    this.sharedWithTotal = 0;
    this.billsPaid = [];
    this.billsToPay = [];

    this.createdOn = undefined;
    this.sessionID = undefined;

    this._loadEventListeners();
  }

  _loadEventListeners() {
    window.addEventListener('updateSessionInfo', this._updateSessionInfo.bind(this));
  };

  _updateSessionInfo() {
    this.yourTotal = this._calculateYourTotal();
    this.sharedWithTotal = this._calculateSharedWithTotal();
  };

  _calculateYourTotal() {
    let total = 0;

    for(let bill of this.billsPaid) {
      if(bill.directlyOwed) {
        total += bill.value;
        continue;
      };
      
      total += bill.splitValue;
    };

    return total;
  };

  _calculateSharedWithTotal() {
    let total = 0;
    
    for(let bill of this.billsToPay) {
      if(bill.directlyOwed) {
        total += bill.value;
        continue;
      };
      
      total += bill.splitValue;
    };

    return total;
  };

  set(session) {
    this.sharedWith = session.sharedWith;
    this.currency = session.currency;
    this.yourTotal = session.yourTotal;
    this.sharedWithTotal = session.sharedWithTotal;

    for(let bill of session.billsPaid) {
      this.billsPaid.push(bill);
    };

    for(let bill of session.billsToPay) {
      this.billsToPay.push(bill);
    };

    this.sessionID = session.sessionID;
    this.createdOn = session.createdOn;
  };

  reset() {
    this.yourTotal = 0;
    this.sharedWithTotal = 0;
    this.billsPaid = [];
    this.billsToPay = [];
  };

  isEmpty() {
    if(this.billsPaid.length === 0 && this.billsToPay.length === 0) {
      return true;
    };

    return false;
  };
};

const sessionInfo = new SessionInfo();


export default sessionInfo;