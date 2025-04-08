import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
// import OrderPage from './pages/OrderPage';
import KitchenOrdersPage from './pages/KitchenOrdersPage';
import WaiterPage from './pages/WaiterOrdersPage';
import ManageDishesPage from './pages/ManageDishesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/kitchen" element={<KitchenOrdersPage/>} />
          {/* <Router path="/" */}
          {/* <Route path="/orders" element={<OrderPage />} />
          
           */}
           <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/manage-dishes" element={<ManageDishesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
