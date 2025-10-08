import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from './context/useCart';

function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const { cart = [] } = useCart?.() || {};

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // Protect admin route
  const isAdmin = user && user.username === 'admin';

  return (
    <CartProvider>
      <Router>
        <header className="bg-white shadow mb-8">
          <nav className="container mx-auto flex items-center justify-between py-4 px-4 text-lg font-medium">
            {/* Logo left */}
            <div className="flex items-center gap-2">
              <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
              <Link to="/" className="font-bold text-xl hover:text-blue-600">MyStore</Link>
            </div>
            {/* Center nav links */}
            <div className="flex gap-6 flex-1 justify-center">
              <Link to="/products" className="hover:text-blue-600">Products</Link>
              <Link to="/order-history" className="hover:text-blue-600">Orders</Link>
              <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
            </div>
            {/* Cart and user right */}
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative hover:text-blue-500" title="Cart">
                <FaShoppingCart className="w-7 h-7 text-blue-400 hover:text-blue-500 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cart.length}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">{user.username}</span>
                  <button onClick={handleLogout} title="Logout" className="hover:text-blue-500">
                    <FaSignOutAlt className="w-7 h-7 text-blue-400 hover:text-blue-500 transition-colors" />
                  </button>
                </div>
              ) : (
                <Link to="/login" title="Login" className="hover:text-blue-500">
                  <FaUserCircle className="w-7 h-7 text-blue-400 hover:text-blue-500 transition-colors" />
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-50 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
      </Router>
    </CartProvider>
  );
}

export default App
