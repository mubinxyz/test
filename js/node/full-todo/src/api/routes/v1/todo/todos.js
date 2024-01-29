const { Router } = require("express");

const {
  getTodos,
  getTodoById,
  getUserTodos,
  createTodoForUser,
  updateTodo,
  deleteTodo,
} = require("../../../../services/todos");

const router = Router();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.get("/:username", getUserTodos);

router.post("/:username", createTodoForUser);

router.put("/:id", updateTodo);

router.delete(":/id", deleteTodo);

module.exports = router;
