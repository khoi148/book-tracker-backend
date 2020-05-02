const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
exports.authenticate = async (req, res, next) => {
  // make sure we get the token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return res.status(401).json({ status: "fail", message: "Unauthorized" });

  // verify token
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.secret);
    // find User with token
    const user = await User.findOne({ _id: decoded.id, tokens: token });
    if (!user) throw new Error("Unauthorized");

    // attach user object to req object
    console.log("Authorized");
    req.user = user;
    return next();
  } catch (err) {
    console.log("not Authorized");
    return res.status(401).json({ status: "fail", message: err.message });
  }
};
