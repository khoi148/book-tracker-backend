const mongoose = require("mongoose");
const { Category } = require("./categorySchema.js");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Item must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  categories: { type: Array, required: false },
});
// ...
itemSchema.pre("save", async function (next) {
  const promises = this.categories.map(
    async (id) => await Category.findById(id)
  );
  this.categories = await Promise.all(promises);
  next();
});

//arg1: create table called 'user', based on the arg2 schema,
const Item = mongoose.model("items", itemSchema, "items");
module.exports = Item;
