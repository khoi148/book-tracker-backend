const router = require("express").Router();
//middleware
const { authenticate } = require("../middleware/authenticate");
const { checkTour } = require("../middleware/checkTour");

//reviews routes
const { createReview, readReview } = require("../controller/reviewCont");
router.get("/reviews", authenticate, readReview);
router.post("/reviews", authenticate, checkTour, createReview);

module.exports = router;
