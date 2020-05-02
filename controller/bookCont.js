const Book = require("../models/bookSchema");

exports.listBooks = async function (req, res, next) {
  try {
    const books = await Book.find(); //{ "owner._id": req.user._id }
    res.json({ status: "success", data: books });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createBook = async function (req, res, next) {
  //create is where the "C" in CRUD happens, thanks to Mongoose. ORM style
  //returns a promise. Must handle accordingly
  try {
    const newBook = new Book({
      ...req.body,
      owner: {
        _id:
          req.user
            ._id /*_id, name, email is already in the request body, thanks to Authenticate middleware */,
        name: req.user.name,
        email: req.user.email,
      },
    });
    console.log("newbook created", newBook);
    await newBook.save();
    res.status(201).json({ status: "success", data: newBook });
  } catch (err) {
    next({ status: "fail", message: "book could not be created", ...err });
  }
  //create() will always need all required fields to be set, else throw an error
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    // iterating over all fields in the request body. Change the object
    const fields = Object.keys(req.body);
    fields.map((field) => (book[field] = req.body[field]));
    //save changes to DB. We do it this way manually with Save(), so that the "pre" middleware in bookSchema works.
    await book.save();
    res.status(200).send({ status: "success", data: book });
  } catch (err) {
    next({
      status: "failed",
      message: "could find a book of that ID to update",
    });
  }
};

exports.deleteBook = async function (req, res, next) {
  try {
    const book = await Book.findByIdAndRemove({ _id: req.params.id });
    res.send({ status: "success", data: book });
  } catch (error) {
    next({
      status: "failed",
      message: "no item by that ID found for deletion",
    });
  }
};
