const strategy = require("passport-facebook");
const facebookStrategy = strategy.Strategy;
const User = require("../models/userSchema");
module.exports = new facebookStrategy(
  // 1st arg is configuration
  {
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CB,
    profileFields: ["id", "email", "name"],
  },
  // verification function (callback). Takes 4 args
  async function (accessToken, refreshToken, profile, done) {
    const { email, first_name, last_name } = profile._json;
    //let name = (first_name + " " + last_name).toLowerCase();
    try {
      const user = await User.findOneOrCreate({ email, first_name, last_name });
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);
