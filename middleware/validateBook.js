const Book = require("../models/bookSchema");

exports.validateBook = async function (req, res, next) {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId); //returns promise, so must use await to resolve it
    console.log("find book", book);
    req.book = book;
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(404)
      .json({ status: "fail", error: "no book with that ID exists" });
  }
};
