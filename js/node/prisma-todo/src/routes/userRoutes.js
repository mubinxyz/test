const { Router } = require("express");
const userControllers = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler.js");

const router = Router();

router.post("/register", userControllers.registerUser);

router.post("/login", userControllers.loginUser);

router.get("/current", validateToken, userControllers.currentUser);

module.exports = router;
