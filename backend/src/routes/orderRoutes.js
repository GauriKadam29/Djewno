const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to place an order
router.post("/place-order", authMiddleware, OrderController.placeOrder);

// Route to get user's orders
router.get("/my-orders", authMiddleware, OrderController.getOrders);


router.get("/all-orders", OrderController.getAllOrders); // No auth if you just want it open for now
router.put('/update-status/:id', OrderController.updateOrderStatus);
module.exports = router;
