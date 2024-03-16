// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const userData = req.validatedRegisterData;
  const { username, password, role } = userData;

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
  console.log("user created: ", newUser);

  if (newUser) {
    res.status(201).json({
      msg: "usesr created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.validatedLoginData;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accesstoken: accessToken });
  } else {
    res.status(401);
    throw new Error("email or passwrod is not valid");
  }
});

//@desc Current user information
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
