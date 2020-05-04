const express = require("express");
const router = express.Router();

//home default route
router.get("/", async function (req, res, next) {
  res.send({ status: "success", data: "application routes are working" });
});

/*process of creating new collection in database
//1. new schema,
//2. new route and controller
//3.create a new instance of that schema,
//4.Write to database*/
module.exports = router;
