const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/bookSchema");
const { Author } = require("../models/authorSchema");

require("dotenv").config({ path: ".env" });

//Define your routes, your API calls
router.get("/books", function (req, res, next) {
  Book.find(function (err, books) {
    if (err)
      return res
        .status(400)
        .send({ message: "error on GET request. Cannnot display all" });
    res.send(books);
  });
});

//post a book to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/books", function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  Book.create(req.body)
    .then((book) => {
      res.send(book); //sends the book in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
});

//update a book
router.put("/books/:id", function (req, res, next) {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Book.findOne({ _id: req.params.id }).then(function (book) {
      res.send(book);
    });
  });
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

//get request for author
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

async function createUser(username) {
  return new Book({
    username,
    created: Date.now(),
  }).save();
}
async function findUser(username) {
  return await Book.findOne({ username });
}

//   const username = process.argv[2].split("=")[1];
//   let user = await connector.then(async () => {
//     return findUser(username);
//   });
//   if (!user) {
//     user = await createUser(username);
//   }
//   console.log(user);
//   process.exit(0);
// })();

module.exports = router;
