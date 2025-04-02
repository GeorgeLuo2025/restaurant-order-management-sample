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


exports.update = async ({id, name, description, price, is_available }) => {
  const result = await queryDB(
    'UPDATE menu_items SET name = $1, description = $2, price = $3, is_available = $4 WHERE id = $5',
    [name, description, price, is_available != undefined ? is_available : true, id]
  )
  return result.rows[0];
}


exports.delete = async () => {
  const result = await queryDB(
    'DELETE FROM menu_items WHERE id = 5',
  )
  return result.rows[0];
}
