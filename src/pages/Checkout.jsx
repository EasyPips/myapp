import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save order to localStorage (mock order history)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      items: cart.items,
      total,
      name,
      address,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));
    dispatch({ type: 'CLEAR_CART' });
    setSubmitted(true);
    setTimeout(() => navigate('/order-history'), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p className="mb-2">Redirecting to order history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <div className="font-bold">Total: ${total.toFixed(2)}</div>
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600" type="submit">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
