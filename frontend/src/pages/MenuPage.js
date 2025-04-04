// import { useState, useEffect } from 'react';
// import { Card, Button } from 'react-bootstrap';

// function MenuPage() {
//   const [dishes, setDishes] = useState([]);

//   useEffect(() => {
//     fetch('/api/menu')
//       .then(res => res.json())
//       .then(data => setDishes(data));
//   }, []);

//   return (
//     <div>
//       <h2>菜单</h2>
//       <div className="row">
//         {dishes.map(dish => (
//           <Card key={dish.id} className="m-2" style={{ width: '18rem' }}>
//             <Card.Body>
//               <Card.Title>{dish.name}</Card.Title>
//               <Card.Text>价格: {dish.price} 元</Card.Text>
//               <Button variant="primary">加入购物车</Button>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MenuPage;

// App.jsx
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Menu from './Menu';
import Cart from './Cart';

function MenuPage() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // 模拟菜单数据
  const menuItems = [
    { id: 1, name: '宫保鸡丁', price: 38, description: '经典川菜，麻辣鲜香' },
    { id: 2, name: '鱼香肉丝', price: 32, description: '酸甜适口，下饭佳品' },
    // 更多菜品...
  ];

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
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

      <Menu items={menuItems} onAddToCart={addToCart} />

      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>购物车</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart 
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            total={total}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuPage;
