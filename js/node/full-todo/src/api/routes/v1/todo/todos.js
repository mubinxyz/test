const { Router } = require("express");

const router = Router();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.get("/:username", getUserTodos);

router.post("/:username", createTodoForUser);

router.post("/");

router.put("/:id", updateTodo);

router.delete(":/id", deleteTodo);

module.exports = router;
