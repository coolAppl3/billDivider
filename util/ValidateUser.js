class ValidateUser {
  
  validateUsername(username) {
    // Username must be 5-24 characters long (both inclusive) and:
    // Must include at least one letter
    // Must not include any special characters
    // Must not include any whitespace
    
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]{4,24}$/;
    
    if(!re.test(username)) {
      return false;
    }

    return true;
  };

  
  
  validatePassword(password) {
    // Password must be 8-24 characters long (both inclusive) and:
    // Can accept dots and underscores
    // Must not include any other special characters
    // Must not include any whitespace
    
    const re = /^[a-zA-Z0-9_.]{8,24}$/;
    
    if(!re.test(password)) {
      return false;

    } else {
      return true;
    };
  };
};

module.exports = ValidateUser;

