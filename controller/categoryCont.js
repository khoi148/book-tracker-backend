const { Category } = require("../models/categorySchema");

exports.listCategories = async function (req, res, next) {
  try {
    const categories = await Category.find();
    res.json({ status: "success", data: categories });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createCategory = async function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  Category.create(req.body)
    .then((category) => {
      res.send(category); //sends the book in the actual response.
    })
    .catch(next);
};

exports.updateCategory = async function (req, res, next) {
  Category.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function () {
      //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
      //So we need to get the curreny element, by using a Mongoose getter right after
      Category.findOne({ _id: req.params.id }).then(function (category) {
        res.send(category);
      });
    }
  );
};

exports.deleteCategory = async function (req, res, next) {
  Category.findByIdAndRemove({ _id: req.params.id }).then(function (category) {
    if (category === null)
      res.send({ message: "no category by that ID found for deletion" });
    else res.send(category);
  });
};
