const githubStrategy = require("passport-github2").Strategy;

module.exports = new githubStrategy(
  // 1st arg is configuration
  {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    redirect_uri: process.env.GH_CB,
    scope: ["user"],
  },
  // verification function (callback). Takes 4 args
  function (request, accessToken, refreshToken, profile, cb) {
    console.log(profile);
    // todo
    cb(null, profile._json);
  }
);
