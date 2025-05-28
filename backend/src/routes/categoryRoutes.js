


const express = require("express");
const { addCategoryController, getCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

router.post("/add-category", addCategoryController);
router.get("/get-categories", getCategoriesController);
router.get("/get-category/:id", getCategoryByIdController);
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;





