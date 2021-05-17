export const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const validatePassword = (password) => {
  if (password.length < 6) {
    return 'Password should not be less than 6 characters';
  }
  if (!new RegExp(/[a-zA-Z]/).test(password)) {
    return 'Password is missing letters';
  }
  if (!new RegExp(/[A-Z]/).test(password)) {
    return 'Password is missing capital letter';
  }
  if (!new RegExp(/[0-9]/).test(password)) {
    return 'Password is missing numbers';
  }
  if (!new RegExp(/[$-/\\:-?{-~!"^_`@#[\]]/).test(password)) {
    return 'Password is missing symbols, e.g. [ $-/:-?( ) { }~!"^_`@#[ ] ]';
  }

  return true;
}