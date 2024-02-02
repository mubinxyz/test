const { Router } = require("express");

const usersRoute = require("./user/users");
const todosRoute = require("./todo/todos");
const authRoute = require("./auth/auth");

const v1Loader = () => {
  const router = Router();
  router.use("/users", usersRoute);
  router.use("/todos", todosRoute);
  router.use("/auth", authRoute);
  return router;
};

module.exports = v1Loader;
