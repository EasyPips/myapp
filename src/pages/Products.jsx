
import React from 'react';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { motion } from 'framer-motion';


const Products = () => {
  const { dispatch } = useCart();
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
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

export default Products;
