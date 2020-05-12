const passport = require("passport");
const googleStrategy = require("./google");

passport.use(googleStrategy);
// you can add more plugins here

module.exports = passport;
