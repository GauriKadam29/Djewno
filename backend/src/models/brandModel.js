const pool = require("../../config/db");

const addBrand = async (name) => {
  const query = `INSERT INTO brands (name) VALUES (?)`;
  const [result] = await pool.query(query, [name]);
  return { id: result.insertId, name };
};

const getBrands = async () => {
  const query = `SELECT * FROM brands`;
  const [rows] = await pool.query(query);
  return rows;
};

const getBrandById = async (id) => {
  const query = `SELECT * FROM brands WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows[0] || null;
};

const updateBrand = async (id, name) => {
  const query = `UPDATE brands SET name = ? WHERE id = ?`;
  await pool.query(query, [name, id]);
  return { id, name };
};

const deleteBrand = async (id) => {
  const query = `DELETE FROM brands WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  if (result.affectedRows === 0) {
    return { message: "Brand not found" };
  }
  return { message: "Brand deleted successfully" };
};

module.exports = { addBrand, getBrands, getBrandById, updateBrand, deleteBrand };
