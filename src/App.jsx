import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Footer from './pages/Footer';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from './context/useCart';
import Navbar from './pages/Navbar';

function App() {
  // Load user info from localStorage on initial render
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  // Listen for login/logout changes from other tabs
  useEffect(() => {
    const syncUser = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  // Get cart state from context (if available)
  const { cart = [] } = useCart?.() || {};
  

  // Logout function: clears user info and redirects to login page
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // Check if the current user is an admin (for admin route protection)
  const isAdmin = user && user.role === 'admin';

  return (
    <CartProvider>
      <Router>
        {/* Header and Navigation Bar */}
        <Navbar user={user} cart={cart} handleLogout={handleLogout} isAdmin={isAdmin} />
        {/* Main content area with route definitions */}
        <main className="min-h-screen bg-gray-50 py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            {/* Admin route: only accessible if user is admin */}
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <div className="text-center mt-20 text-2xl text-red-500">
                    Access Denied
                  </div>
                )
              }
            />
          </Routes>
        </main>
         <Footer />
      </Router>
    </CartProvider>
  );
}

export default App
