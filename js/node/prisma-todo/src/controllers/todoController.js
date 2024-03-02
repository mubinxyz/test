const asyncHandler = require("express-async-handler");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//@desc Get all todos
//@route GET /api/todos
//@access private
const getAllTodos = asyncHandler(async (req, res) => {
  const userTodos = await prisma.task.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.status(200).json(userTodos);
});

//@desc Create new todo
//@route POST /api/todos
//@access private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, due_date, completed } = req.body;

  if (!title || !userId) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  const newTodo = await prisma.task.create({
    data: {
      title,
      description,
      due_date,
      completed,
      userId: req.user.id,
    },
  });

  res.status(201).json({ msg: "todo created", todo: newTodo });
});

//@desc Get a todo
//@route GET /api/todos/:id
//@access private
const getTodoById = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const todo = await prisma.task.findUnique({
    where: {
      AND: [{ id: todoId }, { userId: req.user.id }],
    },
  });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  res.status(200).json(todo);
});

//@desc Update a todos
//@route UPDATE /api/todos/:id
//@access private
const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, due_date, completed } = req.body;

  // if not changed, just wirte default
  const todo = await prisma.task.findUnique({
    id: req.params.id,
    userId: req.user.id,
  });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  const updatedTodo = await prisma.task.update({
    where: { id: parseInt(req.params.id), userId: req.user.id },
    data: {
      title: title || todo.title,
      description: description || todo.description,
      due_date: due_date || todo.due_date,
      completed: completed || todo.completed,
    },
  });

  res.status(200).json({ msg: "Todo updated successfully.", todo: updateTodo });
});

//@desc Delete a todos
//@route DELETE /api/todos/:id
//@access private
