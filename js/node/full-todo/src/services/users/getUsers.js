const User = require("../../database/schemas/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    if (!users)
      return res.status(404).json({ error: "No users Or Server problem" });
  }
};

module.exports = getUsers;
