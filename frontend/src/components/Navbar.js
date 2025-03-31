import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">餐厅系统</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">菜单</Nav.Link>
        <Nav.Link as={Link} to="/orders">订单</Nav.Link>
        <Nav.Link as={Link} to="/kitchen">厨房</Nav.Link>
        <Nav.Link as={Link} to="/waiter">服务员</Nav.Link>
        <Nav.Link as={Link} to="/manage-dishes">管理菜品</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
