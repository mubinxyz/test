const findUserByUsername = "SELECT * FROM users WHERE username = $1";

const registerUser =
  "INSERT INTO users (username, password_hash) VALUES ($1, $2);";

const getAllTodos = "SELECT * FROM tasks WHERE id = $1";

const createTodo =
  "INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *;";

const associateTodoToUser =
  "INSERT INTO user_tasks (user_id, task_id) VALUES ($1, $2);";

const getTodoById = `
  SELECT tasks.*
  FROM tasks
  JOIN user_tasks ON tasks.task_id = user_tasks.task_id
  WHERE tasks.task_id = $1 AND user_tasks.user_id = $2;
`;

const updateTodo = `
  UPDATE tasks
  SET title = $3, description = $4, due_date = $5, completed = $6
  WHERE task_id = $1 AND user_id = $2
  RETURNING *;
`;

const deleteTodo = `
  DELETE FROM tasks
  USING user_tasks
  WHERE tasks.task_id = user_tasks.task_id
    AND tasks.task_id = $1
    AND user_tasks.user_id = $2
`;

module.exports = {
  findUserByUsername,
  registerUser,
  getAllTodos,
  createTodo,
  associateTodoToUser,
  getTodoById,
  updateTodo,
  deleteTodo,
};
