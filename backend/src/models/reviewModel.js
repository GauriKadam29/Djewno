const pool = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

// Add Review
const addReview = async (product_id, user_id, rating, comment) => {
    const id = uuidv4();
    const query = "INSERT INTO reviews (id, product_id, user_id, rating, comment) VALUES (?, ?, ?, ?, ?)";
    await pool.execute(query, [id, product_id, user_id, rating, comment]);
    return { id, product_id, user_id, rating, comment };
};

// Get Reviews by Product
const getReviewsByProduct = async (product_id) => {
    const query = "SELECT * FROM reviews WHERE product_id = ?";
    const [rows] = await pool.execute(query, [product_id]);
    return rows;
};

// Delete Review
const deleteReview = async (id, user_id) => {
    const query = "DELETE FROM reviews WHERE id = ? AND user_id = ?";
    const [result] = await pool.execute(query, [id, user_id]);
    return result.affectedRows;
};

module.exports = { addReview, getReviewsByProduct, deleteReview };
