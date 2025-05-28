const fs = require("fs");
const path = require("path");
// const pool = require("../../config/db");
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct, materials, gemstones, searchProductsModel } = require("../models/productModel");

const addProductController = async (req, res) => {
  try {
    const { name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, material, gemstone } = req.body;
    if (!name || !price || !product_status || !category_id) return res.status(400).json({ message: "Required fields are missing" });

    let images = [];
    if (req.files) {
      images = req.files.map(file => file.path);
    } else if (req.file) {
      images = [req.file.path];
    }

    const product = await addProduct({ name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getProductsController = async (req, res) => {


//   try {
//     const { name } = req.query;
//     const products = await getProducts(name);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getProductsController = async (req, res) => {
  try {
    const { name, best_seller } = req.query;

    // Convert best_seller to a boolean value if it's provided
    const bestSellerValue =
      best_seller !== undefined ? best_seller === "1" || best_seller === "true" : undefined;

    const products = await getProducts(name, bestSellerValue);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const updateProductController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, material, gemstone } = req.body;

//     let images = [];
//     if (req.files) {
//       images = req.files.map(file => file.path);
//     } else if (req.file) {
//       images = [req.file.path];
//     }

//     const updatedProduct = await updateProduct(id, { name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone });
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body }; // Capture only provided fields

    if (req.files) {
      updates.images = req.files.map(file => file.path);
    } else if (req.file) {
      updates.images = [req.file.path];
    }

    const result = await updateProduct(id, updates);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found or no changes made." });
    }

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// const deleteProductController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await deleteProduct(id);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch product details including images
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product Images:", product.images); // Debugging log

    // Check if images exist and handle different formats
    let imagePaths = [];

    if (product.images) {
      if (typeof product.images === "string") {
        try {
          // Try parsing JSON (if stored as '["img1.jpg", "img2.jpg"]')
          imagePaths = JSON.parse(product.images);
        } catch (error) {
          // If parsing fails, assume it's a single image string
          imagePaths = [product.images];
        }
      } else if (Array.isArray(product.images)) {
        imagePaths = product.images; // Already an array
      }
    }

    console.log("Image Paths to Delete:", imagePaths); // Debugging log

    // Delete images from `uploads/` folder
    imagePaths.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "../../uploads", path.basename(imagePath));
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${fullPath}`, err);
        }
      });
    });

    // Delete product from database
    const result = await deleteProduct(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};



const getStaticValuesController = (req, res) => {
  const staticValues = {
    // materials: ["Gold", "Platinum", "Rose Gold", "Silk", "Sterling Silver", "White Gold"],
    // gemstones: ["Aquamarine", "Diamond", "Onyx", "Pearl", "Sapphire", "Tanzenite", "Turquoise"],
    materials,
    gemstones,
  };

  res.status(200).json(staticValues);
};


const searchProducts = async (req, res) => {
  try {
    let { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    query = query.trim(); // ✅ Trim spaces & newlines
    // console.log("🔍 Cleaned Query:", query);

    const products = await searchProductsModel(query);
    // console.log("✅ Found Products:", products);

    res.json(products);
  } catch (error) {
    console.error("❌ Error in searchProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = { addProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController, getStaticValuesController , searchProducts  };




