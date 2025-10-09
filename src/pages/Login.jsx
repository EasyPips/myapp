import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Firebase uses email for login, so you may want to use email as username
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { role: "user" };
      const userObj = { username: user.email, role: userData.role, uid: user.uid };
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
