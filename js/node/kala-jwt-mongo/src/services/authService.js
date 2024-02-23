const jwt = require("jsonwebtoken");
const User = require("../db/schemas/User");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

function AuthService() {
  function generateToken(user) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      PRIV_KEY,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }

  return {
    generateToken,
  };
}

module.exports = AuthService;
