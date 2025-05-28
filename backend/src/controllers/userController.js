const UserModel = require("../models/userModel");

const UserController = {
    // 🔹 Get User Profile with Addresses
    async getProfile(req, res) {
        try {
            const userId = req.user.id;  // Extract user ID from token

            // Fetch user details
            const user = await UserModel.findUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Fetch all addresses of the user
            const addresses = await UserModel.getUserAddresses(userId);

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                addresses // Include all addresses
            });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // 🔹 Update User Profile
    // async updateProfile(req, res) {
    //     const userId = req.user.id; // Get user ID from token
    //     const { name, email, phone, addresses  } = req.body; // Get data from request

    //     if (!name || !email || !phone) {
    //         return res.status(400).json({ message: "All fields are required" });
    //     }

    //     try {
    //         // Check if the new email is already taken by another user
    //         const existingUser = await UserModel.findUserByEmail(email);
    //         if (existingUser && existingUser.id !== userId) {
    //             return res.status(400).json({ message: "Email is already in use" });
    //         }

    //         // Update user profile
    //         await UserModel.updateUserProfile(userId, name, email, phone, addresses);

    //         res.status(200).json({ message: "Profile updated successfully" });

    //     } catch (error) {
    //         res.status(500).json({ message: "Server error", error: error.message });
    //     }
    // },


    async updateProfile(req, res) {
        const userId = req.user.id; // Get user ID from token
        const { name, email, phone, addresses } = req.body; // Get data from request

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        try {
            // Check if the new email is already taken by another user
            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser && existingUser.id !== userId) {
                return res.status(400).json({ success: false, message: "Email is already in use" });
            }

            // Update user profile
            const updateResult = await UserModel.updateUserProfile(userId, name, email, phone, addresses);

            if (!updateResult.success) {
                return res.status(404).json({ success: false, message: "User not found or no changes made" });
            }

            res.status(200).json({ success: true, message: "Profile updated successfully" });

        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    },


    // 🔹 Delete User Account
    async deleteAccount(req, res) {
        const userId = req.user.id; // Get user ID from token

        try {
            // Delete user and their addresses
            await UserModel.deleteUser(userId);

            res.status(200).json({ message: "Account deleted successfully" });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    // controllers/UserController.js
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },


};

module.exports = UserController;
