const express = require("express");
const routes = require("../api/routes");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const path = require("path");

const expressLoader = async (app) => {
  app.use(express.static(path.join(__dirname, "../media")));
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  app.use("/api", routes());

  app.listen(process.env.PORT, () => {
    console.log(`on port ${process.env.PORT}`);
  });

  app.use((req, res, next) => {
    const err = new ApiError(404, "Not Found");
    next(err);
  });

  app.use(errorHandler);
};

module.exports = expressLoader;
