import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function MenuPage() {
  const [dishes, setDishes] = useState([]);
  
  useEffect(() => {
    fetch('/api/dishes')
      .then(res => res.json())
      .then(data => setDishes(data));
  }, []);

  return (
    <div>
      <h2>菜单</h2>
      <div className="row">
        {dishes.map(dish => (
          <Card key={dish.id} className="m-2" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>价格: {dish.price} 元</Card.Text>
              <Button variant="primary">加入购物车</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;