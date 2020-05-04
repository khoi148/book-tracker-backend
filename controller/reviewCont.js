const Review = require("../models/reviewSchema");
const Tour = require("../models/tourSchema");
const User = require("../models/userSchema");

exports.listReviews = async function (req, res, next) {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.json({ status: "success", data: reviews });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.readReview = async function (req, res, next) {
  try {
    //note populate only happens at runtime, we cannot check for reviews prop before hand.
    //populate will not define "reviews" property if there is no reviews yet for the book
    let tour = await Tour.find({ _id: req.params.id }).populate("reviews");
    return res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (e) {
    next({ status: "fail", error: "can't find tour with that id" });
  }
};

const { createOne } = require("./handlerFactory");
exports.createReview = createOne(Review);

const { updateOne } = require("./handlerFactory");
exports.updateReview = updateOne(Review);

const { deleteOne } = require("./handlerFactory");
exports.deleteReview = deleteOne(Review);
