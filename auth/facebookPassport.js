const passport = require("passport");
const FacebookStrategy = require("./facebook");

passport.use(FacebookStrategy);
// you can add more plugins here

module.exports = passport;
