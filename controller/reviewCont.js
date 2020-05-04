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

exports.createOrEditReview = async function (req, res) {
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
    let tour = await Tour.find({ _id: req.params.id }).populate("reviews");
    return res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (e) {
    next({ status: "fail", error: "can't find tour with that id" });
  }
};

exports.deleteReview = async function (req, res, next) {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    //check if current logged in user, matches the review you want to delete
    if (review === null) {
      throw new Error("no review found of that ID found");
    }
    //originall the _id are objects in JSON, need to format them to strings
    if (JSON.stringify(req.user._id) === JSON.stringify(review.user._id)) {
      await Review.findByIdAndRemove({ _id: review._id });
      res.send({ status: "success", message: "review has been deleted" });
    } else
      throw new Error("Review does not belong to this User. Cannot be deleted");
  } catch (error) {
    res.status(404).send({
      status: "failure",
      message: error.message,
    });
  }
};
