const passport = require("passport");
const githubStrategy = require("./github");

passport.use(githubStrategy);
// you can add more plugins here

module.exports = passport;
