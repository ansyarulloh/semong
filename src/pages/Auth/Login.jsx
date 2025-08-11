// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null); // State baru untuk peran
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password, role: selectedRole });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser(selectedRole);
      navigate(`/${selectedRole}`);
    } catch (error) {
      console.error('Login gagal:', error);
      alert('Login gagal. Periksa username dan password Anda.');
    }
  };

  const renderLoginForm = () => {
    const isParent = selectedRole === 'parent';
    const title = isParent ? 'Login Orang Tua' : 'Login Admin';
    const color = isParent ? 'green' : 'blue';

    return (
      <div className={`border border-${color}-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300`}>
        <h2 className={`text-2xl font-bold text-${color}-600 mb-4 text-center`}>{title}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit" className={`w-full bg-${color}-600 text-white p-3 rounded-lg font-semibold hover:bg-${color}-700 transition-colors`}>Masuk</button>
        </form>
        <button onClick={() => setSelectedRole(null)} className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700">
          Kembali ke pilihan peran
        </button>
      </div>
    );
  };

  const renderRoleSelection = () => {
    return (
      <>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Selamat Datang</h1>
          <p className="text-gray-500 mb-8">Pilih peran Anda untuk melanjutkan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => setSelectedRole('admin')} className="bg-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-blue-700">Admin</h2>
            <p className="text-blue-500 mt-2">Masuk ke panel admin</p>
          </button>
          <button onClick={() => setSelectedRole('parent')} className="bg-green-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-green-700">Orang Tua</h2>
            <p className="text-green-500 mt-2">Lihat pantauan siswa</p>
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden p-8">
        {selectedRole ? renderLoginForm() : renderRoleSelection()}
      </div>
    </div>
  );
};

export default Login;