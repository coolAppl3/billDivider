import locateLoginToken from "../../../js/components/global/locateLoginToken";


describe('locateLoginToken()', () => {
  it('should be a function', () => {
    expect(typeof locateLoginToken).toEqual('function');
  });
  
  it('should return undefined if the browser does not have a login token', () => {
    // Mocking the lack of a login token in cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });
    
    expect(locateLoginToken()).toBeUndefined();
  });
  
  it('should return the login token if one exists in the browser', () => {
    // Mocking a login token in cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'loginToken=dummyLoginToken; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/; someOtherKey=dummyValue; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/',
    });
    
    expect(locateLoginToken()).toEqual('dummyLoginToken');
  });
});
