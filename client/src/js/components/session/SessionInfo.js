class SessionInfo {
  constructor(sharedWith, currency) {
    this.sharedWith = sharedWith;
    this.currency = currency;
    this.yourTotal = 0;
    this.sharedWithTotal = 0;
    this.billsPaid = [];
    this.billsToPay = [];

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
    
    this.billsPaid.forEach((bill) => {
      total += bill.splitValue;
    });

    return total;
  };

  _calculateSharedWithTotal() {
    let total = 0;
    
    this.billsToPay.forEach((bill) => {
      total += bill.splitValue;
    });

    return total;
  };
};

const sessionInfo = new SessionInfo();


export default sessionInfo;