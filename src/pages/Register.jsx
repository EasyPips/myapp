import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save user role in Firestore
      await setDoc(doc(db, 'users', user.uid), { role: 'user', email: user.email });
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'Email already in use'
        : 'Registration failed: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-emerald-50 p-8 rounded-xl shadow-lg border border-emerald-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 text-center">Register</h2>
      {error && <div className="text-red-600 bg-red-50 p-2 rounded-md mb-4 text-center">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-emerald-700 font-medium mb-1">Email</label>
          <input
            id="email"
            className="w-full border border-emerald-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            aria-label="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-emerald-700 font-medium mb-1">Password</label>
          <input
            id="password"
            className="w-full border border-emerald-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            aria-label="Password"
          />
        </div>
        <button
          className="w-full bg-emerald-600 text-emerald-100 py-2 rounded-md font-medium hover:bg-emerald-500 transition-colors duration-200 disabled:bg-emerald-400"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center text-emerald-700">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-600 hover:text-emerald-400 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;