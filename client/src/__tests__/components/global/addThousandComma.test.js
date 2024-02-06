import addThousandComma from '../../../js/components/global/addThousandComma';

describe('addThousandComma(number)', () => {
  it('should be a function', () => {
    expect(typeof addThousandComma).toEqual('function');;
  });
  
  it('should return undefined if nothing is passed in', () => {
    expect(addThousandComma()).toEqual(undefined);
  });

  it('should return undefined if the value passed in is falsy or not a type of number, unless 0 is passed in', () => {
    expect(addThousandComma('string')).toEqual(undefined);
    expect(addThousandComma({})).toEqual(undefined);
    expect(addThousandComma(null)).toEqual(undefined);
    expect(addThousandComma(undefined)).toEqual(undefined);
  });

  it(`should return a string of '0.00' if 0 is passed in`, () => {
    expect(addThousandComma(0)).toEqual('0.00');
  });

  it('should return a string if a valid number is passed in', () => {
    expect(typeof addThousandComma(1)).toEqual('string');
    expect(typeof addThousandComma(0.5)).toEqual('string');
    expect(typeof addThousandComma(-244)).toEqual('string');
  });
  
  it('should properly insert a thousand comma, and add two decimal places at the end', () => {
    expect(addThousandComma(1000)).toEqual('1,000.00');
    expect(addThousandComma(61.5)).toEqual('61.50');
    expect(addThousandComma(123000.2)).toEqual('123,000.20');
  });
});
