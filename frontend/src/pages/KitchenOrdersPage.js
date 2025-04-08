import React, { useEffect, useState } from 'react';
import './KitchenOrders.css'; // 引入样式文件

function KitchenOrdersPage() {
  const [orders, setOrders] = useState([]);

  // 页面加载时获取订单并附加菜单信息
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => fetchOrdersWithMenuNames(data))
      .then(results => setOrders(results)); 
  }, []);
  
  // 扩展订单：获取每个订单对应菜品的信息（name 和 availability）
  const fetchOrdersWithMenuNames = async (orders) => {
    const results = await Promise.all(
      orders.map(async (order) => {
        const res = await fetch(`/api/menu/${order.menu_item_id}`);
        if (!res.ok) {
          return {
            ...order,
            item_name: "未知菜品",
            item_is_available: false
          };
        }

        const menuItem = await res.json();
        return {
          ...order,
          item_name: menuItem.name,
          item_is_available: menuItem.is_available
        };
      })
    );
    return results;
  };

  // 更新订单状态
  const handleStatusUpdate = (id, newStatus) => {
    fetch(`/api/orders/orderItems/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updated => {
        setOrders(orders.map(order => (order.order_item_id === id ? {...order, status : updated.status} : order)));
      })
      .catch(err => console.error('更新失败:', err));
  };

  // 不同状态的背景色
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'ready':
        return 'status-ready';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👨‍🍳 厨房订单管理</h2>
      <div className="d-flex flex-wrap gap-3">
        {orders.map(order => (
          <div
            key={order.order_item_id}
            className={`order-card p-3 rounded shadow ${getStatusClass(order.status)}`}
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <h5>订单号 #{order.order_id}</h5>
            <p><strong>顾客：</strong>{order.customer_name || '匿名'}</p>
            <p><strong>状态：</strong>{order.status}</p>
            <hr />
            <ul className="list-unstyled small">
              <li><strong>菜品：</strong>{order.item_name}</li>
              <li><strong>数量：</strong>{order.quantity}</li>
              <li>
                <strong>上架状态：</strong>
                {order.item_is_available ? (
                  <span className="text-success">✅ </span>
                ) : (
                  <span className="text-danger">❌ </span>
                )}
              </li>
            </ul>
            {order.status === 'pending' && (
              <button
                className="btn btn-success btn-sm mt-2"
                onClick={() => handleStatusUpdate(order.order_item_id, 'ready')}
              >
                ✅ 标记为已准备好
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KitchenOrdersPage;
