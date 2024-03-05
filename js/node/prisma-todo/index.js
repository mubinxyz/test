const express = require("express");
const errorHandler = require("./src/middleware/errorHandler");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/api/v1/todos", require("./src/routes/todoRoutes.js"));
app.use("/api/v1/users", require("./src/routes/userRoutes.js"));
app.use("/api/v1/admin", require("./src/routes/adminRoutes.js"));
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
