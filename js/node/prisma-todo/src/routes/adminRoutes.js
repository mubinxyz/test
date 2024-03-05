const { Router } = require("express");
const adminController = require("../controllers/adminController.js");
const validateToken = require("../middleware/validateTokenHandler.js");
const authAdmin = require("../middleware/authAdmin.js");

const router = Router();

router.use(validateToken);
router.use(authAdmin);

// user actions
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.delete("users/:id", adminController.removeUser);

// todo actions
router.get("/todos", adminController.getAllTodos);
router.get("/todos/:id", adminController.getTodoById);

module.exports = router;
