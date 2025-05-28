const db = require("../../config/db");

const OrderModel = {
    async createOrder(userId, totalPrice) {
        const query = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
        const [result] = await db.execute(query, [userId, totalPrice]);
        return result.insertId;
    },

    async addOrderItems(orderId, cartItems) {
        const query = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
        const values = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
        await db.query(query, [values]);
    },

    async saveOrder(orderId, userId, address_id, payment_method, total_price) {
        const query = `
            INSERT INTO orders (order_id, user_id, address_id, payment_method, total_price)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.execute(query, [orderId, userId, address_id, payment_method, total_price]);
    },
    
    async saveOrderItems(orderId, items) {
        const query = `
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `;
        for (const item of items) {
            await db.execute(query, [orderId, item.product_id, item.quantity, item.price]);
        }
    },

    // async getUserOrders(userId) {
    //     const query = "SELECT * FROM orders WHERE user_id = ?";
    //     const [rows] = await db.execute(query, [userId]);
    //     return rows;
    // }

    async getUserOrders(userId) {
        const query = `
            SELECT 
                o.order_id, o.total_price, o.payment_method, o.status, o.created_at,
                p.id AS product_id, p.name AS product_name, JSON_UNQUOTE(JSON_EXTRACT(p.images, '$[0]')) AS product_image,
                oi.quantity, oi.price
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `;
    
        const [rows] = await db.execute(query, [userId]);
    
        // Grouping orders with their products
        const ordersMap = new Map();
    
        for (const row of rows) {
            if (!ordersMap.has(row.order_id)) {
                ordersMap.set(row.order_id, {
                    order_id: row.order_id,
                    total_price: row.total_price,
                    payment_method: row.payment_method,
                    status: row.status,
                    created_at: row.created_at,
                    products: []
                });
            }
    
            ordersMap.get(row.order_id).products.push({
                product_id: row.product_id,
                name: row.product_name,
                image: row.product_image,
                quantity: row.quantity,
                price: row.price
            });
        }
    
        return Array.from(ordersMap.values());
    },

    async getAllOrders() {
        const query = `
          SELECT 
            o.order_id, o.total_price, o.payment_method, o.status, o.created_at,
            o.user_id, u.name AS user_name, u.email AS user_email,
            p.id AS product_id, p.name AS product_name, 
            JSON_UNQUOTE(JSON_EXTRACT(p.images, '$[0]')) AS product_image,
            oi.quantity, oi.price
          FROM orders o
          JOIN users u ON o.user_id = u.id
          JOIN order_items oi ON o.order_id = oi.order_id
          JOIN products p ON oi.product_id = p.id
          ORDER BY o.created_at DESC
        `;
    
        const [rows] = await db.execute(query);
    
        // Grouping by order
        const ordersMap = new Map();
    
        for (const row of rows) {
          if (!ordersMap.has(row.order_id)) {
            ordersMap.set(row.order_id, {
              order_id: row.order_id,
              user_id: row.user_id,
              user_name: row.user_name,
              user_email: row.user_email,
              total_price: row.total_price,
              payment_method: row.payment_method,
              status: row.status,
              created_at: row.created_at,
              products: []
            });
          }
    
          ordersMap.get(row.order_id).products.push({
            product_id: row.product_id,
            name: row.product_name,
            image: row.product_image,
            quantity: row.quantity,
            price: row.price
          });
        }
    
        return Array.from(ordersMap.values());
      },

      async updateOrderStatus  (orderId, status)  {
        const query = `UPDATE orders SET status = ? WHERE order_id = ?`;
        await db.execute(query, [status, orderId]);
      }
    
};

module.exports = OrderModel;
