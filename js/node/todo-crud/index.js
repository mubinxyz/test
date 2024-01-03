const http = require("http");
const { readFile, writeFile } = require("fs");


// Function to save todos to a JSON file
const saveTodosToFile = () => {
  writeFile("todos.json", JSON.stringify(todos), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Todos saved to file");
    }
  });
};

// Function to load todos from the JSON file
const loadTodosFromFile = () => {
  readFile("todos.json", "utf8", (err, data) => {
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

const server = http.createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET" && pathname === "/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (req.method === "POST" && pathname === "/addTodo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { todo } = JSON.parse(body);
      todos.push(todo);
      saveTodosToFile();
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Todo added successfully");
    });
  } else if (req.method === "PUT" && pathname === "/editTodo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { index, todo } = JSON.parse(body);
      if (index >= 0 && index < todos.length) {
        todos[index] = todo;
        saveTodosToFile();
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Todo updated successfully");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Todo not found");
      }
    });
  } else if (req.method === "DELETE" && pathname === "/deleteTodo") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { index } = JSON.parse(body);
      if (index >= 0 && index < todos.length) {
        todos.splice(index, 1);
        saveTodosToFile();
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Todo deleted successfully");
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Todo not found");
      }
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found");
  }
});

const hostname = '127.0.0.1';
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port http://${hostname}:${PORT}/`);
});
