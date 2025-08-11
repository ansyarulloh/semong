// src/pages/parent/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ParentDashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Gagal mengambil data siswa:', error);
      alert('Gagal mengambil data siswa.');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Dashboard Orang Tua</h1>
          <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Daftar Siswa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map((student) => (
                <Link key={student.id} to={`/student/${student.id}`} className="block">
                  <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-1">{student.name}</h3>
                        <p className="text-md text-blue-600">Kelas: {student.class}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">Tidak ada data siswa. 😥</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;