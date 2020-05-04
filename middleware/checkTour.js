const Tour = require("../models/tourSchema.js");

exports.checkTour = async (req, res, next) => {
  try {
    if (req.body.tour && (await Tour.exists({ _id: req.body.tour }))) next();
  } catch (error) {
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  }
};
