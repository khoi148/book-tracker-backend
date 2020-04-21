const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    unique: true,
  },
});
//arg1: create table called 'user', based on the arg2 schema,
const Category = mongoose.model("categories", categorySchema, "categories");
module.exports = { categorySchema, Category };
