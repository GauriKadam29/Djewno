const pool = require("../../config/db");
const crypto = require("crypto");

// Function to generate SKU (A1B2C3D4 format)
const generateSKU = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let sku = "";
  for (let i = 0; i < 4; i++) {
    sku += letters[Math.floor(Math.random() * letters.length)];
    sku += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return sku;
};

// Static values for materials & gemstones
const materials = ["Gold", "Platinum", "Rose Gold", "Silk", "Sterling Silver", "White Gold"];
const gemstones = ["Aquamarine", "Diamond", "Onyx", "Pearl", "Sapphire", "Tanzanite", "Turquoise"];

// const addProduct = async (data) => {
//   const { name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone } = data;
//   const sku = generateSKU();
//   const query = `
//     INSERT INTO products 
//     (name, sku, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   const [result] = await pool.query(query, [name, sku, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, JSON.stringify(images), material, gemstone]);

//   return { id: result.insertId, sku, ...data };
// };


const addProduct = async (data) => {
  const { name, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone, best_seller } = data;
  const sku = generateSKU();
  const query = `
    INSERT INTO products 
    (name, sku, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, images, material, gemstone, best_seller) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [name, sku, price, discount_price, product_status, short_desc, long_desc, brand_id, category_id, subcategory_id, JSON.stringify(images), material, gemstone, best_seller ? 1 : 0]);

  return { id: result.insertId, sku, ...data };
};



// const getProducts = async (name) => {
//   let query = `
//     SELECT p.*, c.name AS category_name 
//     FROM products p
//     JOIN categories c ON p.category_id = c.id
//   `;
//   let params = [];

//   if (name) {
//     query += ` WHERE LOWER(p.name) LIKE LOWER(?)`;
//     params.push(`%${name}%`);
//   }


//   const [rows] = await pool.query(query, params);
//   return rows;
// };


const getProducts = async (name, best_seller) => {
  let query = `
    SELECT p.*, c.name AS category_name 
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `;
  let params = [];
  let conditions = [];

  if (name) {
    conditions.push(`LOWER(p.name) LIKE LOWER(?)`);
    params.push(`%${name}%`);
  }

  if (best_seller !== undefined) {
    conditions.push(`best_seller = ?`);
    params.push(best_seller ? 1 : 0);
  }

  // Add WHERE only if conditions exist
  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  const [rows] = await pool.query(query, params);
  return rows;
};



// const getProductById = async (id) => {
//   const query = `SELECT * FROM products WHERE id = ?`;
//   const [rows] = await pool.query(query, [id]);
//   return rows[0] || null;
// };

const getProductById = async (id) => {
  // Fetch product details
  const productQuery = `SELECT * FROM products WHERE id = ?`;
  const [productRows] = await pool.query(productQuery, [id]);

  if (productRows.length === 0) {
    return null; // Return null if product not found
  }

  const product = productRows[0];

  // Fetch product images
  const imageQuery = `SELECT image_url FROM product_images WHERE product_id = ?`;
  const [imageRows] = await pool.query(imageQuery, [id]);
  product.images = imageRows.map(img => img.image_url); // Attach images to product

  // Fetch reviews
  const reviewQuery = `
      SELECT r.id, r.rating, r.comment, r.created_at, 
             u.id AS user_id, u.name AS user_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ?
  `;
  const [reviewRows] = await pool.query(reviewQuery, [id]);
  product.reviews = reviewRows; // Attach reviews to product

  return product;
};



const updateProduct = async (id, data) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    throw new Error("No fields provided for update.");
  }

  const setQuery = fields.map(field => `${field} = ?`).join(", ");
  const query = `UPDATE products SET ${setQuery} WHERE id = ?`;

  const [result] = await pool.query(query, [...values, id]);
  return result;
};





const deleteProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  if (result.affectedRows === 0) {
    return { message: "Product not found" };
  }
  return { message: "Product deleted successfully" };
};


const searchProductsModel = async (query) => {
  query = query.trim(); // ✅ Ensure query is clean

  const sql = `
    SELECT * FROM products 
    WHERE LOWER(name) LIKE LOWER(?) 
  `;

  const params = [`%${query}%`];

  console.log("📝 Executing SQL:", sql);
  console.log("📌 Cleaned Query Parameters:", params);

  const [rows] = await pool.query(sql, params);
  console.log("🔄 Query Result:", rows);

  return rows;
};


module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, materials, gemstones, searchProductsModel };



