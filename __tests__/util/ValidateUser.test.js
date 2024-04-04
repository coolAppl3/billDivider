const ValidateUser = require('../../util/ValidateUser');

let validateUser;

beforeEach(() => {
  validateUser = new ValidateUser();
});

afterEach(() => {
  validateUser = null;
});

describe('validateEmail(email)', () => {
  it('should validate the email string passed in, and return false if it is invalid', () => {
    expect(validateUser.validateEmail('invalid@@example.com')).toBe(false);
  });
  
  it('should validate the email string passed in, and return true if it is valid', () => {
    expect(validateUser.validateEmail('valid@exmaple.com')).toBe(true);
    expect(validateUser.validateEmail('valid@exmaple.co.uk')).toBe(true);
  });
});

describe('validateUsername(username)', () => {
  it('should validate the username string passed in, and return false if it is invalid', () => {
    expect(validateUser.validateUsername('invalid username')).toBe(false);
    expect(validateUser.validateUsername('asd')).toBe(false);
    expect(validateUser.validateUsername('invalid-username')).toBe(false);
  });
  
  it('should validate the username string passed in, and return true if it is valid', () => {
    expect(validateUser.validateUsername('validUsername')).toBe(true);
    expect(validateUser.validateUsername('valid123')).toBe(true);
  });
});

describe('validatePassword(username)', () => {
  it('should validate the password string passed in, and return false if it is invalid', () => {
    expect(validateUser.validatePassword('invalid password')).toBe(false);
    expect(validateUser.validatePassword('asdef')).toBe(false);
    expect(validateUser.validatePassword('invalid-password')).toBe(false);
  });
  
  it('should validate the password string passed in, and return true if it is valid', () => {
    expect(validateUser.validatePassword('validPassword')).toBe(true);
    expect(validateUser.validatePassword('veryLongValidPassword')).toBe(true);
  });
});