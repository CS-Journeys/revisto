// Password Stength Checker
export const PasswordErrorCheck = (password) => {
  let error = "";
  if (password.length < 8) {
    error = "Password must be at least 8 characters long";
  }
  if (password.search(/[a-z]/) < 0) {
    error = "Password must contain at least one lowercase letter";
  }
  if (password.search(/[A-Z]/) < 0) {
    error = "Password must contain at least one uppercase letter";
  }
  if (password.search(/[0-9]/) < 0) {
    error = "Password must contain at least one number";
  }
  return error;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}