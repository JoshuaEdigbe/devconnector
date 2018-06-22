const express = require("express");
const passport = require("passport");
const router = express.Router();

// Load models
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// Load Validation
const validatePostInput = require("../../validation/post");

// @route   POST api/posts
// @desc    Create post route
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    const { text, name, avatar } = req.body;

    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text,
      name,
      avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/posts/
// @desc    Return all posts
// @access  Private

router.get("/", (req, res) => {
  let errors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (!posts) {
        errors.nopostfound = "No post found";
        return res.status(400).json(errors);
      }
      return res.json(posts);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/:post_id
// @desc    Return post by post ID
// @access  Private

router.get("/:post_id", (req, res) => {
  let errors = {};
  Post.findById(req.params.post_id)
    .then(post => {
      if (!post) {
        errors.nopost = "You don't have any post with that ID";
        return res.status(400).json(errors);
      }
      return res.json(post);
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/:post_id
// @desc    Delete post by post ID
// @access  Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profile => {
      // console.log(profile);

      if (!profile) {
        return res
          .status(400)
          .json({ nopostonprofile: "You don't have any post on this post" });
      }

      Post.findById(req.params.post_id).then(post => {
        if (post.user.toString() !== req.user.id) {
          errors.unauthorized = "You're not authorized to delete this post";
          return res.status(401).json(errors);
        }

        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json(err));
      });
    });
  }
);


// @route   POST api/posts/like/:post_id
// @desc    Like a post
// @access  Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Profile.findOne({ user: req.user.id }).then(profile => {
     
    // });
    Post.findById(req.params.post_id)
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user.id });
      post.save().then(post => res.json(post));
    });
   
  }
);


// @route   POST api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Profile.findOne({ user: req.user.id }).then(profile => {
     
    // });
    Post.findById(req.params.post_id)
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: "You've not liked this post" });
      }

      // Filter user out of post likes array
      post = post.likes.filter(like => like.user.toString() !== req.user.id)
      
      post.save().then(post => res.json(post));
    });
   
  }
);

module.exports = router;
