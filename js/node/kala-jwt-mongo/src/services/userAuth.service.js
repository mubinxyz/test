const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("./authService");
const AuthService = require("../services/authService");
const jwtMiddleware = require("../api/middlewares/jwtMiddleware");
const User = require("../db/schemas/User");

// Sign up route
const signUp = async (req, res) => {
  const authService = AuthService();
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(409).json({ msg: "Username is already taken." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();

    // generating a JWT token for the new user;
    token = authService.generateToken(newUser);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = AuthService.generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = router;
