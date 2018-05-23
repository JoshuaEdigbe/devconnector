const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bycrypt = require('bcryptjs');


// Load User Model

const User = require('../../models/User')


// @route   GET api/users/test
// @desc    Test post route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: "user works" }));


// @route   GET api/users/register
// @desc    Test post route
// @access  Public

router.post('/register', (req, res) => {
  const { email, password, name } = req.body,
    avatar = gravatar.url(email, {
      s: '200', //Size
      r: 'pg', // Rating
      d: 'mm' // Default
    });

  // Check if user exists
  User.findOne({ email })
    .then(user => {
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
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    });
});

module.exports = router;