const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
    unique: true,
  },
});

const Author = mongoose.model("author", authorSchema, "author");
module.exports = { Author, authorSchema };
