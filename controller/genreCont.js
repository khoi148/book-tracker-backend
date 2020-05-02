const { Genre } = require("../models/genreSchema");

exports.listGenres = async function (req, res, next) {
  try {
    const genres = await Genre.find();
    res.json({ status: "success", data: genres });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createGenre = async function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  Genre.create(req.body)
    .then((genre) => {
      res.send(genre); //sends the book in the actual response.
    })
    .catch(next);
  //create() will always need all required fields to be set, else throw an error
};

exports.updateGenre = async function (req, res, next) {
  Genre.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Genre.findOne({ _id: req.params.id }).then(function (genre) {
      res.send(genre);
    });
  });
};

exports.deleteGenre = async function (req, res, next) {
  Genre.findByIdAndRemove({ _id: req.params.id }).then(function (genre) {
    if (genre === null)
      res.send({ message: "no genre by that ID found for deletion" });
    else res.send(genre);
  });
};
