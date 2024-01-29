const Todo = require("../../database/schemas/Todo");

const deleteTodo = async (req, res) => {
  todoId = req.params.id;

  try {
    deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteTodo;
