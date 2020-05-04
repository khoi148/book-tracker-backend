const router = require("express").Router();
//middleware
const { authenticate } = require("../middleware/authenticate");

//Tour routes
const {
  listTours,
  createTour,
  readTour,
  deleteTour,
  updateTour,
} = require("../controller/tourCont.js");
router.route("/tours").get(authenticate, listTours);
router.route("/tours").post(authenticate, createTour);
router.route("/read-tour/:id").get(authenticate, readTour);
router.put("/tours/:id", authenticate, updateTour);
router.delete("/tours/:id", authenticate, deleteTour);

module.exports = router;
