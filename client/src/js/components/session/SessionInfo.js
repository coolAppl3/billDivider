class SessionInfo {
  constructor(sharedWith, currency) {
    this.sharedWith = sharedWith;
    this.currency = currency;
    this.isOwed = 0;
    this.owes = 0;
    this.billsPaid = [];
    this.billsToPay = [];
  }
};

const sessionInfo = new SessionInfo();


export default sessionInfo;