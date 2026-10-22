export const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  wrongPassword: { username: 'standard_user', password: 'wrong_password' },
};

export const errors = {
  usernameRequired: 'Epic sadface: Username is required',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  credentialsMismatch: 'Epic sadface: Username and password do not match any user in this service',
  notLoggedIn: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
};

export const checkoutInfo = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};
