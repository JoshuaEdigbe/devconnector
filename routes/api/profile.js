const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile
// @desc    Return user profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "You've not setup your profile";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate user inputs
    const { errors, isValid } = validateProfileInput(req.body);

    // Return errors if the inputs are not valid
    if (!isValid) return res.status(400).json(errors);

    // Get fields from request object
    const user = req.user.id;
    const profileFields = {};

    profileFields.user = user;
    const {
      bio,
      skills,
      status,
      social,
      handle,
      company,
      website,
      youtube,
      twitter,
      facebook,
      linkedin,
      location,
      instagram,
      githubusername
    } = req.body;

    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;

    // Spplit Skills to Array
    if (skills !== "undefined") {
      profileFields.skills = skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;

    // Check if profile already exists
    Profile.findOne({ user }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check to see if handle already exist
        Profile.findOne({ handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile to DB
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "User don't have profile";
        res.status(400).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "User don't have profile";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/experience
// @desc    Add new experience
// @access  Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Validate user inputs
        const { errors, isValid } = validateExperienceInput(req.body);

        // Return errors if the inputs are not valid
        if (!isValid) return res.status(400).json(errors);

        // Add to experience array
        profile.experience.unshift({ ...req.body });
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/experience/:experience_id
// @desc    Delete experience by ID
// @access  Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const filteredExp = profile.experience.filter(
          experience => experience.id !== req.params.exp_id
        );
        profile.experience = filteredExp;
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/education
// @desc    Add new education
// @access  Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Validate user inputs
        const { errors, isValid } = validateEducationInput(req.body);

        // Return errors if the inputs are not valid
        if (!isValid) return res.status(400).json(errors);

        // Add to experience array
        profile.education.unshift({ ...req.body });
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/experience/:education_id
// @desc    Delete education by ID
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const filteredExp = profile.education.filter(
          education => education.id !== req.params.edu_id
        );
        profile.experience = filteredExp;
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);


module.exports = router;
