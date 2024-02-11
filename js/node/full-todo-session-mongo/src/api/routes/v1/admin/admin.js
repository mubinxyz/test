const { Router } = require("express");

const {
  getAllTodos,
  findTodo,
  getAllUsers,
  findUser,
  deleteUser,
} = require("../../../../services/admin.service");

const router = Router();

router.use((req, res, next) => {
  console.log("Inside Admin route");
  req.user ? next() : res.status(401).json({ error: "Unathorized" });
});

router.get("/todos", getAllTodos);

router.get("/todos/:id", findTodo);

router.get("/users", getAllUsers);

router.get("/users/:username", findUser);

router.get("/delete-user/:username", deleteUser);

module.exports = router;
