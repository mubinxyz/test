const Todo = require("../../database/schemas/Todo");

const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);

    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Enteral server error" });
  }
};

module.exports = getTodoById;
