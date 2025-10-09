import React from 'react';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { motion } from 'framer-motion';

const Products = () => {
  const { dispatch } = useCart();

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 bg-emerald-50">
      <h2 className="text-3xl font-bold text-emerald-100 bg-emerald-800 rounded-md px-4 py-2 mb-8 text-center">
        Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-emerald-50 rounded-xl shadow-lg p-6 flex flex-col items-center border border-transparent hover:border-emerald-200"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 128, 128, 0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-4"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 truncate w-full text-center">
              {product.name}
            </h3>
            <p className="text-emerald-700 mb-4 text-lg">${product.price}</p>
            <div className="flex gap-4 items-center">
              <Link
                to={`/products/${product.id}`}
                className="text-emerald-600 hover:text-emerald-400 font-medium"
              >
                View Details
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ backgroundColor: '#2dd4bf', color: '#ffffff' }}
                className="bg-emerald-600 text-emerald-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
                onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Products;