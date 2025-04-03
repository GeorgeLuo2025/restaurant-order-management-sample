import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

function ManageDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', price: '' });

  // 从后端接口 /api/menu 获取菜品数据
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {setDishes(data)
    });
      
  }, []);

  const handleAddDish = () => {
    fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDish),
    })
      .then(res => res.json())
      .then(data => setDishes([...dishes, data]));
  };

  const handleDeleteDish = (id) => {
    fetch(`/api/menu/${id}`, { method: 'DELETE' })
      .then(() => setDishes(dishes.filter(dish => dish.id !== id)));
  };

  const handleUpdateDish = (updatedFields) => {
    const updateId = updatedFields.id;
    const updateFactor = {name : updatedFields.name, description : updatedFields.description, price : updatedFields.price, is_available : updatedFields.is_available}
    fetch(`/api/menu/${updateId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateFactor),
    })
      .then(res => res.json())
      .then(updated => {
        setDishes(dishes.map(dish => (dish.id === updateId ? updated : dish)));
      });
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
            <th>描述</th>
            <th>是否上架</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map(dish => (
            <tr key={dish.id}>
              <td>{dish.id}</td>
              <td>
                <Form.Control
                  type="text"
                  value={dish.name}
                  onChange={(e) => {
                    // const updatedDishes = 
                    setDishes(dishes.map(d =>
                        d.id === dish.id ? { ...d, name: e.target.value } : d
                      ));
                  }}
                  onBlur={(e) => { 
                        if (e.target.value.trim() !== '') {
                            handleUpdateDish({...dish, name: e.target.value })
                        } else {
                            setDishes(dishes);
                        }
                    }
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  defaultValue={dish.price}
                  onBlur={(e) => handleUpdateDish({...dish, price: parseFloat(e.target.value) })}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  defaultValue={dish.description}
                  onBlur={(e) => handleUpdateDish({...dish, description: e.target.value })}
                />
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={dish.is_available}
                  onChange={(e) => handleUpdateDish({...dish, is_available: e.target.checked })}
                />
              </td>
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
        <Form.Group>
          <Form.Label>描述</Form.Label>
          <Form.Control type="text" onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Check type="checkbox" label="是否上架" checked={newDish.is_available} onChange={(e) => setNewDish({ ...newDish, is_available: e.target.checked })} />
        </Form.Group>
        <Button onClick={handleAddDish}>添加菜品</Button>
      </Form>
    </div>
  );
}

export default ManageDishesPage;
