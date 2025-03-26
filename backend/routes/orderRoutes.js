// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 顾客下单
router.post('/', orderController.createOrder);
// 厨房获取所有订单
router.get('/', orderController.getAllOrders);
// 厨房更新订单项状态
router.patch('/orderItems/:id', orderController.updateOrderItemStatus);

// 服务员接口
// 获取所有状态为 'ready' 的订单项（待上菜）
router.get('/waiter', orderController.getOrdersForWaiter);
// 服务员更新订单项状态为 'served'
router.patch('/orderItems/:id/serve', orderController.serveOrderItem);

module.exports = router;
