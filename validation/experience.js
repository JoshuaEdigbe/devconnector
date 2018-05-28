const Validation = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  let { from, title, company } = data;

  from = !isEmpty(from) ? from : "";
  title = !isEmpty(title) ? title : "";
  company = !isEmpty(company) ? company : "";

  
  if (Validation.isEmpty(title)) {
    errors.title = "Title field is required";
  }

  if (Validation.isEmpty(company)) {
    errors.company = "Company field is required";
  }

  if (Validation.isEmpty(from)) {
    errors.from = "From field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
