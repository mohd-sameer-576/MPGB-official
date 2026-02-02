import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiShoppingBag, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-black tracking-tighter"
        >
          ETHNIC<span className="text-orange-600">VIBE.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          <Link to="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <Link to="/shop" className="hover:text-orange-600 transition">
            Shop
          </Link>
          <Link to="/contact" className="hover:text-orange-600 transition">
            Contact
          </Link>

          {/* Show Dashboard ONLY if user/token exists */}
          {user ? (
            <Link
              to="/dashboard"
              className="text-indigo-600 font-bold hover:text-indigo-700"
            >
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="hover:text-orange-600 transition">
              Login
            </Link>
          )}
        </div>

        {/* Right Icons & Hamburger */}
        <div className="flex items-center gap-5">
          <Link to="/shop" className="text-slate-800">
            <FiShoppingBag size={22} />
          </Link>
          <Link to="/login" className="hidden md:block text-slate-800">
            <FiUser size={22} />
          </Link>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 focus:outline-none"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed inset-0 bg-white z-[60] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden flex flex-col items-center justify-center gap-8 text-2xl font-bold`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-slate-400"
        >
          <FiX size={30} />
        </button>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/shop" onClick={() => setIsOpen(false)}>
          Shop
        </Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
        {user ? (
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
