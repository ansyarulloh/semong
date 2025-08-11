// src/App.jsx
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Import semua halaman yang dibutuhkan
import Login from './pages/Auth/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import ParentDashboard from './pages/Parent/Dashboard'
import StudentDetail from './pages/Parent/StudentDetail'

function App() {
  const [user, setUser] = useState(null) // 'admin' atau 'parent'

  const handleLogout = () => {
    localStorage.removeItem('token') // Hapus token dari penyimpanan lokal
    setUser(null)
  }

  const ProtectedRoute = ({ children, role }) => {
    // Simulasikan pengecekan token, realitanya ini akan lebih kompleks
    const token = localStorage.getItem('token')
    if (!token || !user || user !== role) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/:id"
          element={
            <ProtectedRoute role="parent">
              <StudentDetail onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
