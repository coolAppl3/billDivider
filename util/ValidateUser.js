class ValidateUser {

  validateUsername(username) {
    // Username must contain at least 5, but no more than 24, characters. It also must have at least 1 letter, and must not contain any special characters or whitespace.
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/;
    
    if(username.length < 5) {
      return false;
  
    } else if(username.length > 24) {
      return false;
  
    } else if(!re.test(username)) {
      return false;
  
    } else {
      return true;
    };
  };
  
  validatePassword(password) {
    // Password must contain at least 8, but no more than 24, characters. It also must not contain any whitespace.
    const re = /^\S*$/;
    
    if(password.length < 8) {
      return false;
  
    } else if(password.length > 24) {
      return false;
  
    } else if(!re.test(password)) {
      return false;
  
    } else {
      return true;
    };
  };
};

module.exports = ValidateUser;

