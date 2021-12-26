const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const postController = require("../controllers/posts");

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/", verifyToken, postController.getPosts);

//@route POST api/posts
//@desc Create post
//@access Private
router.post("/", verifyToken, postController.createPost);

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, postController.updatePost);

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;
