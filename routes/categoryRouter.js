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

const { catchAsync } = require("../utils/catchAsync");
const Category = require("../models/categorySchema");
router.get(
  "/create",
  catchAsync(async (req, res, next) => {
    const arr = [
      { category: "japan" },
      { category: "russia" },
      { category: "vietnam" },
      { category: "korea" },
      { category: "china" },
      { category: "usa" },
      { category: "thailand" },
      { category: "australia" },
      { category: "asia" },
      { category: "europe" },
      { category: "SEA" },
    ];
    const cates = await Category.insertMany(arr);
    res.json(cates);
  })
);
module.exports = router;
