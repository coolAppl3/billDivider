import Cookies from '../js/components/global/Cookies';

const cookies = new Cookies();

describe('get(cookieKey)', () => {
  it('should be a function', () => {
    expect(typeof cookies.get).toEqual('function');
  });

  it('should return undefined if a falsy argument is provided', () => {
    expect(cookies.get()).toBeUndefined();
    expect(cookies.get('')).toBeUndefined();
    expect(cookies.get(0)).toBeUndefined();
    expect(cookies.get(false)).toBeUndefined();
  });

  it('should return undefined if there are no cookies for the domain', () => {
    // Mocking no cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });

    expect(cookies.get('someCookie')).toBeUndefined();;
    expect(cookies.get('someOtherCookie')).toBeUndefined();;
  });

  it('should return undefined if the cookieKey argument is not available in the created cookieMap', () => {
    // Mocking a cookie
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'loginToken=dummyLoginToken; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/; someOtherKey=dummyValue; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/',
    });

    expect(cookies.get('nonExistentCookie')).toBeUndefined();
    expect(cookies.get('anotherNonExistentCookie')).toBeUndefined();
  });
  
  it('should return the value of the cookieKey from the created cookieMap', () => {
    // Mocking a cookie
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'loginToken=dummyLoginToken; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/; someOtherKey=dummyValue; expires=Thu, 25 Jan 2024 03:01:30 GMT; path=/',
    });

    expect(cookies.get('loginToken')).toEqual('dummyLoginToken');
    expect(cookies.get('someOtherKey')).toEqual('dummyValue');
  });
})

describe('set(cookieKey, cookieValue, ageMilliseconds)', () => {
  it('should be a function', () => {
    expect(typeof cookies.set).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(cookies.set('someKey', 'someValue', 'someAGe')).toBeUndefined();
    expect(cookies.set('someKey', 'someValue', '')).toBeUndefined();
    expect(cookies.set('someKey', 'someValue',)).toBeUndefined();
  });
  
  it('should set a cookie with no expiry date, which would be removed once the browser is closed, if the type of ageMilliseconds is not a number or is falsy', () => {
    // Mocking no cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });

    cookies.set('someKey', 'someValue', 0); //Even though 0 is a number, it's a falsy value, meaning the expiry date will not be setup.
    expect(window.document.cookie).toEqual('someKey=someValue; path=/');
  });

  it('should set a cookie with the desired age if a valid ageMilliseconds is passed in', () => {
    // Mocking no cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });

    cookies.set('someKey', 'someValue', 1209600000); // 14 days 

    // Mocking functionality, as the output changes every second
    const currentTimestamp = new Date().getTime();
    const cookieExpiryTimestamp = new Date(currentTimestamp + 1209600000)
    const cookieExpiryDate = cookieExpiryTimestamp.toUTCString();
    
    expect(window.document.cookie).toEqual(`someKey=someValue; expires=${cookieExpiryDate}; path=/`);
  });
})

describe('remove(cookieKey)', () => {
  it('should be a function', () => {
    expect(typeof cookies.remove).toEqual('function');
  });
  
  it('should always return undefined', () => {
    expect(cookies.remove('literallyAnything')).toBeUndefined();
    expect(cookies.remove('')).toBeUndefined();
    expect(cookies.remove(0)).toBeUndefined();
    expect(cookies.remove({})).toBeUndefined();
  });
  
  it('should remove a cookie with a key equal the passed in cookieKey', () => {
    // Mocking a cookie
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'someCookie=someValue; expires=Thu, 13 Jan 2024 00:00:00 UTC; path=/',
    });

    cookies.remove('someCookie');
    expect(window.document.cookie).toEqual('someCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/');
    // Browser will proceed with removing the cookie as soon as its date is in the past.
  });
  
})


describe('_createCookieMap()', () => {
  it('should be a function', () => {
    expect(typeof cookies._createCookieMap).toEqual('function');
  });
  
  it('should return undefined if there are no cookies set for the domain', () => {
    // Mocking no cookies
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: '',
    });
    
    expect(cookies._createCookieMap()).toBeUndefined();
  });
  
  it('should return a map of cookie keys and cookie values of all available cookies for the domain, as long as there are any', () => {
    // Mocking a cookie
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'loginToken=dummyLoginToken; someOtherKey=dummyValue',
    });

    const expectedMap = new Map();
    expectedMap.set('loginToken', 'dummyLoginToken');
    expectedMap.set('someOtherKey', 'dummyValue');

    expect(cookies._createCookieMap()).toEqual(expectedMap);
  });
})

describe('_setCookieExpiryDate(ageMilliseconds)', () => {
  it('should be a function', () => {
    expect(typeof cookies._setCookieExpiryDate).toEqual('function');
  });

  it('should return undefined if ageMilliseconds is falsy or not a number', () => {
    expect(cookies._setCookieExpiryDate(null)).toBeUndefined();
    expect(cookies._setCookieExpiryDate(undefined)).toBeUndefined();
    expect(cookies._setCookieExpiryDate('someString')).toBeUndefined();
    expect(cookies._setCookieExpiryDate('')).toBeUndefined();
    expect(cookies._setCookieExpiryDate('2345')).toBeUndefined();
    expect(cookies._setCookieExpiryDate(0)).toBeUndefined();
  });
  

  it('should take a valid ageMilliseconds, add it to with the current Date.now() timestamp, and create a full UTC string to represent an expiry date', () => {
    // Mocking functionality, as the output changes every second.
    const ageMilliseconds1 = 5000;
    const currentTimestamp1 = new Date().getTime();
    const cookieExpiryTimestamp1 = new Date(currentTimestamp1 + ageMilliseconds1)
    const cookieExpiryDate1 = cookieExpiryTimestamp1.toUTCString();
    
    expect(cookies._setCookieExpiryDate(5000)).toEqual(cookieExpiryDate1);

    // Mocking functionality, as the output changes every second.
    const ageMilliseconds2 = 150000;
    const currentTimestamp2 = new Date().getTime();
    const cookieExpiryTimestamp2 = new Date(currentTimestamp2 + ageMilliseconds2)
    const cookieExpiryDate2 = cookieExpiryTimestamp2.toUTCString();
    
    expect(cookies._setCookieExpiryDate(150000)).toEqual(cookieExpiryDate2);
  });
})


 
