// backend/app.js
const express = require('express');
const app = express();
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./utils/errorHandler');

// 解析 JSON 请求体
app.use(express.json());

// 注册路由
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// 全局错误处理中间件
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});
