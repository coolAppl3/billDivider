const generateLoginToken = require('../../util/generateLoginToken');

const User = require('../../models/User');
jest.mock('../../models/User');

afterEach(() => {
  jest.resetAllMocks();
});

describe('generateLoginToken()', () => {
  it(`should generate a 32-character long loginToken comprised of letters and numbers, excluding the uppercase and lowercase letter "O". It should then check if that loginToken is in use by calling User.findOne(). If the loginToken isn't in use, it should return the token`, async () => {
    User.findOne.mockResolvedValueOnce(null);

    const loginToken = await generateLoginToken();
    expect(User.findOne).toHaveBeenCalled();

    expect(typeof loginToken).toBe('string');
    expect(loginToken.length).toBe(32);
    expect(loginToken.indexOf('O')).toBe(-1);
    expect(loginToken.indexOf('o')).toBe(-1);
  });

  it(`should generate a 32-character long loginToken comprised of letters and numbers, excluding the uppercase and lowercase letter "O". It should then check if that loginToken is in use by calling User.findOne(). If the loginToken is in use, it should recursively generate a new loginToken and repeat the process until the generated loginToken is not in use, before returning it`, async () => {
    User.findOne.mockResolvedValueOnce({ mockProperty: 'mockData' }).mockResolvedValueOnce({ mockProperty: 'mockData' }).mockResolvedValueOnce({ mockProperty: 'mockData' }).mockResolvedValueOnce(null);

    const loginToken = await generateLoginToken();
    expect(User.findOne).toHaveBeenCalledTimes(4);

    expect(typeof loginToken).toBe('string');
    expect(loginToken.length).toBe(32);
    expect(loginToken.indexOf('O')).toBe(-1);
    expect(loginToken.indexOf('o')).toBe(-1);
  });
});
