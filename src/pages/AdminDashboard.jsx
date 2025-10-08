import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetch('http://localhost:8000/products/', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(setProducts);
  }, [user.token]);

  useEffect(() => {
    fetch('http://localhost:8000/orders/', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(setOrders);
  }, [user.token]);

  useEffect(() => {
    fetch('http://localhost:8000/users/', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(setUsers);
  }, [user.token]);

  // Add handlers for add/edit/delete here

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <p>Welcome, Admin! Here you can manage products, view orders, and more.</p>
      <div>
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} - ${p.price}</li>
          ))}
        </ul>
        {/* Add forms/buttons for add/edit/delete */}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <ul>
          {orders.map(o => (
            <li key={o.id}>Order #{o.id} - {o.status}</li>
          ))}
        </ul>
        {/* Add forms/buttons for update/delete */}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.name} - {u.email}</li>
          ))}
        </ul>
        {/* Add forms/buttons for add/edit/delete */}
      </div>
    </div>
  );
};

export default AdminDashboard;