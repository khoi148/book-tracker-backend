const Tour = require("../models/tourSchema");

exports.listTours = async function (req, res, next) {
  try {
    const tours = await Tour.find({});
    res.json({ status: "success", data: tours });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.readTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ status: "fail", message: "Tour not found" });
    res.json({ status: "success", data: tour });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
const { createOne } = require("./handlerFactory");
exports.createTour = createOne(Tour);

const { updateOne } = require("./handlerFactory");
exports.updateTour = updateOne(Tour);

const { deleteOne } = require("./handlerFactory");
exports.deleteTour = deleteOne(Tour);
