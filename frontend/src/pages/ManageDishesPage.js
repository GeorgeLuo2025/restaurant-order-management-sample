import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function ManageDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', price: '' });

  // 从后端接口 /api/menu 获取菜品数据
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setDishes(data));
  }, []);

  const handleAddDish = () => {
    fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDish),
    })
      .then(res => res.json())
      .then(data => {
        setDishes([...dishes, data]);
        setNewDish({ name: '', price: '' }); // 添加后重置输入框
      });
  };

  const handleDeleteDish = (id) => {
    fetch(`/api/menu/${id}`, { method: 'DELETE' })
      .then(() => setDishes(dishes.filter(dish => dish.id !== id)));
  };

  return (
    <div>
      <h2>菜品管理</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>价格</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.id}>
              <td>{dish.id}</td>
              <td>{dish.name}</td>
              <td>{dish.price}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteDish(dish.id)}>删除</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="dishName">
          <Form.Label>名称</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="请输入菜品名称" 
            value={newDish.name} 
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dishPrice">
          <Form.Label>价格</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="请输入菜品价格" 
            value={newDish.price} 
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} 
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddDish}>添加菜品</Button>
      </Form>
    </div>
  );
}

export default ManageDishesPage;
