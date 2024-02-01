const express = require("express");
const routes = require("../api/routes");
require("dotenv").config("../../.env");
const cors = require("cors");

require("../database");

const expressLoader = async (app) => {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
  });

  app.use(express.json());
  app.use("/api", routes());

  PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`on port ${PORT}`);
  });
};

module.exports = expressLoader;
