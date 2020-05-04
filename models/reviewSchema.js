const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "userId is required for Review"],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "tours",
      required: [true, "tourId is required for Review"],
    },
    rating: {
      type: Number,
      required: [true, "Review needs a rating"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "Review context text is needed"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
