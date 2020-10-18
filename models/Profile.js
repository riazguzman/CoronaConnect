const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  friends: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", profileSchema);
