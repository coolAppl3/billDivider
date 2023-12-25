function locateLoginToken() {
  let inLocalStorage = localStorage.getItem('loginToken');
  let inSessionStorage = sessionStorage.getItem('loginToken');

  // Prioritizes the value for localStorage. If it doesn't exist at all, it returns null.
  return inLocalStorage || inSessionStorage;
};

export default locateLoginToken;