const express = require("express");
const { addSubcategoryController, getSubcategoriesController, getSubcategoryByIdController, updateSubcategoryController, deleteSubcategoryController } = require("../controllers/subcategoryController");

const router = express.Router();

router.post("/add-subcategory", addSubcategoryController);
router.get("/get-subcategories", getSubcategoriesController);
router.get("/get-subcategory/:id", getSubcategoryByIdController);
router.put("/update-subcategory/:id", updateSubcategoryController);
router.delete("/delete-subcategory/:id", deleteSubcategoryController);

module.exports = router;


