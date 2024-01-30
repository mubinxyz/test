const User = require("../database/schemas/User");

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

const findUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) res.status(404).json({ error: "user not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    if (!newUser)
      return res.status(500).json({ error: "Enternal server error" });

    await newUser.save();

    res.status(201).json({ status: "201", newUser });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const username = req.params.username;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    res.status(204).json({ status: "204", deletedUser });
  } catch (err) {
    console.log(err);
    if (!deleteUser) res.status(500).json({ error: "Enternal server error" });
  }
};

module.exports = {
  getUsers,
  findUser,
  createUser,
  deleteUser,
};
