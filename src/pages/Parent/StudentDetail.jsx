// src/pages/parent/StudentDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const StudentDetail = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentDetail();
  }, [id]);

  const fetchStudentDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(response.data);
    } catch (error) {
      console.error('Gagal mengambil detail siswa:', error);
      setStudent(null);
      alert('Gagal mengambil detail siswa.');
    }
  };

  if (!student) {
    return (
      <div className="p-8 text-center text-red-500 font-sans">
        <h1 className="text-2xl font-bold">Siswa tidak ditemukan!</h1>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-3xl">
              {student.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-blue-700">{student.name}</h1>
              <p className="text-xl text-gray-500">Detail Siswa</p>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
            Kembali
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-md text-gray-500 mb-1">ID</p>
            <p className="text-lg font-bold text-gray-800">{student.id}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-md text-gray-500 mb-1">Kelas</p>
            <p className="text-lg font-bold text-gray-800">{student.class}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-md text-gray-500 mb-1">Umur</p>
            <p className="text-lg font-bold text-gray-800">{student.age} tahun</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-md text-gray-500 mb-1">Hobi</p>
            <p className="text-lg font-bold text-gray-800">{student.hobby}</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;