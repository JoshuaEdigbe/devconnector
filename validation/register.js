const Validation = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  let { name, email, password, confirmPassword } = data;

  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? password : "";

  if (!Validation.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 300 characters";
  }

  if (Validation.isEmpty(email)) {
    errors.email = "Email field is required";
  }

  if (!Validation.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (Validation.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  if (!Validation.isLength(password, {min: 6, max: 30})) {
    errors.password = "Password length must be between 6 and 30";
  }

  if (Validation.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirmed Password is required";
  }

  if (!Validation.equals(password, confirmPassword)) {
    errors.confirmPassword = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
