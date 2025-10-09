import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Firebase uses email for registration
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      // Save user role in Firestore (default: user)
      await setDoc(doc(db, "users", user.uid), { role: "user", email: user.email });
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;