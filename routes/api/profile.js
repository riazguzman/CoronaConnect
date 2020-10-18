const express = require("express");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route GET api/profile
// @desc Test route
// @access Public
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No Profile" });
    }
    res.send(profile);
  } catch (error) {
    res.status(400).send("Server errorr");
  }
});

module.exports = router;

// @route GET api/profile
// @desc Test route
// @access Public
router.post(
  "/",
  auth,
  [check("bio", "please enter a valid bio").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const userid = req.user.id;
    const bio = req.body.bio;

    try {
      let profile = await Profile.findOne({ user: userid });

      if (!profile) {
        profile = new Profile({
          user: userid,
          bio: bio,
        });

        await profile.save();
      } else if (profile) {
        profile = await Profile.findOneAndUpdate({ user: userid }, { bio });
        await profile.save();
      }
      res.send(profile);
    } catch (error) {
      res.send(error);
    }
  }
);
