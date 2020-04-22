const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/bookSchema");
const { Author } = require("../models/authorSchema");
const { Genre } = require("../models/genreSchema");
require("dotenv").config({ path: ".env" });

//Get the list of Books
router.get("/books", function (req, res, next) {
  Book.find(function (err, books) {
    if (err)
      res
        .status(400)
        .send({ message: "error on GET request. Cannnot display all Books" });
    res.send(books);
  });
});
//post a book to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/books", async (req, res, next) => {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  try {
    const newBook = new Book(req.body); // all the fields from req.body will go in here
    await newBook.save();
    res.status(201).send({ status: "success", data: newBook });
  } catch (err) {
    //res.status(400).json({ status: "fail", message: err.message });
    next({ ...err.errors });
  }
  //create() will always need all required fields to be set, else throw an error
});
//update a book
router.put("/books/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    // iterating over all fields in the request body. Change the object
    const fields = Object.keys(req.body);
    fields.map((field) => (book[field] = req.body[field]));
    //save changes to DB. We do it this way manually with Save(), so that the "pre" middleware in bookSchema works.
    await book.save();
    res.status(200).send({ status: "success", data: book });
  } catch (err) {
    next({ ...err.errors });
  }
});
//delete book
router.delete("/books/:id", function (req, res, next) {
  console.log(req.params.id);
  Book.findByIdAndRemove({ _id: req.params.id }).then(function (book) {
    if (book === null)
      res.send({ message: "no item by that ID found for deletion" });
    else res.send(book);
  });
});

//Get a list of genres
router.get("/genres", function (req, res, next) {
  Genre.find(function (err, genres) {
    if (err)
      return res
        .status(400)
        .send({ message: "error on GET request. Cannnot display all Genres" });
    res.send(genres);
  });
});
//post a Genre to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/genres", function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  Genre.create(req.body)
    .then((genre) => {
      res.send(genre); //sends the book in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
});
//update a Genre
router.put("/genres/:id", function (req, res, next) {
  Genre.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Genre.findOne({ _id: req.params.id }).then(function (genre) {
      res.send(genre);
    });
  });
});
//delete Genre
router.delete("/genres/:id", function (req, res, next) {
  Genre.findByIdAndRemove({ _id: req.params.id }).then(function (genre) {
    if (genre === null)
      res.send({ message: "no genre by that ID found for deletion" });
    else res.send(genre);
  });
});

//get request for Author, list of authors
router.get("/authors", function (req, res, next) {
  Author.find(function (err, authors) {
    if (err) res.status(400).send({ message: err });
    res.send(authors);
  });
});
//post an Author to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/authors", function (req, res, next) {
  Author.create(req.body)
    .then((author) => {
      res.send(author); //sends the book in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
});
//update a Author
router.put("/authors/:id", function (req, res, next) {
  Author.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Author.findOne({ _id: req.params.id }).then(function (author) {
      res.send(author);
    });
  });
});
//delete Author
router.delete("/authors/:id", function (req, res, next) {
  Author.findByIdAndRemove({ _id: req.params.id }).then(function (author) {
    if (author === null)
      res.send({ message: "no author by that ID found for deletion" });
    else res.send(author);
  });
});

const { createUser } = require("../controller/userCont");
const { loginUser } = require("../controller/loginCont");
router.route("/users").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
