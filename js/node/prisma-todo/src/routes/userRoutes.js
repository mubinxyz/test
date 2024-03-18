const { Router } = require("express");
const userControllers = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler.js");
const {
  validateRegistration,
} = require("../validation/validation.register.js");
const { validateLogin } = require("../validation/validation.login.js");

const router = Router();

router.post("/register", validateRegistration, userControllers.registerUser);

router.post("/login", validateLogin, userControllers.loginUser);

router.get("/current", validateToken, userControllers.currentUser);

module.exports = router;
