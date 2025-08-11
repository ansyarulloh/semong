// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminDashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    age: '',
    hobby: '',
  });

  // Logika untuk mengambil, menambah, dan menghapus siswa
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

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}/students`, newStudent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchStudents(); // Muat ulang data
      setNewStudent({ name: '', class: '', age: '', hobby: '' });
    } catch (error) {
      console.error('Gagal menambah siswa:', error);
      alert('Gagal menambah siswa.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchStudents(); // Muat ulang data
      } catch (error) {
        console.error('Gagal menghapus siswa:', error);
        alert('Gagal menghapus siswa.');
      }
    }
  };

  // Bagian return yang menampilkan JSX
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Admin Panel</h1>
          <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">
            Logout
          </button>
        </div>
        
        {/* Form Tambah Siswa */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Tambah Siswa Baru</h2>
          <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Nama" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Kelas" value={newStudent.class} onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="number" placeholder="Umur" value={newStudent.age} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Hobi" value={newStudent.hobby} onChange={(e) => setNewStudent({ ...newStudent, hobby: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="col-span-1 md:col-span-2 lg:col-span-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Tambah Siswa</button>
          </form>
        </div>

        {/* Tabel Daftar Siswa */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Daftar Siswa</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="w-full border-b border-gray-200">
                  <th className="text-left p-4 text-gray-600 font-semibold">Nama</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Kelas</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Umur</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Hobi</th>
                  <th className="text-left p-4 text-gray-600 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="p-4">{student.name}</td>
                      <td className="p-4">{student.class}</td>
                      <td className="p-4">{student.age}</td>
                      <td className="p-4">{student.hobby}</td>
                      <td className="p-4">
                        <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors">Hapus</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">Tidak ada data siswa.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;