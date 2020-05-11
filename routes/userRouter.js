const router = require("express").Router();
//middleware
const { authenticate } = require("../middleware/authenticate");

//user register and login routes
const { createUser, listUsers, lookupUser } = require("../controller/userCont");
const { loginUser } = require("../controller/loginCont");
router.route("/users").get(listUsers); //list users feature, for our benefit
router.route("/users").post(createUser); //register
router.route("/login").post(loginUser); //login
//for testing
router.get("/users/me", authenticate, lookupUser);
router.get("/users/me/upload", authenticate, lookupUser);

//Logout Routes
const { logoutUser, logoutUserAll } = require("../controller/logoutCont");
router.get("/logout", authenticate, logoutUser);
router.get("/logout-all", authenticate, logoutUserAll);

module.exports = router;
