class ValidateUser {
  validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return re.test(email);
  };
  
  validateUsername(username) {
    // Username must be 5-24 characters long (both inclusive) and:
    // Must include at least one letter
    // Must not include any special characters
    // Must not include any whitespace
    
    const re = /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]{4,24}$/;
    return re.test(username);
  };
  
  validatePassword(password) {
    // Password must be 8-40 characters long (both inclusive) and:
    // Can accept dots and underscores
    // Must not include any other special characters
    // Must not include any whitespace
    
    const re = /^[a-zA-Z0-9_.]{8,40}$/;
    return re.test(password);
  };
};

module.exports = ValidateUser;

