const passport = require("passport");
const { Strategy } = require("passport-local");
const { comparePassword } = require("../../../utils/helpers");
const User = require("../../../database/schemas/User");

passport.serializeUser((user, done) => {
  console.log("Serializing User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User");
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log(username);

      try {
        if (!username || !password) {
          throw new Error("Missing credentials");
        }

        const userDB = await User.findOne({ username });

        if (!userDB) {
          console.log("User not found");
          return done(null, false, { message: "Invalid credentials" });
        }

        const isValid = comparePassword(password, userDB.password);

        if (isValid) {
          console.log("Authenticated Successfully");
          return done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          return done(null, false, { message: "Invalid credentials" });
        }
      } catch (err) {
        console.log(err);
        return done(err, false, { message: "Authentication error" });
      }
    }
  )
);
