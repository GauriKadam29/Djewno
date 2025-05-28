const express = require("express");
const { createReview, fetchReviewsByProduct, removeReview } = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, createReview); // ✅ Add a review (Auth required)
router.get("/:product_id", fetchReviewsByProduct); // ✅ Get reviews for a product
router.delete("/:id", protect, removeReview); // ✅ Delete own review (Auth required)

module.exports = router;
