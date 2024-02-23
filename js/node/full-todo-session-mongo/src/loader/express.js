const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const routes = require("../api/routes");
require("dotenv").config();
require("../api/middlewares/strategies/local");
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
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "lajdhlkjdfafakjfald",
      resave: false,
      saveUninitialized: ture,
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/full-todo",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes());

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`on port ${PORT}`);
  });
};

module.exports = expressLoader;
