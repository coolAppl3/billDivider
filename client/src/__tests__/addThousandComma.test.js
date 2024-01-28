import addThousandComma from '../js/components/global/addThousandComma';

describe('addThousandComma', () => {
  it('should be a function', () => {
    expect(typeof addThousandComma).toEqual('function');;
  });
  
  it('should return undefined if nothing is passed in', () => {
    expect(addThousandComma()).toEqual(undefined);
  });

  it('should return undefined if the value passed in is not a number', () => {
    expect(addThousandComma('string')).toEqual(undefined);
    expect(addThousandComma({})).toEqual(undefined);
    expect(addThousandComma(null)).toEqual(undefined);
  });

  it('should return a string', () => {
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
