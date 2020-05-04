const Tour = require("../models/tourSchema.js");

exports.checkTour = async (req, res, next) => {
  try {
    if (!req.body.tour) throw new Error("request has no tour property");
    const tour = await Tour.findById({ _id: req.body.tour });
    req.tour = tour;
    next();
  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
};
