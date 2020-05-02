const mongoose = require("mongoose");
const { genreSchema, Genre } = require("./genreSchema.js");
const { authorSchema, Author } = require("./authorSchema.js");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Book must have a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Book must have a description"],
      trim: true,
    },
    author: { type: Object, required: true },
    genres: { type: Array, required: false },
    owner: {
      type: Object,
      require: [true, "Blog must have an owner"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
bookSchema.virtual("reviews", {
  ref: "reviews", //data table we are referring to
  localField: "_id", //localField is where we start from, so start from _id in the reviews collection
  foreignField: "bookId", //the model, foreign keys we are referencing to
  //count: true, will only put a prop that has the number of review documents associated. Don't use it, to just show simpled embedded documents
});

// ...Every time we create a book, using save() to mongoose, with a author object id, insert the find author object before Mongoose saves to DB
bookSchema.pre("save", async function (next) {
  this.author = await Author.findById(this.author);
  next();
});
//same thing, like above, but for genre ids - will be converted to Genre objects by Mongoose before being saved to noSql DB
bookSchema.pre("save", async function (next) {
  const promises = this.genres.map(async (id) => await Genre.findById(id));
  this.genres = await Promise.all(promises);
  next();
});

//arg1: create table called 'user', based on the arg2 schema,
const Book = mongoose.model("book", bookSchema, "book");
module.exports = Book;
