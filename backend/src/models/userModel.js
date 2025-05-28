const db = require("../../config/db");

const UserModel = {
    // Fetch user details by ID
    findUserById: async (userId) => {
        const query = "SELECT id, name, email, phone FROM users WHERE id = ?";
        const [rows] = await db.execute(query, [userId]);
        return rows.length ? rows[0] : null;
    },

    // Fetch all addresses of a user
    getUserAddresses: async (userId) => {
        const query = `
            SELECT id, full_name, phone, address_line1, address_line2, city, state, country, pincode 
            FROM addresses WHERE user_id = ?`;
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    // Update user profile
    // updateUserProfile: async (userId, name, email, phone) => {
    //     const query = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
    //     await db.execute(query, [name, email, phone, userId]);
    // },

    updateUserProfile: async (userId, name, email, phone) => {
        try {
            const query = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
            const [result] = await db.execute(query, [name, email, phone, userId]);
    
            if (result.affectedRows === 0) {
                return { success: false, message: "User not found or no changes made" };
            }
    
            return { success: true, message: "Profile updated successfully" };
        } catch (error) {
            throw new Error("Database error: " + error.message);
        }
    },
    

    // Check if email already exists (excluding the current user)
    findUserByEmail: async (email) => {
        const query = "SELECT id FROM users WHERE email = ?";
        const [rows] = await db.execute(query, [email]);
        return rows.length ? rows[0] : null;
    },

    // Delete user and related addresses
    deleteUser: async (userId) => {
        await db.execute("DELETE FROM addresses WHERE user_id = ?", [userId]); // Delete addresses first
        await db.execute("DELETE FROM users WHERE id = ?", [userId]); // Then delete the user
    },
    // models/UserModel.js
    getAllUsers: async () => {
        const [users] = await db.execute("SELECT id, name, email FROM users ORDER BY created_at DESC");
        return users;
      },

};

module.exports = UserModel;
