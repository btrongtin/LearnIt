const Todo = require("../model/Todo");

class TodoController {
  getTodos = async (req, res) => {
    try {
      const post = req.params.id;
      const todos = await Todo.find({ post: post }).populate("post", ["title"]);
      res.json({ success: true, todos });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  //@route POST api/todo
  //@desc Create todo
  //@access Private
  createTodo = async (req, res) => {
    const { title, isCompleted } = req.body;

    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    try {
      const newTodo = new Todo({
        title,
        isCompleted: isCompleted || false,
        post: req.params.id,
        user: req.userId,
      });

      await newTodo.save();

      res.json({ success: true, message: "Add todo success!", todo: newTodo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  //   // @route PUT api/todo
  //   // @desc Update todo
  //   // @access Private
  updateTodo = async (req, res) => {
    // const { isCompleted } = req.body;

    // Simple validation
    // if (!title)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Title is required" });

    try {
      // let updatedTodo = {
      //   isCompleted: isCompleted || "false",
      // };

      //điều kiện để update
      const todoUpdateCondition = {
        post: { _id: req.params.idPost },
        _id: req.params.id,
        user: req.userId,
      };

      let updatedTodo = await Todo.findOneAndUpdate(
        todoUpdateCondition,
        [{ $set: { isCompleted: { $eq: [false, "$isCompleted"] } } }], //isCompleted = false => true, isCompleted = any valye => false
        { new: true } // sau khi update xong trả lại updatedpost
      );

      // User not authorised to update post or post not found
      //gửi request từ đâu đó, tài khoản ko có quyền update
      if (!updatedTodo)
        return res.status(401).json({
          success: false,
          message: "Todo not found or user not authorised",
        });

      res.json({
        success: true,
        message: "Update todo success!",
        todo: updatedTodo,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };

  //   // @route DELETE api/posts
  //   // @desc Delete post
  //   // @access Private
  deleteTodo = async (req, res) => {
    try {
      const todoDeleteCondition = {
        _id: req.params.id,
        user: req.userId,
        post: { _id: req.params.idPost },
      };
      const deletedTodo = await Todo.findOneAndDelete(todoDeleteCondition);

      // User not authorised or post not found
      if (!deletedTodo)
        return res.status(401).json({
          success: false,
          message: "Todo not found or user not authorised",
        });

      res.json({ success: true, message: "Deleted todo", todo: deletedTodo });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

module.exports = new TodoController();
