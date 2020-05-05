const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    try {
      const tour = await Model.create({ ...req.body, user: req.user._id });
      res.status(201).json({ status: "success", data: tour });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "createTour error, " + err.message });
    }
  });

// original deleteReview handler
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //check if current logged in user, matches the review you want to delete
    const doc = await Model.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    //Note: if you adjust ID, by incrementing a num, this logic below executes.
    //However, if you delete a whole integer from the string, you get a different error, Mongoose recognizes it's not even an ID
    if (!doc)
      return next(
        /*Make sure to 'return' */
        new AppError(
          404,
          "There is no such item to delete, belonging to this user"
        )
      );
    //note, if you use code 204, the object in your .json(...) doesn't get display
    res.status(201).json({ status: "success", data: doc });
  });

exports.updateOne = (Model) =>
  catchAsync(async function (req, res) {
    // check doc & owner
    const doc = await Model.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!doc)
      return next(
        /*Make sure to 'return' */
        new AppError(
          404,
          "There is no such item to update, belonging to this user"
        )
      );
    // specify which fields are allowed to be edited
    let allows = [];
    //Model.modelName is the name of the model which we defined in mongoose.model("name", schemaVariable)
    switch (Model.modelName) {
      case "tours":
        allows = ["title", "description", "guides"];
        break;
      case "reviews":
        allows = ["rating", "review"];
        break;
      default:
        allows = [];
    }
    Object.keys(req.body).forEach((el) => {
      if (allows.includes(el)) doc[el] = req.body[el];
    });
    // save
    await doc.save();
    res.json({ status: "success", data: doc });
  });
