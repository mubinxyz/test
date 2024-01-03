const express = require("express");
const app = express();
let { people } = require("./02-express-tutorial/data");

// static assets
app.use(express.static("./02-express-tutorial/methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcom ${name}`);
  }
  res.status(401).send("Please Provide Credentials.");
});

const HOST_NAME = "127.0.0.1";
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port http://${HOST_NAME}:${PORT}`);
});
