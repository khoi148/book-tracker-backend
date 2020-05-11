const User = require("../models/userSchema");

exports.loginUser = async function (req, res) {
  // make sure there are email and password in the request
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("no email or pw");
      throw new Error("Email and password are required");
    }
    // authenticate user. Make sure to await these async functions
    const user = await User.loginWithEmail(email, password);
    const token = await user.generateToken(); //saves token to user, and returns the token
    res.json({ status: "success", data: { user, token } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};
