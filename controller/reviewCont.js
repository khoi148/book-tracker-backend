const Review = require("../models/reviewSchema");
const Book = require("../models/bookSchema");

exports.createReview = async function (req, res) {
  const { content } = req.body;
  try {
    const review = await Review.create({
      content: content,
      bookId: req.book._id /*middleware already puts the book id in req*/,
      user: req.user._id /*middleware already puts the user id in req*/,
    });
    res.status(200).json({ status: "success", data: review });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.readReview = async function (req, res, next) {
  try {
    let book = await Book.find({ _id: req.body.bookId }).populate("reviews");
    //populate will not define reviews property if there is no reviews yet for the book
    return res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (e) {
    next({ status: "fail", error: "can't find book with that id" });
  }
};
