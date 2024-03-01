const pool = require("../config/db");
const queries = require("../db/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  pool.query(queries.findUserByUsername, [username], async (error, results) => {
    if (results.rows[0]) {
      res.send("user already registered");
    } else {
      const password_hash = await bcrypt.hash(password, 10);

      pool.query(
        queries.registerUser,
        [username, password_hash],
        (error, results) => {
          if (error) throw error;
          console.error(error);
          res.status(201).json({ msg: "user registered successfully." });
        }
      );
    }
  });
};

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }

  pool.query(queries.findUserByUsername, [username], async (error, results) => {
    if (error) {
      console.error("Error retrieving user: ", error);
      res.status.json({ error: "Internal Server Error" });
      return;
    }

    const user = results.rows[0];

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            user: {
              id: user.user_id,
              username: user.username,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).json({ accessToken });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
};

//@desc Current user information
//@route POST /api/users/current
//@access private
const currentUser = (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
