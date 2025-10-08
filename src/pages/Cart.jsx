import React from 'react';
import { useCart } from '../context/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {cart.items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                layout
                className="flex items-center justify-between bg-white rounded shadow p-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-200 px-2 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'DECREASE_QTY', id: item.id })}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <motion.span layout className="px-2">{item.qty}</motion.span>
                      <button
                        className="bg-gray-200 px-2 rounded text-lg font-bold hover:bg-gray-300"
                        onClick={() => dispatch({ type: 'INCREASE_QTY', id: item.id })}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p>${item.price} each</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="text-right font-bold text-lg mt-4">Total: ${total.toFixed(2)}</div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
