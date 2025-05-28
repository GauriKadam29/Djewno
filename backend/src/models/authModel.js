const pool = require("../../config/db");

const AuthModel = {
     createUser: async(id, name, email, password)=> {
        const query = "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
        await pool.execute(query, [id, name, email, password]);
    },

     findUserById: async(id) =>{
        const [rows] = await pool.execute("SELECT id, name, email FROM users WHERE id = ?", [id]);
        
        console.log("Database Query Result:", rows);  // 🔹 Debugging
    
        return rows.length ? rows[0] : null;
      },
    // Find user by email
    findUserByEmail: async (email) => {
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Store reset token in the database
    updateResetToken: async (email, resetToken) => {
        await pool.execute("UPDATE users SET reset_token = ? WHERE email = ?", [resetToken, email]);
    },

    // Find user by reset token
    findUserByResetToken: async (resetToken) => {
        const [rows] = await pool.execute("SELECT * FROM users WHERE reset_token = ?", [resetToken]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Reset the password and remove the reset token
    resetPassword: async (resetToken, newPassword) => {
        await pool.execute("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [newPassword, resetToken]);
    }
};  

module.exports = AuthModel;
