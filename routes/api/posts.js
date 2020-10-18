const express = require("express");
const Posts = require("../../models/Posts");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { validationResult } = require("express-validator");

const router = express.Router();

// @route GET api/posts
// @desc Test route
// @access Public
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    const user = await User.findById(userId);
    const { name } = user;

    const { title, text } = req.body;

    const post = new Posts({
      user: userId,
      title,
      text,
      name,
    });

    await post.save();
    res.send("here");
  } catch (error) {
    res.send("server errorrrr");
  }
});

// @route GET api/posts
// @desc Test route
// @access Public

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errrrror");
  }
});

// @route GET api/posts
// @desc Test route
// @access Public

router.delete("/", auth, async (req, res) => {
  try {
    await Posts.findOneAndDelete({ _id: req.body.id });
    res.json("done");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errrrror");
  }
});

module.exports = router;
