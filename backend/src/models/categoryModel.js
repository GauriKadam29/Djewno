const pool = require("../../config/db");

const addCategory = async (name) => {
  const query = `INSERT INTO categories (name) VALUES (?)`;
  const [result] = await pool.query(query, [name]);
  return { id: result.insertId, name };
};

const getCategories = async () => {
  const query = `SELECT * FROM categories`;
  const [rows] = await pool.query(query);
  return rows;
};

const getCategoryById = async (id) => {
  const query = `SELECT * FROM categories WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows[0] || null;
};

const updateCategory = async (id, name) => {
  const query = `UPDATE categories SET name = ? WHERE id = ?`;
  await pool.query(query, [name, id]);
  return { id, name };
};

const deleteCategory = async (id) => {
  const query = `DELETE FROM categories WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  if (result.affectedRows === 0) {
    return { message: "Category not found" };
  }
  return { message: "Category deleted successfully" };
};

module.exports = { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
