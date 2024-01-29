const User = require("../../database/schemas/User");

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
