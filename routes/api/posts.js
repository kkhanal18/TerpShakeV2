const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Post");
const User = require("../../models/User");

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = User.findByIdSafe(req.user.id);
      const post = Post.create({
        user_id: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get("/", auth, (req, res) => {
  try {
    const posts = Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private
router.get("/:id", auth, (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.delete("/:id", auth, (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    Post.remove(req.params.id);
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put("/like/:id", auth, (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.some(like => like.user === req.user.id);
    if (alreadyLiked) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    const likes = Post.addLike(req.params.id, req.user.id);
    res.json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private
router.put("/unlike/:id", auth, (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const hasLiked = post.likes.some(like => like.user === req.user.id);
    if (!hasLiked) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    const likes = Post.removeLike(req.params.id, req.user.id);
    res.json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = User.findByIdSafe(req.user.id);
      const post = Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      const comments = Post.addComment(req.params.id, {
        user_id: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });
      res.json(comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete("/comment/:id/:comment_id", auth, (req, res) => {
  try {
    const result = Post.removeComment(
      req.params.id,
      req.params.comment_id,
      req.user.id
    );

    if (result === null) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    if (result === "unauthorized") {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
