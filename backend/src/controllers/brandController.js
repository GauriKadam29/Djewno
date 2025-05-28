const { addBrand, getBrands, getBrandById, updateBrand, deleteBrand } = require("../models/brandModel");

const addBrandController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Brand name is required" });

    const brand = await addBrand(name);
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrandsController = async (req, res) => {
  try {
    const brands = await getBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandById(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Brand name is required" });

    const updatedBrand = await updateBrand(id, name);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteBrand(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBrandController, getBrandsController, getBrandByIdController, updateBrandController, deleteBrandController };
