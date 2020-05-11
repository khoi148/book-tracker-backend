const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
exports.authenticate = async (req, res, next) => {
  // make sure we get the token
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      throw new Error("no auth token");
    }
    // verify token
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.secret);
    // find User with token
    const user = await User.findOne({ _id: decoded._id, tokens: token });
    if (!user) throw new Error("Unauthorized wrong");
    // attach user object to req object
    console.log("Authorized");
    req.user = user;
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).send();
  }
};
