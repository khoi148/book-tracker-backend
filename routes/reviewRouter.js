const router = require("express").Router();
//middleware
const { authenticate } = require("../middleware/authenticate");
const { checkTour } = require("../middleware/checkTour");

//reviews routes
const {
  createOrEditReview,
  readReview,
  listReviews,
  deleteReview,
  updateReview,
  createReview,
} = require("../controller/reviewCont");
router.get("/reviews/:id", authenticate, readReview);
router.delete("/reviews/:id", authenticate, deleteReview);
router.get("/reviews", authenticate, listReviews);

router.post("/reviews", authenticate, checkTour, createReview);
router.put("/reviews/:id", authenticate, updateReview);

module.exports = router;
