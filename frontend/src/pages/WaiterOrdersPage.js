import React, { useEffect, useState } from 'react';
import './WaiterOrders.css';

function WaiterOrdersPage() {
  const [orders, setOrders] = useState([]);

  // 页面加载：获取所有 ready 状态订单项（或由后端过滤）
  useEffect(() => {
    fetch('/api/orders/waiter')
      .then(res => res.json())
      .then(data => fetchOrdersWithMenuNames(data))
      .then(results => setOrders(results))
      .catch(err => console.error('获取订单失败:', err));
  }, []);

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

  // 更新状态为 served
  const handleStatusUpdate = (orderItemId) => {
    fetch(`/api/orders/orderItems/${orderItemId}/serve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
      // body: JSON.stringify({ status: 'served' }),
    })
      .then(res => res.json())
      .then(updated => {
        setOrders(orders.map(order => (order.order_item_id === orderItemId ? {...order, status : updated.status} : order)));
      })
      .catch(err => console.error('更新失败:', err));
  };

  // 根据状态返回样式类名
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'ready': return 'status-ready';
      case 'served': return 'status-served';
      default: return '';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🧑‍💼 服务员送餐界面</h2>
      <div className="d-flex flex-wrap gap-3">
        {orders.map(order => (
          <div
            key={order.order_item_id}
            className={`order-card p-3 rounded shadow ${getStatusClass(order.status)}`}
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <h5>订单号 #{order.order_id}</h5>
            <p><strong>顾客：</strong>{order.customer_name || '匿名'}</p>
            <p><strong>菜品：</strong>{order.item_name}</p>
            <p><strong>数量：</strong>{order.quantity}</p>
            <p>
              <strong>上架状态：</strong>
              {order.item_is_available ? (
                <span className="text-success">✅ 上架</span>
              ) : (
                <span className="text-danger">❌ 下架</span>
              )}
            </p>
            <p><strong>当前状态：</strong>
              <span className={`badge ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </p>

            {order.status === 'ready' && (
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => handleStatusUpdate(order.order_item_id)}
              >
                🍽️ 标记为已送达
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaiterOrdersPage;
