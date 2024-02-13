import locateLoginToken from "../../../js/components/global/locateLoginToken";


describe('locateLoginToken()', () => {
  it('should return undefined if the browser cookies are empty', () => {
    // Mocking browser cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });
    
    expect(locateLoginToken()).toBeUndefined();
  });

  it(`should return undefined if the browser cookies do not have a "loginToken" cookies `, () => {
    // Mocking browser cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'someRandomCookie=dummyValue; expires=Thu, 25 Jan 2050 03:01:30 GMT; path=/',
    });
    
    expect(locateLoginToken()).toBeUndefined();
  });
  
  it('should return the login token if one exists in the browser', () => {
    // Mocking browser cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'loginToken=dummyLoginToken; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/; someOtherKey=dummyValue; expires=Thu, 25 Jan 2050 03:01:30 GMT; path=/',
    });
    
    expect(locateLoginToken()).toEqual('dummyLoginToken');
  });
});
