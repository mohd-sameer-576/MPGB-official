import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          {/* We wrap dashboard in a layout-like structure */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          
          {/* Example: Route for individual product details or editing */}
          <Route 
            path="/product/:id" 
            element={
              <>
                <Navbar />
                <div className="p-8 text-center">Product Detail View (Coming Soon)</div>
              </>
            } 
          />
        </Route>

        {/* Global Redirect: If user goes to "/", send them to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 Catch-all */}
        <Route path="*" element={<div className="h-screen flex items-center justify-center">404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;