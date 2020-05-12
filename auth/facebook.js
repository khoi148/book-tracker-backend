const strategy = require("passport-facebook");
const facebookStrategy = strategy.Strategy;

module.exports = new facebookStrategy(
  // 1st arg is configuration
  {
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CB,
    profileFields: ["id", "email", "name"],
  },
  // verification function (callback). Takes 4 args
  function (accessToken, refreshToken, profile, next) {
    console.log(profile);

    // todo

    next(null, profile);
  }
);
