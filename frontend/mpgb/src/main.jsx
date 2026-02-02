import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers & Styles
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Pages & Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Private Routes Group */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <Dashboard />
                </div>
              }
            />
          </Route>

          {/* Automatic Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);