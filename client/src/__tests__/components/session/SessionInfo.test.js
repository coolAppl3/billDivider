import sessionInfo from "../../../js/components/session/SessionInfo";

afterEach(() => {
  jest.resetAllMocks();
  
  sessionInfo.sharedWith = undefined;
  sessionInfo.currency = undefined;
  sessionInfo.yourTotal = 0;
  sessionInfo.sharedWithTotal = 0;
  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];
  sessionInfo.billLimit = 100;

  sessionInfo.createdOn = undefined;
  sessionInfo.sessionID = undefined;
});

describe('_updateSessionInfo()', () => {
  it('should set yourTotal to the return value of _calculateYourTotal(), set sharedWithTotal to the return value of _calculateSharedWithTotal(), and return undefined', () => {
    const _calculateYourTotalSpy = jest.spyOn(sessionInfo, '_calculateYourTotal').mockImplementationOnce(() => { return 'mockYourTotalValue'; });
    const _calculateSharedWithTotalSpy = jest.spyOn(sessionInfo, '_calculateSharedWithTotal').mockImplementationOnce(() => { return 'mockSharedWithTotalValue'; });

    expect(sessionInfo._updateSessionInfo()).toBeUndefined();
    expect(_calculateYourTotalSpy).toHaveBeenCalled();
    expect(_calculateSharedWithTotalSpy).toHaveBeenCalled();

    expect(sessionInfo.yourTotal).toBe('mockYourTotalValue');
    expect(sessionInfo.sharedWithTotal).toBe('mockSharedWithTotalValue');
  });
});

describe('_calculateYourTotal()', () => {
  beforeEach(() => {
    jest.spyOn(sessionInfo, '_calculateYourTotal').mockImplementation(() => {
      let total = 0;

      for(let bill of sessionInfo.billsPaid) {
        if(bill.directlyOwed) {
          total += bill.value;
          continue;
        };
        
        total += bill.splitValue;
      };

      return total;
    });
  });
  
  it('should loop through sessionInfo.billsPaid and sum the total of their splitValues, then return that total', () => {
    const mockBill1 = { splitValue: 200 };
    const mockBill2 = { splitValue: 100 };

    sessionInfo.billsPaid.push(mockBill1);
    sessionInfo.billsPaid.push(mockBill2);

    expect(sessionInfo._calculateYourTotal()).toBe(300);
  });
  
  it('should, when encountering bills whose directlyOwed property is set to true, take their value instead of their splitValue', () => {
    const mockBill1 = { value: 200, splitValue: 100, directlyOwed: false };
    const mockBill2 = { value: 400, splitValue: 200, directlyOwed: true };

    sessionInfo.billsPaid.push(mockBill1);
    sessionInfo.billsPaid.push(mockBill2);

    expect(sessionInfo._calculateYourTotal()).toBe(500);
  });
});

describe('_calculateSharedWithTotal()', () => {
  beforeEach(() => {
    jest.spyOn(sessionInfo, '_calculateSharedWithTotal').mockImplementation(() => {
      let total = 0;

      for(let bill of sessionInfo.billsToPay) {
        if(bill.directlyOwed) {
          total += bill.value;
          continue;
        };
        
        total += bill.splitValue;
      };

      return total;
    });
  });
  
  it('should loop through sessionInfo.billsToPay and sum the total of their splitValues, then return that total', () => {
    const mockBill1 = { splitValue: 200 };
    const mockBill2 = { splitValue: 100 };

    sessionInfo.billsToPay.push(mockBill1);
    sessionInfo.billsToPay.push(mockBill2);

    expect(sessionInfo._calculateSharedWithTotal()).toBe(300);
  });
  
  it('should, when encountering bills whose directlyOwed property is set to true, take their value instead of their splitValue', () => {
    const mockBill1 = { value: 200, splitValue: 100, directlyOwed: false };
    const mockBill2 = { value: 400, splitValue: 200, directlyOwed: true };

    sessionInfo.billsToPay.push(mockBill1);
    sessionInfo.billsToPay.push(mockBill2);

    expect(sessionInfo._calculateSharedWithTotal()).toBe(500);
  });
});

