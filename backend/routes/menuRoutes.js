// backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// 获取所有菜单项
router.get('/', menuController.getAllMenuItems);
// 新增菜单项
router.post('/', menuController.createMenuItem);

module.exports = router;
