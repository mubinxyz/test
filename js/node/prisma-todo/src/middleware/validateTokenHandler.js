const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    res.status(401);
    throw new Error("User is not authorized. Token is missing.");
    return;
  }

  if (!authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Invalid authorization format. Use 'Bearer' prefix.");
    return;
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
};

module.exports = validateToken;
