// validate name with specific error messages
export const validateName = name => {
  if (!name.trim()) {
    return 'Name is required.';
  }
 
  return '';  
};

// validate email with specific error messages
export const validateEmail = email => {
  if (!email.trim()) {
    return 'Email is required.';
  }
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';  
};

//  validate password with specific error messages
export const validatePassword = password => {
  if (!password.trim()) {
    return 'Password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return '';
};

//  check if passwords match with specific error message
export const passwordsMatch = (password, confirmPassword) => {
  if (!confirmPassword.trim()) {
    return 'Confirm password is required.';
  }
  if (password !== confirmPassword) {
    return 'The passwords do not match.';
  }
  return '';
};
