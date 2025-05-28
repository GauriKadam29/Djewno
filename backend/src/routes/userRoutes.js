const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication
// const isAdmin = require("../middleware/isAdmin");


// 🔹 Get user profile
router.get("/profile", authMiddleware, UserController.getProfile);

// 🔹 Update user profile
router.put("/profile", authMiddleware, UserController.updateProfile);

// router.get("/get-all-users", authMiddleware, isAdmin, UserController.getAllUsers);
// router.get("/all-users", authMiddleware, UserController.getAllUsers);
router.get("/all-users", UserController.getAllUsers);

// 🔹 Delete user account
router.delete("/delete-account", authMiddleware, UserController.deleteAccount); 



module.exports = router;
