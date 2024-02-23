const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/kala-mongo")
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));
