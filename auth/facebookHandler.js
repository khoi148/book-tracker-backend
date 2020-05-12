const passport = require("./facebookPassport.js");
exports.loginFacebook = passport.authenticate("facebook");

exports.facebookAuthHandler = async (req, res, next) => {
  passport.authenticate("facebook", function (err, user, info) {
    //if any error during the process, redirect user back to front end login page
    if (err) {
      console.log("fb-auth handler error:", err.message);
      return res.send("ERROR");
    }
    res.send({ status: "success", data: user });
  })(req, res, next);
};

exports.facebookAuthHandler = async (req, res, next) => {
  const cbFunction = passport.authenticate("facebook", (err, user, info) => {
    //if any error during the process, redirect user back to front end login page
    if (err) {
      console.log("fb-auth handler error:", err.message);
      return res.send("ERROR");
    }
    res.send({ status: "success", data: user });
  }); //this authenticate method in passport returns a Callback function
  cbFunction(req, res, next);
};
