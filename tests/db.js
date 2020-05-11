const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Alex",
  email: "alex123@gmail.com",
  password: "12345",
  tokens: [jwt.sign({ _id: userOneId }, process.env.secret)],
};

module.exports = { userOneId, userOne };
