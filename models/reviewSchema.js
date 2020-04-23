const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "userId is required for Review"],
    },
    bookId: {
      type: mongoose.Schema.ObjectId,
      ref: "book",
      required: [true, "bookId is required for Review"],
    },
    content: {
      type: String,
      required: [true, "Review needs content"],
      minLength: 10,
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
