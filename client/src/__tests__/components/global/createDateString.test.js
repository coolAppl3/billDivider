import createDateString from "../../../js/components/global/createDateString";

describe('createDateString(timestampMilliseconds)', () => {
  it('should be a function', () => {
    expect(typeof createDateString).toEqual('function');
  });
  
  it('should return undefined if the passed in timestampMilliseconds is not a type of number', () => {
    expect(createDateString('17235234')).toBeUndefined();
    expect(createDateString('')).toBeUndefined();
    expect(createDateString({})).toBeUndefined();
    expect(createDateString([])).toBeUndefined();
  });
  
  it('should return a date string in the following format (6 Aug 2024)', () => {
    expect(createDateString(1705576574000)).toEqual('18 Jan 2024');
    expect(createDateString(1703330174000)).toEqual('23 Dec 2023');
    expect(createDateString(0)).toEqual('1 Jan 1970');
  });
});
