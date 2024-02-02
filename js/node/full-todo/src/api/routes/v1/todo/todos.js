const { Router } = require("express");

const {
  getTodos,
  getTodoById,
  createTodoForUser,
  updateTodo,
  deleteTodo,
} = require("../../../../services/todos.service");

const router = Router();

router.use((req, res, next) => {
  req.user ? next() : res.send(401);
});

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/:username", createTodoForUser);

router.put("/:id", updateTodo);

router.delete(":/id", deleteTodo);

module.exports = router;
