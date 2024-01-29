const Todo = require("../../database/schemas/Todo");

const updateTodo = async (req, res) => {
  const todoId = req.params.id;

  const { title, description } = req.body;

  try {
    const todo = await Todo.findById(todoId);
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

module.exports = updateTodo;
