import addThousandComma from '../../../js/components/global/addThousandComma';

describe('addThousandComma(number)', () => {
  it('should return undefined if nothing is passed in', () => {
    expect(addThousandComma()).toBeUndefined();
  });

  it('should return undefined if the value passed in is falsy or not a type of number, unless 0 is passed in (more on that in the next test)', () => {
    expect(addThousandComma('string')).toBeUndefined();
    expect(addThousandComma({})).toBeUndefined();
    expect(addThousandComma(null)).toBeUndefined();
    expect(addThousandComma(undefined)).toBeUndefined();
  });

  it(`should return a string of '0.00' if 0 is passed in`, () => {
    expect(addThousandComma(0)).toBe('0.00');
  });

  it('should return always return a value that is a type of string if a valid number is passed in', () => {
    expect(typeof addThousandComma(1)).toBe('string');
    expect(typeof addThousandComma(0.5)).toBe('string');
    expect(typeof addThousandComma(-244)).toBe('string');
  });
  
  it('should properly insert a thousand comma, and add two decimal places at the end', () => {
    expect(addThousandComma(1000)).toBe('1,000.00');
    expect(addThousandComma(61.5)).toBe('61.50');
    expect(addThousandComma(123000.2)).toBe('123,000.20');
  });
});
