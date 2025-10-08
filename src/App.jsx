import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

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
              <Link to="/cart" className="relative hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75V6.75m-9 7.5h9m-9 0V6.75A2.25 2.25 0 017.5 4.5h9a2.25 2.25 0 012.25 2.25v7.5m-13.5 0h-1.5m1.5 0v7.5A2.25 2.25 0 007.5 21h9a2.25 2.25 0 002.25-2.25v-7.5" />
                </svg>
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">{user.username}</span>
                  <button onClick={handleLogout} title="Logout" className="hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v6m0 0a2.25 2.25 0 01-2.25 2.25h-3A2.25 2.25 0 018.25 15V9m7.5 6H6.75" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link to="/login" title="Login" className="hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v6m0 0a2.25 2.25 0 01-2.25 2.25h-3A2.25 2.25 0 018.25 15V9m7.5 6H6.75" />
                  </svg>
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
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App
