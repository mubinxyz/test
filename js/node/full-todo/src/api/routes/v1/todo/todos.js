const { Router } = require("express");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../../../services/todos.service");

const router = Router();

router.use((req, res, next) => {
  console.log("Inside todos route");
  console.log(req.user);
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
});

router.get("/", getTodos);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete(":/id", deleteTodo);

module.exports = router;
