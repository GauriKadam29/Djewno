const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const AddressController = require("../controllers/addressController");

// ✅ Add Address
router.post("/", authMiddleware, AddressController.addAddress);

// ✅ Get User Addresses
router.get("/", authMiddleware, AddressController.getUserAddresses);

// ✅ Delete Address
router.delete("/:id", authMiddleware, AddressController.deleteAddress);

module.exports = router;
