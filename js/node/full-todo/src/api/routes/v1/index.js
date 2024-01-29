const { Router } = require("express");

const usersRoute = require("./user/users");
const todosRoute = require("./todo/todos");

const v1Loader = () => {
  const router = Router();
  router.use("/users", usersRoute);
  router.use("/todos", todosRoute);
};

module.exports = v1Loader;
