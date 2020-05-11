const router = require("express").Router();

// 404 handler
function errorHandler(err, req, res, next) {
  // default err object of undefined
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

router.all("/*", async function (req, res, next) {
  res.status(404).send({ status: "fail", message: "wrong URL not found" });
});

module.exports = router;
