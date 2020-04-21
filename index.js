const express = require("express");
require("dotenv").config({ path: ".env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/api");
//set up
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //middleware to read the request body

//connect to mongodb
const connectionString = process.env.DB_LOCAL;
mongoose.connect(connectionString, {
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

//init routes
app.use("/api", router);

//error handling middleware. Any 'next' callback calls in your routers above, then go here
app.use(function (err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err._message });
});

//list for requests
app.listen(process.env.PORT || 3000, function () {
  console.log("now listening for requests");
});
