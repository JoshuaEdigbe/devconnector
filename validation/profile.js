const Validation = require("validator");
const isEmpty = require("../validation/is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  let {
    handle,
    status,
    skills,
    website,
    twitter,
    youtube,
    facebook,
    instagram,
    linkedin
  } = data;

  handle = !isEmpty(handle) ? handle : "";
  status = !isEmpty(status) ? status : "";
  skills = !isEmpty(skills) ? skills : "";

  if (Validation.isEmpty(handle)) {
    errors.handle = "Status field is required";
  }

  if (!Validation.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 300 characters";
  }

  if (Validation.isEmpty(status)) {
    errors.status = "Status field is required";
  }

  if (Validation.isEmpty(skills)) {
    errors.skills = "Skills field is required";
  }

  if (!isEmpty(website)) {
    if (!Validation.isURL(website)) {
      errors.website = "Website URL is invalid";
    }
  }

  if (!isEmpty(youtube)) {
    if (!Validation.isURL(youtube)) {
      errors.youtube = "Youtube URL is invalid";
    }
  }

  if (!isEmpty(facebook)) {
    if (!Validation.isURL(facebook)) {
      errors.facebook = "Facebook URL is invalid";
    }
  }

  if (!isEmpty(twitter)) {
    if (!Validation.isURL(twitter)) {
      errors.twitter = "Twitter URL is invalid";
    }
  }

  if (!isEmpty(instagram)) {
    if (!Validation.isURL(instagram)) {
      errors.instagram = "Instagram URL is invalid";
    }
  }

  if (!isEmpty(linkedin)) {
    if (!Validation.isURL(linkedin)) {
      errors.linkedin = "Linkedin URL is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
