const User = require("../models/userSchema");

exports.createUser = async function (req, res) {
  const { name, email, password, pwconfirm } = req.body;
  if (pwconfirm !== password || pwconfirm === null)
    res.status(400).send({
      status: "fail",
      message: "password confirm does not match password",
    });

  try {
    const user = await User.create({ name, email, password }); //shorthand, JS will set property 'name' to 'name', etc.
    const token = user.generateToken();
    return res.status(201).json({ status: "ok", data: { user, token } });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "fail",
      error: e.errmsg,
    });
  }
};
