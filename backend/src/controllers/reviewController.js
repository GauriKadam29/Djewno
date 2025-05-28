const { addReview, getReviewsByProduct, deleteReview } = require("../models/reviewModel");

const createReview = async (req, res) => {
    try {
        console.log("Received Data:", req.body);  
        const { product_id, rating, comment } = req.body;
        const user_id = req.user.id; // Extracted from token

        if (!product_id || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const review = await addReview(product_id, user_id, rating, comment);
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const fetchReviewsByProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        // console.log("Fetching reviews for:", product_id);
        const reviews = await getReviewsByProduct(product_id);
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const removeReview = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const deleted = await deleteReview(id, user_id);
        if (!deleted) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createReview, fetchReviewsByProduct, removeReview };
