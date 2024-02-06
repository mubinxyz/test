const Todo = require("../database/schemas/Todo");
const User = require("../database/schemas/User");

const getTodos = async (req, res) => {
  try {
    // Fetch todos only for the logged-in user
    const todos = await Todo.find({ userId: req.user._id });

    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) return res.status(404).json({ error: "User not found" });

    // create a new todo
    const newTodo = new Todo({
      title,
      description,
      userId: user._id, // link the todo to the user
    });

    await newTodo.save();

    // update the user's todo array
    user.todos.push(newTodo._id);
    await user.save();
    res.status(201).json({ status: "created", todo: [newTodo] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Enternal server error" });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const todo = await Todo.findOne({ _id: id, userId: req.user._id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    const updatedTodo = await todo.save();

    res.status(200).json({ status: "200", updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTodo = await Todo.findOne({ userId: req.user._id, _id: id });
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
