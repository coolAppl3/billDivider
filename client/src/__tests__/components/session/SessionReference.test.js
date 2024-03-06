import SessionReference from "../../../js/components/session/SessionReference";

import sessionInfo from "../../../js/components/session/SessionInfo";
jest.mock('../../../js/components/session/SessionInfo');

beforeEach(() => {
  delete window.sessionStorage;
  Object.defineProperty(window, 'sessionStorage', {
    writable: true,
    value: {
      setItem: () => {},
      getItem: () => {},
    },
  });
});

afterEach(() => {
  jest.resetAllMocks();

  sessionInfo.sharedWith = undefined;
  sessionInfo.currency = undefined;
  sessionInfo.yourTotal = 0;
  sessionInfo.sharedWithTotal = 0;
  sessionInfo.billsPaid = [];
  sessionInfo.billsToPay = [];

  sessionInfo.createdOn = undefined;
  sessionInfo.sessionID = undefined;
});

describe('set(session)', () => {
  it('should serialize a deep copy of the object passed in, store it in sessionStorage, and then return undefined', () => {
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'setItem');

    const mockSession = { mockProperty: 'mockValue' };
    const serializedCopy = JSON.parse(JSON.stringify(mockSession));

    expect(SessionReference.set(mockSession)).toBeUndefined();
    expect(sessionStorageSpy).toHaveBeenCalledWith('originalSessionReference', JSON.stringify(serializedCopy));
  });
});

describe('changesMade()', () => {
  it(`should fetch "originalSessionReference" from sessionSTorage, then compare it against a serialized version of sessionInfo. If they're not equal, it should return true`, () => {
    const mockSession = { mockProperty: 'mockValue' };
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return mockSession; });;

    expect(SessionReference.changesMade()).toBe(true);
    expect(sessionStorageSpy).toHaveBeenCalledWith('originalSessionReference');
  });
  
  it(`should fetch "originalSessionReference" from sessionSTorage, then compare it against a serialized version of sessionInfo. If they're equal, it should return false`, () => {
    const sessionStorageSpy = jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => { return JSON.stringify(sessionInfo); });;

    expect(SessionReference.changesMade()).toBe(false);
    expect(sessionStorageSpy).toHaveBeenCalledWith('originalSessionReference');
  });
});
