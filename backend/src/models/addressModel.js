const db = require("../../config/db");

const AddressModel = {
    async addAddress(userId, full_name, phone, address_line1, address_line2, city, state, country, pincode) {
        const query = `
            INSERT INTO addresses (user_id, full_name, phone, address_line1, address_line2, city, state, country, pincode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [userId, full_name, phone, address_line1, address_line2, city, state, country, pincode]);
        return result.insertId;
    },

    async getUserAddresses(userId) {
        const query = "SELECT * FROM addresses WHERE user_id = ?";
        const [rows] = await db.execute(query, [userId]);
        return rows;
    },

    async deleteAddress(userId, addressId) {
        const query = "DELETE FROM addresses WHERE user_id = ? AND id = ?";
        await db.execute(query, [userId, addressId]);
    }
};

module.exports = AddressModel;
