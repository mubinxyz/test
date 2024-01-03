const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4000;

let todos = [];

// Middleware to handle JSON data in requests
app.use(express.json());

// another middle ware
app.use(cors());

// Function to save todos to a JSON file
const saveTodosToFile = () => {
  fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Todos saved to file");
    }
  });
};

// Function to load todos from the JSON file
const loadTodosFromFile = () => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      try {
        todos = JSON.parse(data);
        console.log("Todos loaded from file");
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    }
  });
};

// Load initial todos from file on server start
loadTodosFromFile();

// GET route to fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST route to add a new todo
app.post("/addTodo", (req, res) => {
  const { todo } = req.body;
  todos.push(todo);
  saveTodosToFile();
  res.status(201).send("Todo added successfully");
});

// PUT route to edit a todo
app.put("/editTodo", (req, res) => {
  const { index, todo } = req.body;
  if (index >= 0 && index < todos.length) {
    todos[index] = todo;
    saveTodosToFile();
    res.send("Todo updated successfully");
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE route to delete a todo
app.delete("/deleteTodo", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    saveTodosToFile();
    res.send("Todo deleted successfully");
  } else {
    res.status(404).send("Todo not found");
  }
});

// OPTIONS route to handle pre-flight requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// Route not found
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
