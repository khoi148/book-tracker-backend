const passport = require("./googlePassport.js");
exports.loginGoogle = passport.authenticate("google");

exports.googleAuthHandler = async (req, res, next) => {
  passport.authenticate("google", function (err, user, info) {
    //if any error during the process, redirect user back to front end login page
    if (err) {
      console.log("google-auth handler error:", err.message);
      return res.send("ERROR");
    }
    res.send({ status: "success", data: user });
  })(req, res, next);
};
