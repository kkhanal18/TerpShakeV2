const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/me
// @desc  Get current user's profile
// @access Private
router.get("/me", auth, (req, res) => {
  try {
    const profile = Profile.findByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc  Create or update a user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company, website, location, bio, status, githubusername,
      skills, youtube, facebook, twitter, instagram, linkedin, avatar_link
    } = req.body;

    const skillsArray = typeof skills === "string"
      ? skills.split(",").map(s => s.trim())
      : skills;

    try {
      const profile = Profile.upsert(req.user.id, {
        company, website, location, bio, status, githubusername,
        skills: skillsArray, avatar_link,
        youtube, facebook, twitter, instagram, linkedin
      });
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile
// @desc  Get all profiles
// @access Public
router.get("/", (req, res) => {
  try {
    const profiles = Profile.findAll();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/user/:user_id
// @desc  Get profile by user id
// @access Public
router.get("/user/:user_id", (req, res) => {
  try {
    const profile = Profile.findByUserId(req.params.user_id);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile
// @desc  Delete profile, user & posts
// @access Private
router.delete("/", auth, (req, res) => {
  try {
    // Cascade delete via FK: deleting the user removes profile, posts, likes, comments
    User.remove(req.user.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/experience
// @desc  Add experience to a profile
// @access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    try {
      const profile = Profile.addExperience(req.user.id, {
        title, company, location, from, to, current, description
      });
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience from profile
// @access Private
router.delete("/experience/:exp_id", auth, (req, res) => {
  try {
    const profile = Profile.deleteExperience(req.user.id, req.params.exp_id);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/profile/education
// @desc  Add education to a profile
// @access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty()
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    try {
      const profile = Profile.addEducation(req.user.id, {
        school, degree, fieldofstudy, from, to, current, description
      });
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc  Delete education from profile
// @access Private
router.delete("/education/:edu_id", auth, (req, res) => {
  try {
    const profile = Profile.deleteEducation(req.user.id, req.params.edu_id);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
