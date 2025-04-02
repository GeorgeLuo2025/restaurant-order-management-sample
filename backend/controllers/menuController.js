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

exports.updateMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  const { name, description, price, is_available } = req.body;
  if (name && price !== undefined) {
    try {
      const updateItem = await MenuItem.update({ id: menuItemId, name, description, price, is_available });
      res.status(201).json(updateItem);
    } catch (error) {
      res.status(500).json({ error: '更改菜单项失败' });
    }
  }
}

exports.deleteMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  try {
    const deleteItem = await MenuItem.delete({id : menuItemId});
    res.status(201).json(deleteItem);
  } catch (error) {
    res.status(500).json({error: '删除菜单项失败'});
  }
}