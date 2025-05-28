const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        console.log("Search Query:", q); // Debugging
        if (!q) return res.json([]);

        const query = `
            SELECT id, name, price, discount_price, images
            FROM products
            WHERE name LIKE ?
            LIMIT 10;
        `;
        const values = [`%${q}%`];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error("Database Error:", err.message); // Debugging
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
