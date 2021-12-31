const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const todoController = require("../controllers/todo");

// @route GET api/posts
// @desc Get posts
// @access Private
router.get("/:id", verifyToken, todoController.getTodos);

//@route POST api/posts
//@desc Create post
//@access Private
router.post("/:id", verifyToken, todoController.createTodo);

// @route PUT api/todo
// @desc Update todo
// @access Private
router.put("/:idPost/:id", verifyToken, todoController.updateTodo);

// @route DELETE api/todo
// @desc Delete todo
// @access Private
router.delete("/:idPost/:id", verifyToken, todoController.deleteTodo);

module.exports = router;
