const OrderModel = require("../models/orderModel");
const {sendOrderConfirmationEmail} = require("../../config/email"); 
const {getProductById}  = require("../models/productModel"); 
const { saveOrder, saveOrderItems } = require("../models/orderModel"); // adjust path if needed


const OrderController = {
   
   
   

// async placeOrder(req, res) {
//     console.log("📦 Received Order Data:", req.body);

//     try {
//         const { address_id, payment_method, items, total_price } = req.body;
//         const userEmail = req.user.email; // Get user email from token

//         console.log("✅ Extracted Data:", { address_id, payment_method, items, total_price });

//         if (!address_id || !payment_method || !items.length) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // 🔹 Fetch product details using Sequelize
//         const updatedItems = await Promise.all(items.map(async (item) => {
//             // const product = await Product.findByPk(item.product_id); // ✅ Correct Sequelize method
//             const product = await getProductById(item.product_id); // ✅ Use this function from your model


//             if (!product) {
//                 console.warn(`⚠️ Product not found: ${item.product_id}`);
//                 return { name: "Unknown Item", quantity: item.quantity, price: 0 };
//             }

//             return {
//                 name: product.name,
//                 quantity: item.quantity,
//                 price: product.price
//             };
//         }));

//         console.log("🛍️ Updated Order Items:", JSON.stringify(updatedItems, null, 2));

//         // 🔹 Generate an Order ID (replace with actual DB logic)
//         const orderId = Math.floor(100000 + Math.random() * 900000);

//         console.log("📧 Sending order confirmation email to:", userEmail);

//         // 🔹 Send order confirmation email
//         await sendOrderConfirmationEmail(userEmail, orderId, updatedItems, total_price);

//         res.status(201).json({ message: "Order placed successfully!", orderId });

//     } catch (error) {
//         console.error("❌ Order placement error:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// },





async placeOrder(req, res) {
    console.log("📦 Received Order Data:", req.body);

    try {
        const { address_id, payment_method, items, total_price } = req.body;
        const userEmail = req.user.email; // Get user email from token
        const userId = req.user.id; // 🔸 Needed for saving order

        console.log("✅ Extracted Data:", { address_id, payment_method, items, total_price });

        if (!address_id || !payment_method || !items.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 🔹 Fetch product details using Sequelize
        const updatedItems = await Promise.all(items.map(async (item) => {
            const product = await getProductById(item.product_id);

            if (!product) {
                console.warn(`⚠️ Product not found: ${item.product_id}`);
                return { name: "Unknown Item", quantity: item.quantity, price: 0 };
            }

            return {
                product_id: item.product_id, // 🔸 Needed for DB insert
                name: product.name,
                quantity: item.quantity,
                price: product.price
            };
        }));

        console.log("🛍️ Updated Order Items:", JSON.stringify(updatedItems, null, 2));

        // 🔹 Generate an Order ID
        const orderId = Math.floor(100000 + Math.random() * 900000);

        // 🔸 Save order in DB
        await saveOrder(orderId, userId, address_id, payment_method, total_price);

        // 🔸 Save items in DB
        await saveOrderItems(orderId, updatedItems);

        console.log("📧 Sending order confirmation email to:", userEmail);

        // 🔹 Send order confirmation email
        await sendOrderConfirmationEmail(userEmail, orderId, updatedItems, total_price);

        res.status(201).json({ message: "Order placed successfully!", orderId });

    } catch (error) {
        console.error("❌ Order placement error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
},


    

    // async getOrders(req, res) {
    //     try {
    //         const userId = req.user.id;
    //         const orders = await OrderModel.getUserOrders(userId);
    //         res.status(200).json(orders);
    //     } catch (error) {
    //         res.status(500).json({ message: "Server error", error: error.message });
    //     }
    // }

    async getOrders(req, res) {
        try {
            console.log("🧾 Authenticated user:", req.user);
    
            const userId = req.user.id;
    
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized: User ID missing" });
            }
    
            const orders = await OrderModel.getUserOrders(userId);
    
            console.log("📦 Orders fetched:", orders);
    
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found" });
            }
    
            res.status(200).json(orders);
        } catch (error) {
            console.error("❌ Error fetching orders:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    async getAllOrders(req, res) {
        try {
          const orders = await OrderModel.getAllOrders();
          res.status(200).json(orders);
        } catch (error) {
          res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
      },


   

      async updateOrderStatus (req, res) {
        const { id } = req.params;
        const { status } = req.body;
      
        try {
          await OrderModel.updateOrderStatus(id, status);
          res.status(200).json({ message: "Order status updated successfully" });
        } catch (error) {
          console.error("Error updating order status:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      }

    
    
    
};

module.exports = OrderController;
