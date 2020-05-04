const router = require("express").Router();
//middleware
const { authenticate } = require("../middleware/authenticate");

//Categories routes
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryCont.js");
router.get("/categories", listCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;
