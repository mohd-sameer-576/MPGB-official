import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX  } from "react-icons/fi";
import {FaTshirt } from 'react-icons/fa'

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
          MPGB_<span className="text-orange-600">COLLECTION</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
          <Link
            to="/"
            className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-orange-600 group"
          >
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            to="/shop"
            className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-orange-600 group"
          >
            Shop
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          <Link
            to="/contact"
            className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-orange-600 group"
          >
            Contact
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl 
               shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 hover:shadow-indigo-500/50 
               transition-all duration-300 active:scale-95 group"
            >
              <span>Dashboard</span>
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-2.5 border-2 border-gray-900 text-gray-900 font-bold 
               rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 
               active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Login
            </Link>
          )}

          {/* Show Dashboard ONLY if user/token exists */}
        </div>

        {/* Right Icons & Hamburger */}
        <div className="flex items-center gap-5">
          <Link to="/shop" className="text-slate-800">
            <FaTshirt  size={22} />
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
        className={`fixed inset-0 bg-white z-60 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden flex flex-col items-center justify-center gap-8 text-2xl font-bold`}
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
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl 
               shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 hover:shadow-indigo-500/50 
               transition-all duration-300 active:scale-95 group"
          >
            <span>Dashboard</span>
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center px-6 py-2.5 border-2 border-gray-900 text-gray-900 font-bold 
               rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 
               active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
