//setup
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

//middleware
const { authenticate } = require("../middleware/authenticate");
const { checkTour } = require("../middleware/checkTour");

//user register and login routes
const { createUser, listUsers } = require("../controller/userCont");
const { loginUser } = require("../controller/loginCont");
router.route("/users").get(listUsers); //should auth, but making this feature for our benefit w/o auth
router.route("/users").post(createUser);
router.route("/login").post(loginUser);

//Logout Routes
const { logoutUser, logoutUserAll } = require("../controller/logoutCont");
router.get("/logout", authenticate, logoutUser);
router.get("/logout-all", authenticate, logoutUserAll);

//reviews routes
const { createReview, readReview } = require("../controller/reviewCont");
router.get("/reviews", authenticate, readReview);
router.post("/reviews", authenticate, checkTour, createReview);

//home default route
router.get("/", async function (req, res, next) {
  res.send({ status: "success", data: "application routes are working" });
});

//Book routes
const {
  listTours,
  createTour,
  readTour,
} = require("../controller/tourCont.js");
//deleteTour,
//updateTour,
router.route("/tours").get(authenticate, listTours);
router.route("/tours").post(authenticate, createTour);
router.route("/read-tour/:id").get(authenticate, readTour);
//router.put("/tours/:id", authenticate, updateBook);
//router.delete("/tours/:id", authenticate, deleteBook);

//Categories routes
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryCont.js");
router.get("/categories", listCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

/*process of creating new collection in database
//1. new schema,
//2. new route and controller
//3.create a new instance of that schema,
//4.Write to database*/
module.exports = router;
