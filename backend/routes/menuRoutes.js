// backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// 获取所有菜单项
router.get('/', menuController.getAllMenuItems);
// 新增菜单项
router.post('/', menuController.createMenuItem);

// 更新menuitem
router.put('/:id', menuController.updateMenuItem);

// 删除menuitem
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
