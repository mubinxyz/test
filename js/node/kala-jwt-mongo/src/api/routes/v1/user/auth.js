const { Router } = require("express");

const {
  signUp,
  logIn,
  logOut,
} = require("../../../../services/userAuth.service.js");

const router = Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("logout", logOut);

module.exports = router;
