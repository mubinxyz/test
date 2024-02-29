const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
app.use("/api/v1/todos", require("./src/routes/todoRoutes"));
app.use("/api/v1/users", require("./src/routes/userRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
