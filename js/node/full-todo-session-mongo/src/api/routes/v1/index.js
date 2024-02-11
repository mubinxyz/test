const { Router } = require("express");

const adminRoute = require("./admin/admin");
const todosRoute = require("./todo/todos");
const authRoute = require("./auth/auth");

const v1Loader = () => {
  const router = Router();
  router.use("/admin", adminRoute);
  router.use("/todos", todosRoute);
  router.use("/auth", authRoute);
  return router;
};

module.exports = v1Loader;
