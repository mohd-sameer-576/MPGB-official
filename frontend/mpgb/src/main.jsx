import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers & Styles
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Pages & Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';        // Add this
import Shop from './pages/Shop';        // Add this
import Contact from './pages/Contact';  // Add this
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* Navbar stays here to appear on all pages */}
        <Navbar /> 

        <Routes>
          {/* --- Public Client Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* --- Protected Admin Routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* --- Fallbacks --- */}
          {/* If they are at a broken link, send them Home instead of showing a blank 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);