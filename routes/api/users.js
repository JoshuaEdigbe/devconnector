const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bycrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/User");

// @route   GET api/users/register
// @desc    Register post route
// @access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { email, password, name } = req.body,
    avatar = gravatar.url(email, {
      s: "200", //Size
      r: "pg", // Rating
      d: "mm" // Default
    });

  // Check if user exists
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ email: "Email already exists" });

    const newUser = new User({
      avatar,
      email,
      password,
      name
    });

    // Encrypt Password and Save to DB
    bycrypt.genSalt(10, (err, salt) => {
      bycrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => res.status(404).json(err));
      });
    });
  });
});

// @route   GET api/users/login
// @desc    Login post route
// @access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email }).then(user => {
    //Check if user exist
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    //Check if password is correct
    bycrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Password not correct";
        return res.status(400).json(errors);
      }

      // Sign Token
      const payload = { ...user };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        return res.json({
          sucess: true,
          token: "Bearer " + token
        });
      });
    });
  });
});

// @route   GET api/users/current
// @desc    Test route authentication
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "success" });
  }
);

module.exports = router;
