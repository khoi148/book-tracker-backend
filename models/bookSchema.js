const mongoose = require("mongoose");
const { genreSchema } = require("./genreSchema.js");
const { authorSchema } = require("./authorSchema.js");

const bookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  created: {
    type: Date,
    required: [true, "Created date is required"],
  },
  author: [authorSchema],
  genre: [genreSchema],
});
//arg1: create table called 'user', based on the arg2 schema,
const Book = mongoose.model("book", bookSchema, "book");
module.exports = Book;
