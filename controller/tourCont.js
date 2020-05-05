const Tour = require("../models/tourSchema");
const AppError = require("../utils/appError");

exports.listTours = async function (req, res, next) {
  try {
    const tours = await Tour.find({}).populate("user", "name email");
    res.json({ status: "success", data: tours });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

//this method returns a list of tours, that meet filter conditions
exports.readTours = async (req, res, next) => {
  const filters = { ...req.query };
  const paginationKeys = ["limit", "page", "sort"];
  const options = {};
  paginationKeys.map((el) => {
    delete filters[el];
  });
  console.log(filters);
  //start the query, then start chaing the query
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;
  const query = Tour.find(filters).skip(skip).limit(limit); //pagination
  //execute query
  const tours = await query;
  const countTours = await Tour.find(filters).countDocuments();
  if (req.query.page && skip > countTours)
    return next(new AppError(400, "Page number out of range"));
  if (req.query.sort) {
    const sortOptions = req.query.sort.split(",").join(" ");
    query.sort(sortOptions);
  } else {
    query.sort("-createdAt"); //sort by createdTime by default. Newest ones first
  }
  let message = tours.length !== 0 ? tours : "no tours found";
  res.json({ status: "success", message: message });
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
