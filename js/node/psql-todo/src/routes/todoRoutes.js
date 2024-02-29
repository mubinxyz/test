const { Router } = require("express");
const todoController = require("../controllers/todoControllers.js");
router.use(validateToken);

const router = Router();

router.use(validateToken);

router
  .get("/", todoController.getAllTodos)
  .post("/", todoController.createTodo);

router
  .get("/:id", todoController.getTodoById)
  .put("/:id", todoController.updateTodo)
  .delete("/:id", todoController.deleteTodo);

module.exports = router;
