const Todo = require("../../database/schemas/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

module.exports = getTodos;
