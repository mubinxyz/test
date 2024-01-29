const User = require("../../database/schemas/User");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ status: "201", newUser });
  } catch (err) {
    console.log(err);
  }
};
