const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const Post = require("../model/Post");
const mongoose = require("mongoose");

// @route GET api/statistic
// @desc Get posts and statistic
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const postsAmount = await Post.countDocuments({
      user: req.userId,
    }).populate("user", ["username"]);

    // { $match: { user: req.userId } },
    let id = mongoose.Types.ObjectId(req.userId);
    const postsByType = await Post.aggregate([
      { $match: { user: id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json({ success: true, postsAmount, postsByType });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
