const Validation = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = validateEducationInput = data => {
  let errors = {};

  let { from, school, degree, fieldofstudy } = data;

  from = !isEmpty(from) ? from : "";
  school = !isEmpty(school) ? school : "";
  degree = !isEmpty(degree) ? degree : "";
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : "";
  
  
  if (Validation.isEmpty(school)) {
    errors.school = "School field is required";
  }

  if (Validation.isEmpty(degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validation.isEmpty(from)) {
    errors.from = "From field is required";
  }

  if (Validation.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = "Field of Study field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
