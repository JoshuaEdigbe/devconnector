const Validation = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  let {email, password} = data;


  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
