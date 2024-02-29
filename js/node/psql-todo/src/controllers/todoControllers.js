const pool = require("../config/db");
const queries = require("../db/queries");

//@desc Get all todos
//@route GET /api/todos
//@access private
const getAllTodos = (req, res) => {
  pool.query(queries.getAllTodos, [parseInt(req.user.id)], (error, results) => {
    console.log(req.user.id);
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//@desc Create new todo
//@route POST /api/todos
//@access private
//! fix the due_date issue
const createTodo = (req, res) => {
  const { title, description, due_date } = req.body;

  pool.query(
    queries.createTodo,
    [title, description, due_date],
    (error, results) => {
      if (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const createdTodo = results.rows[0];

        // Format due_date as 'YYYY-MM-DD'
        const formattedDueDate =
          createdTodo.due_date.toLocaleDateString("en-CA");
        createdTodo.due_date = formattedDueDate;

        // Associate the created todo with the user in user_tasks table
        pool.query(
          queries.associateTodoToUser,
          [parseInt(req.user.id), parseInt(createdTodo.task_id)],
          (associationError, associationResults) => {
            if (associationError) {
              console.error(
                "Error associating todo with user:",
                associationError
              );
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.status(201).json({
                msg: "Todo created for user successfully!",
                todo: createdTodo,
              });
              console.log("Todo created for user successfully");
            }
          }
        );
      }
    }
  );
};

//@desc Get a todos
//@route GET /api/todos/:id
//@access private
const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    queries.getTodoById,
    [id, parseInt(req.user.id)],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

//@desc Update a todos
//@route UPDATE /api/todos/:id
//@access private
const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, due_date, completed } = req.body;

  pool.query(queries.getTodoById, [id, req.user.id], (error, results) => {
    if (!results.rows.length) {
      res.json({ msg: "user doesn't exists in database" });
    } else {
      pool.query(
        queries.updateTodo,
        [id, req.user.id, title, description, due_date, completed],
        (error, results) => {
          if (error) {
            console.error("Error updating todo: ", error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            const updatedTodo = results.rows[0];
            res
              .status(200)
              .json({ msg: "todo updated successfully", todo: updatedTodo });
          }
        }
      );
    }
  });
};

//@desc Delete a todos
//@route DELETE /api/todos/:id
//@access private
const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getTodoById, [id, req.user.id], (error, results) => {
    if (!results.rows.length) {
      res.json({ msg: "user doesn't exists in database" });
    } else {
      pool.query(queries.deleteTodo, [id, req.user.id], (error, results) => {
        if (error) {
          console.error("Error updating todo: ", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ msg: "todo deleted." });
      });
    }
  });
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
