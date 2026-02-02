import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar stays outside Routes so it shows on every page */}
      <Navbar /> 
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Changed this to /admin/dashboard to avoid conflicts */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        {/* THIS IS THE CULPRIT: 
           If this is placed ABOVE other routes, it catches everything. 
           It must be the very LAST route.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;