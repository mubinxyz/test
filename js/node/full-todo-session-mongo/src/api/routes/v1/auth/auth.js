const { Router } = require("express");
const passport = require("passport");
const { register } = require("../../../../services/auth.service");

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged in");
  console.log(req.user); // Log the user object
  res.status(200).json({ message: "Logged in successfully", user: req.user });
});

router.post("/register", register);

module.exports = router;
