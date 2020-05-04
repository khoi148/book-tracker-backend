//Tours-Project Branch, setup
const express = require("express");
const app = express();
require("dotenv").config({ path: ".env" }); //specify where env is, while using Express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//middleware to read request body in JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongodb
const connectionString = process.env.DB_LOCAL;
mongoose.connect(connectionString, {
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//init routes
app.use(require("./routes/api"));
app.use(require("./routes/userRouter"));
app.use(require("./routes/reviewRouter"));
app.use(require("./routes/tourRouter"));
app.use(require("./routes/categoryRouter"));

//error handling middleware. Any 'next' callback calls in your routers above, then go here
app.use(function (err, req, res, next) {
  console.log("this is an error", err);
  res.status(422).send({ ...err });
});

//listen for requests, on app start
app.listen(process.env.PORT || 3000, function () {
  console.log("now listening for requests");
});
