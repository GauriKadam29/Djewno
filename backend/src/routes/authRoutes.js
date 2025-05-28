const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
  });

module.exports = router;
