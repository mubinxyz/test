const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

const register = async (req, res) => {
  const { username, email } = req.body;
  const userDB = await User.findOne({ username });
  if (userDB) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await User.create({ username, email, password });
    res.status(201).send({ newUser: { username } });
  }
};

module.exports = {
  register,
};
