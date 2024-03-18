const { Router } = require("express");
const todoController = require("../controllers/todoController.js");
const validateToken = require("../middleware/validateTokenHandler.js");
const {
  validateCreateTodo,
} = require("../validation/validation.createTodo.js");
const {
  validateUpdateTodo,
} = require("../validation/validation.updateTodo.js");
const {
  validateDeleteTodo,
} = require("../validation/validation.deleteTodo.js");
const {
  validateGetTodoById,
} = require("../validation/validation.getTodoById.js");

const router = Router();

router.use(validateToken);

router
  .get("/", todoController.getAllTodos)
  .post("/", validateCreateTodo, todoController.createTodo);

router
  .get("/:id", validateGetTodoById, todoController.getTodoById)
  .put("/:id", validateUpdateTodo, todoController.updateTodo)
  .delete("/:id", validateDeleteTodo, todoController.deleteTodo);

module.exports = router;
