import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function ManageDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', price: '' });

  useEffect(() => {
    fetch('/api/dishes')
      .then(res => res.json())
      .then(data => setDishes(data));
  }, []);

  const handleAddDish = () => {
    fetch('/api/dishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDish),
    })
      .then(res => res.json())
      .then(data => setDishes([...dishes, data]));
  };

  const handleDeleteDish = (id) => {
    fetch(`/api/dishes/${id}`, { method: 'DELETE' })
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
      <Form>
        <Form.Group>
          <Form.Label>名称</Form.Label>
          <Form.Control type="text" onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>价格</Form.Label>
          <Form.Control type="number" onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} />
        </Form.Group>
        <Button onClick={handleAddDish}>添加菜品</Button>
      </Form>
    </div>
  );
}

export default ManageDishesPage;