const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/itemSchema");
const { Category } = require("../models/categorySchema");
require("dotenv").config({ path: ".env" });

//Get the list of Items
router.get("/items", function (req, res, next) {
  Item.find(function (err, list) {
    if (err)
      res
        .status(400)
        .send({ message: "Error on GET request. Cannnot display all Items" });
    res.send(list);
  });
});
//post a Item to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/items", async (req, res, next) => {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  try {
    const newItem = new Item(req.body); // all the fields from req.body will go in here
    await newItem.save();
    res.status(201).send({ status: "success", data: newItem });
  } catch (err) {
    //res.status(400).json({ status: "fail", message: err.message });
    next({ ...err.errors });
  }
  //create() will always need all required fields to be set, else throw an error
});
//update a Item
router.put("/items/:id", async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    // iterating over all fields in the request body. Change the object
    const fields = Object.keys(req.body);
    fields.map((field) => (item[field] = req.body[field]));
    //save changes to DB. We do it this way manually with Save(), so that the "pre" middleware in bookSchema works.
    await item.save();
    res.status(200).send({ status: "success", data: item });
  } catch (err) {
    next({ ...err.errors });
  }
});
//delete Item
router.delete("/items/:id", function (req, res, next) {
  Item.findByIdAndRemove({ _id: req.params.id }).then(function (item) {
    if (item === null)
      res.send({ message: "no item by that ID found for deletion" });
    else res.send(item);
  });
});

//Get a list of Categories
router.get("/categories", function (req, res, next) {
  Category.find(function (err, list) {
    if (err)
      return res.status(400).send({
        message: "error on GET request. Cannnot display all categories",
      });
    res.send(list);
  });
});
//post a Category to db, acts as "middleware" to handle your requests, before it hits your app
router.post("/categories", function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  Category.create(req.body)
    .then((category) => {
      res.send(category); //sends the category in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
});
//update a Category
router.put("/categories/:id", function (req, res, next) {
  Category.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
      //So we need to get the curreny element, by using a Mongoose getter right after
      Category.findOne({ _id: req.params.id }).then(function (category) {
        res.send(category);
      });
    }
  );
});
//delete Category
router.delete("/categories/:id", function (req, res, next) {
  Category.findByIdAndRemove({ _id: req.params.id }).then(function (category) {
    if (category === null)
      res.send({ message: "no category by that ID found for deletion" });
    else res.send(category);
  });
});

// async function createUser(username) {
//   return new Book({
//     username,
//     created: Date.now(),
//   }).save();
// }
// async function findUser(username) {
//   return await Book.findOne({ username });
// }

module.exports = router;
