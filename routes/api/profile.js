const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Test post route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route   GET api/profile
// @desc    Return user profile
// @access  Private

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      errors.noprofile = "You've not setup your profile";
      return res.status(404).json(errors);
    }
    return res.json(profile);
  });
});

module.exports = router;
