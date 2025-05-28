const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../../config/db");
const { addProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController, getStaticValuesController, searchProducts } = require("../controllers/productController");

const router = express.Router();

// Multer Setup for Image Uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Search products API
// router.get("/search", async (req, res) => {
//   try {
//       const { query } = req.query;
//       if (!query) return res.json([]);

//       console.log("🔍 Received search query:", query);

//       const [products] = await db.execute(
//           `SELECT p.* 
//           FROM products p
//           LEFT JOIN categories c ON p.category_id = c.id
//           LEFT JOIN subcategories s ON p.subcategory_id = s.id
//           WHERE p.name LIKE ? 
//           OR c.name LIKE ?
//           OR s.name LIKE ?`,
//           [`%${query}%`, `%${query}%`, `%${query}%`]
//       );

//       console.log("✅ Search results:", products); // Debug output

//       res.json(products);
//   } catch (error) {
//       console.error("❌ Search error:", error);
//       res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });







// Routes
router.post("/add-product", upload.array("images", 5), addProductController);
router.get("/get-products", getProductsController);
router.get("/get-product/:id", getProductByIdController);
router.put("/update-product/:id", upload.array("images", 5), updateProductController);
router.delete("/delete-product/:id", deleteProductController);
router.get("/static/values", getStaticValuesController);
router.get("/search", searchProducts );

module.exports = router;


