// backend/controllers/menuController.js
const MenuItem = require('../models/MenuItem');

// 获取所有菜单项
exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: '获取菜单失败' });
  }
};

// 新增菜单项（厨房/管理员使用）
exports.createMenuItem = async (req, res) => {
  const { name, description, price, is_available } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: '菜品名称和价格必填' });
  }
  try {
    const newItem = await MenuItem.create({ name, description, price, is_available });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: '新增菜单项失败' });
  }
};
