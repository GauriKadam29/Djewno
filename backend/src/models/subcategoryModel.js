const pool = require("../../config/db");

const addSubcategory = async (name, category_id) => {
  const query = `INSERT INTO subcategories (name, category_id) VALUES (?, ?)`;
  const [result] = await pool.query(query, [name, category_id]);
  return { id: result.insertId, name, category_id };
};

const getSubcategories = async () => {
  const query = `SELECT * FROM subcategories`;
  const [rows] = await pool.query(query);
  return rows;
};

const getSubcategoryById = async (id) => {
  const query = `SELECT * FROM subcategories WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows[0] || null;
};

const updateSubcategory = async (id, name, category_id) => {
  const query = `UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?`;
  await pool.query(query, [name, category_id, id]);
  return { id, name, category_id };
};

const deleteSubcategory = async (id) => {
  const query = `DELETE FROM subcategories WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  if (result.affectedRows === 0) {
    return { message: "Subcategory not found" };
  }
  return { message: "Subcategory deleted successfully" };
};

module.exports = { addSubcategory, getSubcategories, getSubcategoryById, updateSubcategory, deleteSubcategory };
