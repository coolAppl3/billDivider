import generateAPIKey from "../../../js/components/global/generateAPIKey";

describe('generateAPIKey()', () => {
  let mockAPIKey;

  beforeEach(() => {
    mockAPIKey = 'a5tZAgqE8sbF7Ddar5h9FmeA9MQCY1hmgKW3UgKpjiGbqJHWNmT8P8genEPvkcuq';
  });
  
  afterEach(() => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {},
    });

    mockAPIKey = null;
  });
  
  it(`should, if an APIKey exists in localStorage, which starts with an "a" and is 64-characters long, return said APIKey`, () => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: () => { return mockAPIKey; },
        setItem: () => {},
      },
    });

    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');

    expect(generateAPIKey()).toBe(mockAPIKey);
    expect(getItemSpy).toHaveBeenCalledWith('APIKey');
  });
  
  it(`should, if an APIKey exists in localStorage, but it either does not start with an "a" or is not 64-characters long, generate a new APIKey, add it to localStorage, then return it`, () => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: () => { return 'invalidAPIKey'; },
        setItem: () => {},
      },
    });

    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    const setItemSpy = jest.spyOn(window.localStorage, 'setItem');

    const newAPIKey = generateAPIKey();

    expect(newAPIKey.length).toBe(64);
    expect(newAPIKey.startsWith('a')).toBe(true);
    
    expect(getItemSpy).toHaveBeenCalledWith('APIKey');
    expect(setItemSpy).toHaveBeenCalledWith('APIKey', newAPIKey);
  });

  it(`should, if an APIKey does not exist in localStorage, generate a new APIKey, add it to localStorage, then return it`, () => {
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: () => { return null; },
        setItem: () => {},
      },
    });

    const getItemSpy = jest.spyOn(window.localStorage, 'getItem');
    const setItemSpy = jest.spyOn(window.localStorage, 'setItem');

    const newAPIKey = generateAPIKey();

    expect(newAPIKey.length).toBe(64);
    expect(newAPIKey.startsWith('a')).toBe(true);
    
    expect(getItemSpy).toHaveBeenCalledWith('APIKey');
    expect(setItemSpy).toHaveBeenCalledWith('APIKey', newAPIKey);
  });
});
