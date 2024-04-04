const generateSessionID = require('../../util/generateSessionID');

describe('generateSessionID()', () => {
  it(`should generate a 16-digit ID comprised of letters and numbers, excluding the uppercase and lowercase letter "o", then return the ID`, () => {
    for(let i = 0; i < 10; i++) {
      const generatedID = generateSessionID();

      expect(typeof generatedID).toBe('string');
      expect(generatedID.length).toBe(16);
      expect(generatedID.indexOf('O')).toBe(-1);
      expect(generatedID.indexOf('o')).toBe(-1);
    };
  });
});
