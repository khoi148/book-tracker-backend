const mongoose = require("mongoose");
const Tour = require("./tourSchema");
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

//updates averageRating and averageQuantity fields
reviewSchema.statics.calculateAvgRating = async function (tourId) {
  //find all reviews with tourId
  /*generate a new object with {
    _id: tourId,
    ratingQ: number of docs found,
    ratingA: avg rating of field rating
  }*/
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: "$tour",
        ratingQuantity: { $sum: 1 },
        ratingAverage: { $avg: "$rating" },
      },
    },
  ]);
  //stats will return [{_id: ,}]
  //save the data to our database
  console.log("stats: ", stats);
  await Tour.findByIdAndUpdate(tourId, {
    ratingAverage: stats.length === 0 ? 0 : stats[0].ratingAverage,
    ratingQuantity: stats.length === 0 ? 0 : stats[0].ratingQuantity,
  });
  //console.log("results", mongoose.Model("tours").findOne({ _id: tourId }));
};

//To update the avg rating/quantity after each save doc method.
reviewSchema.post("save", async function (next) {
  //Note: in this middleware, this = doc(instance)
  console.log("post save", this);
  await this.constructor.calculateAvgRating(this.tour);
});

const AppError = require("../utils/appError");
// create pre hook and pass the document to post hook
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne(); //attaching object to response
  if (!this.doc) return next(new AppError(404, "Review not found"));
  next();
});
//every time a findOne happens, on the Review model (CRUD),update the corresponding tour avgQ and avgR fields of the corresponding tour
reviewSchema.post(/^findOneAnd/, async function () {
  console.log("this.doc", this.doc);
  await this.doc.constructor.calculateAvgRating(this.doc.tour);
  //this line on 77 keeps throwing an error of not being a functions
  //happens on the delete query calls
});

reviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};
//populates/changes our objectIds into their objects, then returns the specified fields
reviewSchema.pre(/^find/, function (next) {
  this.populate("user", "-password -__v -tokens -createdAt -updatedAt");
  next();
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
