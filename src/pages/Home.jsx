import React from 'react';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { motion } from 'framer-motion';

const discountedProducts = [
  { ...products[0], discount: 20 },
  { ...products[1], discount: 20 },
];
const bannerWidth = 400; // Used for animation calculation

const Home = () => {
  const { dispatch } = useCart();

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 bg-emerald-50">
      {/* Auto-scrolling banner with two discounted products */}
      <div className="overflow-hidden bg-emerald-50 rounded-xl shadow-lg py-8 mb-8">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -bannerWidth * discountedProducts.length] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 10,
            ease: 'linear',
          }}
        >
          {[...discountedProducts, ...discountedProducts].map((product, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 mx-2 bg-emerald-100 text-emerald-800 rounded-md px-6 py-5 min-w-[300px] sm:min-w-[350px] border border-emerald-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-emerald-50 rounded-md p-2"
              />
              <div>
                <div className="font-bold text-lg sm:text-xl truncate">{product.name}</div>
                <div className="line-through text-emerald-400 text-sm">
                  ${(product.price * 1.3).toFixed(2)}
                </div>
                <div className="text-emerald-600 font-bold text-lg sm:text-xl">
                  ${(product.price * 0.8).toFixed(2)}{' '}
                  <span className="text-xs text-emerald-700 font-normal">(20% OFF)</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ backgroundColor: '#2dd4bf', color: '#ffffff' }}
                  className="mt-2 bg-emerald-600 text-emerald-100 px-4 py-2 rounded-md font-medium transition-colors duration-200"
                  onClick={() =>
                    dispatch({
                      type: 'ADD_TO_CART',
                      product: { ...product, price: product.price * 0.8 },
                    })
                  }
                  aria-label={`Add ${product.name} to cart with 20% discount`}
                >
                  Get Deal
                </motion.button>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="text-center mt-4 bg-emerald-100 rounded-md py-2">
          <div className="font-bold text-xl sm:text-2xl text-emerald-800">
            Limited Time Offer!
          </div>
          <div className="text-sm text-emerald-700">Grab these deals before they're gone.</div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-emerald-100 bg-emerald-800 rounded-md px-4 py-2 mb-4 text-center">
        Welcome to Heasycommerce
      </h1>
      <p className="mb-8 text-lg text-emerald-700 text-center">Discover our featured products!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <motion.div
            key={product.id}
            className="bg-emerald-50 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center border border-transparent hover:border-emerald-200"
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

export default Home;