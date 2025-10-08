import React from 'react';

const OrderHistory = () => {
  // This would be fetched from user data in a real app
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              <div className="font-semibold mb-2">Order #{order.id}</div>
              <ul className="mb-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.qty})</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold">Total: ${order.total.toFixed(2)}</div>
              <div className="text-xs text-gray-400">{order.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
