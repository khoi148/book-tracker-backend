const mongoose = require("mongoose");
const User = require("../models/userSchema");
const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Tour must have a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Tour must have a description"],
      trim: true,
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
        required: [true, "Tour must have a category"],
      },
    ],
    //new fields
    duration: {
      type: Number,
      required: [true, "Tour must have a duration"],
    },
    price: {
      type: Number,
      required: [true, "Tour must have a price"],
      min: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be below 5.0"],
      set: (value) => Math.round(value * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    //foreign references
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Tour must have an organizer"],
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.virtual("reviews", {
  ref: "reviews", //data table we are referring to
  localField: "_id", //localField is where we start from, so start from _id in the reviews collection
  foreignField: "tour", //the model, foreign keys we are referencing to
  //count: true, will only put a prop that has the number of review documents associated. Don't use it, to just show simpled embedded documents
});

//middleware that ensures that the guides in the user matches the one in the DB
tourSchema.pre("save", async function (next) {
  if (!this.isModified("guides")) return next();
  const found = await User.find({ _id: { $in: this.guides } }).select("_id");
  if (found.length !== this.guides.length)
    throw new Error("guide(s) doesn't exist");
  next();
});
//populates/changes our objectIds into their objects, then returns the specified fields
tourSchema.pre(/^find/, function (next) {
  this.populate("organizer", "-password -__v -tokens -createdAt -updatedAt")
    .populate("guides", "_id name")
    .populate("category", "category");
  next();
});

const Tour = mongoose.model("tours", tourSchema);
module.exports = Tour;
