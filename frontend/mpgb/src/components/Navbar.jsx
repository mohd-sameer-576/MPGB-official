import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="border-b sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-black">
          BRAND.
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/shop" className="hover:text-black transition">Shop</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
          
          {/* Admin Button Logic */}
          {user ? (
            <Link 
              to="/dashboard" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-indigo-700 transition"
            >
              DASHBOARD
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="border border-gray-300 px-4 py-2 rounded-md text-xs font-bold hover:bg-gray-50 transition"
            >
              ADMIN LOGIN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;