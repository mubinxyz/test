const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//@desc Get all users
//@route GET /api/admin/users
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

//@desc Get user by id
//@route GET /api/admin/users/:id
//@access private
const getUserById = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  res.status(200).json(user);
});

//@desc Remove a User
//@route GET /api/admin/users/:id
//@access private
const removeUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  res
    .status(200)
    .json({ msg: "user deleted successfully!", deleteduser: user });
});

//@desc Get all todos
//@route GET /api/admin/todos
//@access private
const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await prisma.task.findMany();

  res.status(200).json(todos);
});

//@desc Get todo by id
//@route GET /api/admin/todos/:id
//@access private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await prisma.task.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  res.status(200).json(todo);
});

module.exports = {
  getAllUsers,
  getUserById,
  removeUser,
  getAllTodos,
  getTodoById,
};
