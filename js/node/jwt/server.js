const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/login-app-db");

const JWT_SECRET = ";aldsjf;ljfaoiuhdliuha;kdjf;slkajf;ljaf;lj";

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(cors());

// routes
app.post("/api/change-password", async (req, res) => {
  const { token, newPassword: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. should be atleast 6 characters.",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const _id = user.id;

    const password = await bcrypt.hash(plainTextPassword, 10);
    await User.findOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: ";))" });
  }

  res.json({ status: "ok" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful.
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }

  res.json({
    status: "error",
    error: "Invalid username/password",
  });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. should be atleast 6 characters.",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        data: "",
        error: "username already in use",
      });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

app.listen(9999, () => {
  console.log("Server up at 9999");
});