describe('set(session)', () => {
  it('should set the properties of sessionInfo based on the session object passed in, and return undefined', () => {
    const mockSession = {
      sharedWith: 'John',
      currency: 'RSD',
      yourTotal: 200,
      sharedWithTotal: 100,
      billsPaid: [
        { mockProperty: 'mockValue' },
        { mockProperty: 'mockValue' },
      ],
      billsToPay: [
        { mockProperty: 'mockValue' },
        { mockProperty: 'mockValue' },
      ],
      sessionID: 'mockSessionID',
      createdOn: 'mockDate',
    };

    expect(sessionInfo.set(mockSession)).toBeUndefined();

    expect(sessionInfo.sharedWith).toBe('John');
    expect(sessionInfo.currency).toBe('RSD');
    expect(sessionInfo.yourTotal).toBe(200);
    expect(sessionInfo.sharedWithTotal).toBe(100);

    expect(sessionInfo.billsPaid).toEqual(mockSession.billsPaid);
    expect(sessionInfo.billsToPay).toEqual(mockSession.billsToPay);

    expect(sessionInfo.sessionID).toEqual(mockSession.sessionID);
    expect(sessionInfo.createdOn).toEqual(mockSession.createdOn);
  });
});

describe('revert(sessionReference)', () => {
  it('should set billsPaid and billsToPay to empty arrays, call set() with the sessionReference, then return undefined', () => {
    const mockSessionReference = { mockProperty: 'mockValue' };
    const setSpy = jest.spyOn(sessionInfo, 'set').mockImplementationOnce(() => {});

    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);
    sessionInfo.billsToPay.push(mockBill);

    expect(sessionInfo.revert(mockSessionReference)).toBeUndefined();
    expect(sessionInfo.billsPaid.length).toBe(0);
    expect(sessionInfo.billsToPay.length).toBe(0);
    expect(setSpy).toHaveBeenCalledWith(mockSessionReference);
  });
});


describe('reset()', () => {
  it('should reset set both totals to 0 and clear all the bills', () => {
    const mockBill = { splitValue: 200 };
    sessionInfo.billsPaid.push(mockBill);
    sessionInfo.billsToPay.push(mockBill);
    
    sessionInfo.yourTotal = 300;
    sessionInfo.sharedWithTotal = 200;

    expect(sessionInfo.reset()).toBeUndefined();

    expect(sessionInfo.yourTotal).toBe(0);
    expect(sessionInfo.sharedWithTotal).toBe(0);

    expect(sessionInfo.billsPaid).toEqual([]);
    expect(sessionInfo.billsToPay).toEqual([]);
  });
  
});

describe('isEmpty()', () => {
  it('should return true if there are no bill objects in sessionInfo.billsPaid and sessionInfo.billsToPay', () => {
    sessionInfo.billsPaid = [];
    sessionInfo.billsToPay = [];

    expect(sessionInfo.isEmpty()).toBe(true);
  });
  
  it('should return false if there are any bill objects in either sessionInfo.billsPaid or sessionInfo.billsToPay', () => {
    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);

    expect(sessionInfo.isEmpty()).toBe(false);
  });
});

describe('billLimitReached()', () => {
  it('should combine the total amount of bills, and if the total is equal to or higher than _billLimit, return true', () => {
    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);
    sessionInfo.billsToPay.push(mockBill);
    sessionInfo.billLimit = 2;

    expect(sessionInfo.billLimitReached()).toBe(true);
  });

  it('should combine the total amount of bills, and if the total is less than _billLimit, return false', () => {
    const mockBill = { mockProperty: 'mockValue' };
    sessionInfo.billsPaid.push(mockBill);
    sessionInfo.billsToPay.push(mockBill);
    sessionInfo.billLimit = 5;

    expect(sessionInfo.billLimitReached()).toBe(false);
  });
});