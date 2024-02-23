const express = require("express");

const authUserV1 = require("./user/auth");
const authAdminV1 = require("./admin/auth");
const fruitsv1 = require("./fruits/fruits");
const groceriesv1 = require("./groceries/groceries");

const v1Loader = () => {
  const router = express.Router();
  router.use("/authUser", authUserV1);
  router.use("/authAdmin", authAdminV1);
  router.use("/fruits", fruitsv1);
  router.use("/groceries", groceriesv1);
  return router;
};

module.exports = v1Loader;
