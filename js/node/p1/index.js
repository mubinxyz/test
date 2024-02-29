const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const studentRoutes = require("./src/student/routes");

app.use(express.json());
app.use("/api/v1/students", studentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
