const Todo = require("../../database/schemas/Todo");
const User = require("../../database/schemas/User");

const createTodoForUser = async (req, res) => {
  const username = req.params.username;
  const { title, description } = req.body;

  try {
    const user = await User.findOne({ username });

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

module.exports = createTodoForUser;
