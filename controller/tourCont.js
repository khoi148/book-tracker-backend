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

exports.createTour = async function (req, res) {
  try {
    console.log(req.user);
    const tour = await Tour.create({ ...req.body, organizer: req.user._id });
    res.status(201).json({ status: "success", data: tour });
  } catch (err) {
    res
      .status(400)
      .json({ status: "fail", message: "createTour error, " + err.message });
  }
};

exports.updateTour = async function (req, res, next) {
  Tour.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    //note that the .then function input here, actually will returned the outdated element (before it gets updated)...
    //So we need to get the curreny element, by using a Mongoose getter right after
    Tour.findOne({ _id: req.params.id }).then(function (tour) {
      res.send(tour);
    });
  });
};

exports.deleteTour = async function (req, res, next) {
  Tour.findByIdAndRemove({ _id: req.params.id }).then(function (tour) {
    if (tour === null)
      res.send({ message: "no category by that ID found for deletion" });
    else res.send(tour);
  });
};
