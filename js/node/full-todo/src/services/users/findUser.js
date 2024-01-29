const User = require("../../database/schemas/User");

const findUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = User.findOne({ username });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    if (!user) res.status(404).json({ error: "user not found" });
  }
};

module.exports = findUser;
