const passport = require("../middlewares/passport");

const jwtMiddleware = passport.authenticate("jwt", { session: false });

module.exports = jwtMiddleware;
