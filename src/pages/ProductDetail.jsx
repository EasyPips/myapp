
import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/useCart';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div className="text-center text-red-500">Product not found.</div>;
  return (
    <motion.div
      className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-64 h-64 object-contain mb-4" />
      <p className="mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ backgroundColor: '#2563eb', color: '#ffffff' }}
        style={{ backgroundColor: '#3b82f6', color: '#fff' }}
        className="px-4 py-2 rounded transition-colors duration-200"
        onClick={() => dispatch({ type: 'ADD_TO_CART', product })}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default ProductDetail;
