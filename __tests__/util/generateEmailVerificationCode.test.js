const generateEmailVerificationCode = require('../../util/generateEmailVerificationCode');

describe('generateEmailVerificationCode()', () => {
  it('should generate a 6 digit code comprised of numbers and letters, but not containing the letter O or the number 0, then return that code', () => {
    for(let i = 0; i < 10; i++) {
      const generatedCode = generateEmailVerificationCode();
      
      expect(typeof generatedCode).toBe('string');
      expect(generatedCode.length).toBe(6);
      expect(generatedCode.indexOf('O')).toBe(-1);
      expect(generatedCode.indexOf('0')).toBe(-1);
    };
  });
});
