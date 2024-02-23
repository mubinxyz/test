const express = require("express");
const passport = require("passport");
const routes = require("../api/routes");
require("dotenv").config({ path: "../.env" });
// const httpstatus = require("http-status-codes");
const cors = require("cors");
const path = require("path");

require("../db");

const expressLoader = async (app) => {
  // app.use(express.static(path.join(__dirname, "../media")));
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());
  app.use("/api", routes());

  app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`);
  });
};

module.exports = expressLoader;
