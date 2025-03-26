// backend/models/Order.js
const { queryDB } = require('../config/db');

exports.createOrder = async (user_id) => {
  const result = await queryDB(
    'INSERT INTO orders (user_id) VALUES ($1) RETURNING *',
    [user_id]
  );
  return result.rows[0];
};

exports.getAllOrders = async () => {
  const result = await queryDB(
    `SELECT o.id as order_id, o.order_time, oi.id as order_item_id, oi.menu_item_id, oi.quantity, oi.status
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     ORDER BY o.order_time ASC`,
    []
  );
  return result.rows;
};
