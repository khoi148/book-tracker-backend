const { Author } = require("../models/authorSchema.js");

exports.listAuthors = async function (req, res, next) {
  try {
    const authors = await Author.find();
    res.send({ status: "success", data: authors });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

exports.createAuthor = async function (req, res, next) {
  Author.create(req.body)
    .then((author) => {
      res.send(author); //sends the book in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
};

exports.updateAuthor = async function (req, res, next) {
  Author.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Author.findOne({ _id: req.params.id }).then(function (author) {
      res.send(author);
    });
  });
};

exports.deleteAuthor = async function (req, res, next) {
  Author.findByIdAndRemove({ _id: req.params.id }).then(function (author) {
    if (author === null)
      res.send({ message: "no author by that ID found for deletion" });
    else res.send(author);
  });
};
