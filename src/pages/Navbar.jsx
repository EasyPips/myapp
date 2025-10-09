import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaListAlt,
  FaCreditCard,
  FaUserShield,
} from 'react-icons/fa';
import { useState } from 'react';

const Navbar = ({ user, cart, handleLogout, isAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="container mx-auto flex bg-emerald-800 items-center justify-between py-4 px-4 text-lg font-medium">
      {/* Logo always visible */}
      <div className="flex items-center gap-2">
        <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
        <Link to="/" className="font-bold text-xl text-emerald-100 hover:text-emerald-400 md:inline hidden">
          Heasycommerce
        </Link>
      </div>

      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden text-emerald-100 hover:text-emerald-400 transition-colors"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {isSidebarOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
      </button>

      {/* Desktop navigation links and icons */}
      <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
        <Link to="/" className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400">
          <FaHome className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
          Home
        </Link>
        <Link to="/products" className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400">
          <FaBox className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
          Products
        </Link>
        <Link to="/order-history" className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400">
          <FaListAlt className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
          Orders
        </Link>
        <Link to="/checkout" className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400">
          <FaCreditCard className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
          Checkout
        </Link>
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400">
            <FaUserShield className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
            Admin
          </Link>
        )}
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/cart"
          className="flex items-center gap-2 relative text-emerald-100 hover:text-emerald-400"
          title="Cart"
          aria-label="View shopping cart"
        >
          <FaShoppingCart className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
          <span className="text-emerald-100 hover:text-emerald-400">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 left-5 bg-red-600 text-emerald-100 text-xs rounded-full px-1">
              {cart.length}
            </span>
          )}
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-emerald-100">{user.username}</span>
            <button
              onClick={handleLogout}
              title="Logout"
              className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
              aria-label="Log out"
            >
              <FaSignOutAlt className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
              <span className="text-emerald-100 hover:text-emerald-400">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            title="Login"
            className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
            aria-label="Log in"
          >
            <FaUserCircle className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
            <span className="text-emerald-100 hover:text-emerald-400">Login</span>
          </Link>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-emerald-900 text-emerald-100 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex flex-col p-4 gap-4">
          <button
            className="self-end text-emerald-100 hover:text-emerald-400"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
            onClick={toggleSidebar}
          >
            <FaHome className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
            Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
            onClick={toggleSidebar}
          >
            <FaBox className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
            Products
          </Link>
          <Link
            to="/order-history"
            className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
            onClick={toggleSidebar}
          >
            <FaListAlt className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
            Orders
          </Link>
          <Link
            to="/checkout"
            className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
            onClick={toggleSidebar}
          >
            <FaCreditCard className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
            Checkout
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
              onClick={toggleSidebar}
            >
              <FaUserShield className="w-6 h-6 text-emerald-100 hover:text-emerald-400" />
              Admin
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="flex items-center gap-2 relative text-emerald-100 hover:text-emerald-400"
              title="Cart"
              aria-label="View shopping cart"
              onClick={toggleSidebar}
            >
              <FaShoppingCart className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
              <span className="text-emerald-100 hover:text-emerald-400">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 left-5 bg-red-600 text-emerald-100 text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-emerald-100">{user.username}</span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleSidebar();
                }}
                title="Logout"
                className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
                aria-label="Log out"
              >
                <FaSignOutAlt className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
                <span className="text-emerald-100 hover:text-emerald-400">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="flex items-center gap-2 text-emerald-100 hover:text-emerald-400"
              aria-label="Log in"
              onClick={toggleSidebar}
            >
              <FaUserCircle className="w-6 h-6 text-emerald-100 hover:text-emerald-400 transition-colors" />
              <span className="text-emerald-100 hover:text-emerald-400">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;