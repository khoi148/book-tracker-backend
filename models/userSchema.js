const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      trim: true,
      unique: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
    },
    tokens: [
      {
        type: String,
      },
    ], // array of tokens
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
// import bcrypt

const saltRounds = 10;
// ....
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.statics.loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Unable to login");
  }
  return user;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.secret, {
    expiresIn: "7d",
  });
  user.tokens.push(token);
  await user.save();
  return token;
};

//arg1: create table called 'user', based on the arg2 schema,
const User = mongoose.model("users", userSchema, "users");
module.exports = User;
