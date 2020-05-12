const express = require("express");
const router = express.Router();

//home default route
router.get("/", async function (req, res, next) {
  res.send({ status: "success", data: "application routes are working" });
});

//https://github.com/github.com/login/oauth/access_token
const { loginGithub, githubAuthHandler } = require("../auth/githubHandler.js");
router.get("/auth/github", loginGithub);
//router.post("/login/oauth/access_token", githubAuthHandler);
router.get("/auth/github/authorized", githubAuthHandler);

//Google login not working right now. Google dev OAuth key was deleted
const { loginGoogle, googleAuthHandler } = require("../auth/googleHandler.js");
router.get("/auth/google", loginGoogle);
router.get("/auth/google/authorized", googleAuthHandler);

const {
  loginFacebook,
  facebookAuthHandler,
} = require("../auth/facebookHandler.js");
//loginFacebook will make an https call to FB, which will send another https response to use with ".../auth/facebook/authorized?...." in the url
router.get("/auth/facebook", loginFacebook);
router.get("/auth/facebook/authorized", facebookAuthHandler);

/*process of creating new collection in database
//1. new schema,
//2. new route and controller
//3.create a new instance of that schema,
//4.Write to database*/
module.exports = router;
