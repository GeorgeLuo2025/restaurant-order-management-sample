// App.jsx
import { useState, useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Menu from './Menu';
import Cart from './Cart';

function MenuPage() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
      fetch('/api/menu')
        .then(res => res.json())
        .then(data => {setMenuItems(data)
      });
        
    }, []);
  // 模拟菜单数据
  // const menuItems = [
  //   { id: 1, name: '宫保鸡丁', price: 38, description: '经典川菜，麻辣鲜香' },
  //   { id: 2, name: '鱼香肉丝', price: 32, description: '酸甜适口，下饭佳品' },
  //   // 更多菜品...
  // ];
  const handleOrderSubmit = (customer_name, cart_items) => {
    const order_items = cart_items.map(item => ({ menu_item_id: item.id, quantity: item.quantity }));
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({customer_name, items : order_items}),
    })
      .then(res => res.json())
      .then(data => {
        setCustomerName(''); 
        setCartItems([]);
      }
    );
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prev => {
      const quantity = Math.max(0, parseInt(newQuantity) || 0);
      
      if (quantity === 0) {
        // 数量为0时移除商品
        return prev.filter(item => item.id !== itemId);
      }
      
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
      }
      // 添加新商品
      const menuItem = menuItems.find(item => item.id === itemId);
      return [...prev, { ...menuItem, quantity }];
    });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>餐厅菜单</h1>
        <Button variant="primary" onClick={() => setShowCart(true)}>
          购物车 ({cartItems.length})
        </Button>
      </div>

      <Menu 
        items={menuItems} 
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange} 
      />

      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
      <Offcanvas.Header closeButton>
          <Offcanvas.Title>购物车</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleQuantityChange}
            total={total}
            customerName={customerName}       // 传递状态给购物车
            onCustomerNameChange={setCustomerName} // 传递更新方法
            onOrderSubmission={handleOrderSubmit}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuPage;