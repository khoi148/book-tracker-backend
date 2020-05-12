const User = require("../models/userSchema");
const { catchAsync } = require("../utils/catchAsync.js");

exports.listUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  return res.json({ status: "success", data: users });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, pwconfirm } = req.body;
  if (pwconfirm !== password || pwconfirm === null)
    return res.status(400).send({
      status: "fail",
      message: "password confirm does not match password",
    });
  //make sure to await the create, and token methods. They are async
  const user = await User.create({ name, email, password }); //shorthand, JS will set property 'name' to 'name', etc.
  const token = await user.generateToken();
  return res.json({ status: "success", data: { user, token } });
});

exports.lookupUser = catchAsync(async (req, res) => {
  console.log("upload", req.avatar);
  res.status(200).send({ status: "success", data: userRef });
});
