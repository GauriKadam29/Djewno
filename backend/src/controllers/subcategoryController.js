const { addSubcategory, getSubcategories, getSubcategoryById, updateSubcategory, deleteSubcategory } = require("../models/subcategoryModel");

const addSubcategoryController = async (req, res) => {
  try {
    const { name, category_id } = req.body;
    if (!name || !category_id) return res.status(400).json({ message: "Name and category_id are required" });

    const subcategory = await addSubcategory(name, category_id);
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubcategoriesController = async (req, res) => {
  try {
    const subcategories = await getSubcategories();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubcategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await getSubcategoryById(id);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;
    if (!name || !category_id) return res.status(400).json({ message: "Name and category_id are required" });

    const updatedSubcategory = await updateSubcategory(id, name, category_id);
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSubcategory(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSubcategoryController, getSubcategoriesController, getSubcategoryByIdController, updateSubcategoryController, deleteSubcategoryController };
