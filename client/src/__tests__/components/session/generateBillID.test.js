import generateBillID from "../../../js/components/session/generateBillID";

// Allowed characters: [abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789] -  uppercase/lowercase "O" not allowed

describe('generateBillID()', () => {
  it('should generate and return a 10-character-long random bill ID that is a type of string', () => {
    const generatedBill = generateBillID();
    expect(generatedBill.length).toBe(10);
    expect(typeof generatedBill).toBe('string');
  });

  it('should not include an uppercase/lowercase letter O', () => {
    expect(generateBillID().includes('o')).toBeFalsy();
    expect(generateBillID().includes('O')).toBeFalsy();
    expect(generateBillID().includes('o')).toBeFalsy();
    expect(generateBillID().includes('O')).toBeFalsy();
    expect(generateBillID().includes('o')).toBeFalsy();
    expect(generateBillID().includes('O')).toBeFalsy();
    expect(generateBillID().includes('o')).toBeFalsy();
    expect(generateBillID().includes('O')).toBeFalsy();
    expect(generateBillID().includes('o')).toBeFalsy();
    expect(generateBillID().includes('O')).toBeFalsy();
  });
});