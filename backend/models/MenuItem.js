// backend/models/MenuItem.js
const { queryDB } = require('../config/db');

exports.getAll = async () => {
  const result = await queryDB('SELECT * FROM menu_items', []);
  return result.rows;
};

exports.create = async ({ name, description, price, is_available }) => {
  const result = await queryDB(
    'INSERT INTO menu_items (name, description, price, is_available) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, is_available !== undefined ? is_available : true]
  );
  return result.rows[0];
};
