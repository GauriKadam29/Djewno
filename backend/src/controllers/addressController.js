const AddressModel = require("../models/addressModel");

const AddressController = {
    async addAddress(req, res) {
        const { full_name, phone, address_line1, address_line2, city, state, country, pincode } = req.body;
        const userId = req.user.id;  // Get user from token

        if (!full_name || !phone || !address_line1 || !city || !state || !pincode) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const addressId = await AddressModel.addAddress(userId, full_name, phone, address_line1, address_line2, city, state, country, pincode);
            res.status(201).json({ message: "Address added successfully", addressId });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    async getUserAddresses(req, res) {
        const userId = req.user.id;

        try {
            const addresses = await AddressModel.getUserAddresses(userId);
            res.status(200).json(addresses);

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    async deleteAddress(req, res) {
        const userId = req.user.id;
        const addressId = req.params.id;

        try {
            await AddressModel.deleteAddress(userId, addressId);
            res.status(200).json({ message: "Address deleted successfully" });

        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
};

module.exports = AddressController;
