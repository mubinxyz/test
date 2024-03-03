const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    res.status(401);
    throw new Error("User is not authorized. Token is missing.");
  }

  if (!authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Invalid authorization format. Use 'Bearer' prefix.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User is not authorized. Invalid token.");
  }
});

module.exports = validateToken;
