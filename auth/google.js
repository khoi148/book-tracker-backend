const googleStrategy = require("passport-google-oauth2").Strategy;

module.exports = new googleStrategy(
  // 1st arg is configuration. Google scope fields are diff than FB
  {
    clientID: process.env.G_ID,
    clientSecret: process.env.G_SECRET,
    callbackURL: process.env.G_CB,
    scope: ["email", "profile"],
    passReqToCallback: true,
  },
  // verification function (callback). Takes 4 args
  function (request, accessToken, refreshToken, profile, cb) {
    console.log(profile);
    // todo
    cb(null, profile._json);
  }
);
