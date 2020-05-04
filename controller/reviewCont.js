const Review = require("../models/reviewSchema");
const Tour = require("../models/tourSchema");

exports.createReview = async function (req, res) {
  try {
    // create review or update existing review
    const review = await Review.findOneAndUpdate(
      { user: req.user._id, tour: req.body.tour },
      { ...req.body, user: req.user._id } /*How we update if found*/,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.readReview = async function (req, res, next) {
  try {
    //note populate only happens at runtime, we cannot check for reviews prop before hand.
    //populate will not define "reviews" property if there is no reviews yet for the book
    let tour = await Tour.find({ _id: req.body.tour }).populate("reviews");
    return res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (e) {
    next({ status: "fail", error: "can't find tour with that id" });
  }
};
