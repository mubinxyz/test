const { Router } = require("express");

const {
  getTodos,
  getTodoById,
  createTodoForUser,
  updateTodo,
  deleteTodo,
} = require("../../../../services/todos");

const router = Router();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/:username", createTodoForUser);

router.put("/:id", updateTodo);

router.delete(":/id", deleteTodo);

module.exports = router;
