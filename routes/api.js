//setup
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

//middleware
const { authenticate } = require("../middleware/authenticate");
const { validateBook } = require("../middleware/validateBook");

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
router.post("/reviews", authenticate, validateBook, createReview);

//home default route
router.get("/", async function (req, res, next) {
  res.send({ status: "success", data: "application routes are working" });
});

//Book routes
const {
  listBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookCont.js");
router.route("/books").get(authenticate, listBooks);
router.route("/books").post(authenticate, createBook);
router.put("/books/:id", authenticate, updateBook);
router.delete("/books/:id", authenticate, deleteBook);

//Genre Routes
const {
  listGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controller/genreCont.js");
router.get("/genres", listGenres);
router.post("/genres", createGenre);
router.put("/genres/:id", updateGenre);
router.delete("/genres/:id", deleteGenre);

//Author Routes
const {
  listAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/authorCont.js");
router.get("/authors", listAuthors);
router.post("/authors", createAuthor);
router.put("/authors/:id", updateAuthor);
router.delete("/authors/:id", deleteAuthor);

/*process of creating new collection in database
//1. new schema,
//2. new route and controller
//3.create a new instance of that schema,
//4.Write to database*/
module.exports = router;
