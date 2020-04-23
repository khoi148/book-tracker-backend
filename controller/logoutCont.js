const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.logoutUser = async function (req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens = req.user.tokens.filter((el) => el !== token);
    await req.user.save(); //authenticate middleware is already setting user to the real JS object representing your user from the Database
    res.status(204).json({
      status: "success",
      data: "successfully logged out. Token removed",
    });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err.message });
  }
};

exports.logoutUserAll = async function (req, res) {
  try {
    req.user.tokens = [];
    await req.user.save(); //authenticate middleware is already setting user to the real JS object representing your user from the Database
    res.status(204).json({
      status: "success",
      data: "successfully logged out. All Tokens removed",
    });
  } catch (err) {
    res.status(401).json({ status: "fail", message: err.message });
  }
};
