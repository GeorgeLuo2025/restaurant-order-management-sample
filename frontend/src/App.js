import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import KitchenPage from './pages/KitchenPage';
import WaiterPage from './pages/WaiterPage';
import ManageDishesPage from './pages/ManageDishesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/manage-dishes" element={<ManageDishesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;