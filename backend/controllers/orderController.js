// backend/controllers/orderController.js
const { pool, queryDB } = require('../config/db');

// 顾客下单（创建订单及订单详情，使用事务保证数据一致性）
exports.createOrder = async (req, res) => {
  const { user_id, items } = req.body; // items 为数组，每个元素包含 { menu_item_id, quantity }
  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: '订单数据不完整' });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // 创建订单
    const orderResult = await client.query(
      'INSERT INTO orders (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    const order = orderResult.rows[0];
    // 创建订单详情
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)',
        [order.id, item.menu_item_id, item.quantity || 1]
      );
    }
    await client.query('COMMIT');
    res.status(201).json({ order_id: order.id });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: '下单失败' });
  } finally {
    client.release();
  }
};

// 厨房端获取所有订单（包括订单详情），按下单时间排序
exports.getAllOrders = async (req, res) => {
  try {
    const result = await queryDB(
      `SELECT o.id as order_id, o.order_time, oi.id as order_item_id, oi.menu_item_id, oi.quantity, oi.status
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       ORDER BY o.order_time ASC`,
      []
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: '获取订单失败' });
  }
};

// 厨房更新订单项状态（如 'preparing'、'ready'）
exports.updateOrderItemStatus = async (req, res) => {
  const orderItemId = req.params.id;
  const { status } = req.body; // 例如：'pending'、'preparing'、'ready'、'served'
  if (!status) {
    return res.status(400).json({ error: '必须提供状态' });
  }
  try {
    const result = await queryDB(
      'UPDATE order_items SET status = $1 WHERE id = $2 RETURNING *',
      [status, orderItemId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '订单项未找到' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: '更新订单项状态失败' });
  }
};

// 服务员获取所有状态为 'ready' 的订单项（待上菜）
exports.getOrdersForWaiter = async (req, res) => {
  try {
    const result = await queryDB(
      `SELECT o.id as order_id, o.order_time, oi.id as order_item_id, oi.menu_item_id, oi.quantity, oi.status
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE oi.status = 'ready'
       ORDER BY o.order_time ASC`,
      []
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: '获取待上菜订单项失败' });
  }
};

// 服务员更新订单项状态为 'served'（已上菜）
exports.serveOrderItem = async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const result = await queryDB(
      'UPDATE order_items SET status = $1 WHERE id = $2 RETURNING *',
      ['served', orderItemId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '订单项未找到' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: '更新订单项状态为已上菜失败' });
  }
};
