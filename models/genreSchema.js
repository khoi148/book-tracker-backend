const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
});
//arg1: create table called 'user', based on the arg2 schema,
const Genre = mongoose.model("genre", genreSchema, "genre");
module.exports = { genreSchema, Genre };
