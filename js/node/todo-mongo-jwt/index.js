const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

// routes
app.use("/api/todos", require("./routes/todosRoutes.js"));
app.use("/api/users", require("./routes/usersRoutes.js"));

app.listen(port, () => {
  console.log(`app runnning at port ${port}`);
});
