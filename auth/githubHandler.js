const passport = require("./githubPassport.js");
exports.loginGithub = passport.authenticate("github");

exports.githubAuthHandler = async (req, res, next) => {
  //console.log("gh handler", req.params);
  //res.send({ status: "success github" });
  const cbFunction = passport.authenticate("github", function (
    err,
    user,
    info
  ) {
    //if any error during the process, redirect user back to front end login page
    if (err) {
      console.log("github-auth handler error:", err.message);
      return res.send("ERROR");
    }
    res.send({ status: "success", data: user });
  });
  cbFunction(req, res, next);
};
