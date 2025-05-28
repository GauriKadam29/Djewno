const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const AuthModel = require("../models/authModel");
const {sendEmail} = require("../../config/email");


require("dotenv").config();

const AuthController = {
    // 🔹 Register
    async register(req, res) {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const existingUser = await AuthModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = uuidv4();

            await AuthModel.createUser(userId, name, email, hashedPassword);

            // Send Welcome Email
            const emailContent = `<h2>Welcome to Djewno, ${name}!</h2>
        <p>Thank you for registering. We are excited to have you on board.</p>`;
            await sendEmail(email, "Welcome to Djewno", emailContent);

            res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // 🔹 Login
    async login(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        try {
            const user = await AuthModel.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
    
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },  // ✅ Add 'name' in the token
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
    
            res.status(200).json({ message: "Login successful", token });
    
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    
    // 🔹 Forgot Password
    async forgotPassword(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        try {
            const user = await AuthModel.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            await AuthModel.updateResetToken(email, resetToken);

            // Send Password Reset Email
            const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
            const emailContent = `<h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>`;
            await sendEmail(email, "Reset Your Password", emailContent);

            res.status(200).json({ message: "Password reset email sent" });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // 🔹 Reset Password
    async resetPassword(req, res) {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await AuthModel.resetPassword(resetToken, hashedPassword);

            res.status(200).json({ message: "Password reset successful" });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // 🔹 Get User Profile
    async getProfile(req, res) {
        try {
            const userId = req.user.id;  // Extract user ID from token
            const user = await AuthModel.findUserById(userId); // Fetch user from DB
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({
                id: user.id,
                name: user.name,  // ✅ Make sure 'name' exists
                email: user.email,
            });
    
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
    

};




module.exports = AuthController;
