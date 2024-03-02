import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await prisma.user.findFirst({
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
      hashedPassword,
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

  res.json({ msg: "Rigester the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public

//@desc Current user information
//@route POST /api/users/current
//@access private
