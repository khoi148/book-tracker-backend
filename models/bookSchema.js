const mongoose = require("mongoose");
const { genreSchema, Genre } = require("./genreSchema.js");
const { authorSchema, Author } = require("./authorSchema.js");

const bookSchema = new mongoose.Schema({
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
});
// ...
bookSchema.pre("save", async function (next) {
  this.author = await Author.findById(this.author);
  next();
});
bookSchema.pre("save", async function (next) {
  const promises = this.genres.map(async (id) => await Genre.findById(id));
  this.genres = await Promise.all(promises);
  next();
});

//arg1: create table called 'user', based on the arg2 schema,
const Book = mongoose.model("book", bookSchema, "book");
module.exports = Book;
