const Post = require("../model/Post");

class PostController {
  getPosts = async (req, res) => {
    try {
      const posts = await Post.find({ user: req.userId }).populate("user", [
        "username",
      ]);
      res.json({ success: true, posts });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  //@route POST api/posts
  //@desc Create post
  //@access Private
  createPost = async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    try {
      const newPost = new Post({
        title,
        description,
        url: url.startsWith("https://") ? url : `https://${url}`,
        status: status || "TO LEARN",
        user: req.userId,
      });

      await newPost.save();

      res.json({ success: true, message: "Happy learning!", post: newPost });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  // @route PUT api/posts
  // @desc Update post
  // @access Private
  updatePost = async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    try {
      let updatedPost = {
        title,
        description: description || "",
        url: (url.startsWith("https://") ? url : `https://${url}`) || "",
        status: status || "TO LEARN",
      };

      //điều kiện để update
      const postUpdateCondition = { _id: req.params.id, user: req.userId };

      updatedPost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatedPost,
        { new: true } // sau khi update xong trả lại updatedpost
      );

      // User not authorised to update post or post not found
      //gửi request từ đâu đó, tài khoản ko có quyền update
      if (!updatedPost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });

      res.json({
        success: true,
        message: "Excellent progress!",
        post: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  // @route DELETE api/posts
  // @desc Delete post
  // @access Private
  deletePost = async (req, res) => {
    try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId };
      const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

      // User not authorised or post not found
      if (!deletedPost)
        return res.status(401).json({
          success: false,
          message: "Post not found or user not authorised",
        });

      res.json({ success: true, post: deletedPost });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}
// @route GET api/posts
// @desc Get posts
// @access Private
// const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({ user: req.userId }).populate("user", [
//       "username",
//     ]);
//     res.json({ success: true, posts });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// module.exports = { getPosts, createPost, updatePost, deletePost };
module.exports = new PostController();
