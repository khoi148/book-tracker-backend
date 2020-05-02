const User = require("../models/userSchema");

exports.loginUser = async function (req, res) {
  // make sure there are email and password in the request
  const { email, password } = req.body;
  if (!email && !password) throw new Error("Email and password are required");
  try {
    // authenticate user. Make sure to await these async functions
    const user = await User.loginWithEmail(email, password);
    const token = await user.generateToken(); //saves token to user, and returns the token
    res.json({ status: "success", data: { user, token } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
