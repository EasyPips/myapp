import React from 'react';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { motion } from 'framer-motion';

const Home = () => {
  const { dispatch } = useCart();
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Banner with two discounted products */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between p-6 mb-8">
        {products.slice(0, 2).map(product => (
          <div key={product.id} className="flex items-center gap-4 mb-4 sm:mb-0">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-contain bg-white rounded-full p-2" />
            <div>
              <div className="font-bold text-lg">{product.name}</div>
              <div className="line-through text-gray-200 text-sm">${(product.price * 1.3).toFixed(2)}</div>
              <div className="text-yellow-300 font-bold text-xl">${(product.price * 0.8).toFixed(2)} <span className="text-xs text-white font-normal">(20% OFF)</span></div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ backgroundColor: '#fbbf24', color: '#1e293b' }}
              style={{ backgroundColor: '#facc15', color: '#1e293b' }}
              className="ml-2 px-3 py-1 rounded font-semibold transition-colors duration-200"
              onClick={() => dispatch({ type: 'ADD_TO_CART', product: { ...product, price: (product.price * 0.8) } })}
            >
              Get Deal
            </motion.button>
          </div>
        ))}
        <div className="text-center sm:text-right flex-1">
          <div className="font-bold text-2xl mb-1">Limited Time Offer!</div>
          <div className="text-sm">Grab these deals before they're gone.</div>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to My E-Commerce Store</h1>
      <p className="mb-8 text-lg">Discover our featured products!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.slice(0, 3).map(product => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img src={product.image} alt={product.name} className="w-32 h-32 object-contain mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <div className="flex gap-2">
              <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">View Details</Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                style={{ backgroundColor: '#3b82f6', color: '#fff' }}
                className="px-3 py-1 rounded transition-colors duration-200"
                onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
