const Review = require("../models/reviewSchema");
const Book = require("../models/bookSchema");
exports.createReview = async function (req, res) {
  const { content } = req.body;
  try {
    //console.log("book", req.book);
    console.log("user", req.user);
    const review = await Review.create({
      content: content,
      bookId: req.book._id,
      user: req.user._id,
    });
    res.status(200).json({ status: "ok", data: review });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.readReview = async function (req, res, next) {
  try {
    const book = await Book.find({ _id: req.body.bookId }).populate("reviews");

    return res.status(200).json({ status: "success", data: book });
  } catch (e) {
    return res
      .status(404)
      .send({ status: "fail", error: "can't find book with that id" });
  }
};
