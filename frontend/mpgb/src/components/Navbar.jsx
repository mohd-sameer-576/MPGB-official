import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h2 className="text-xl font-bold tracking-tight">ADMIN PANEL</h2>
      <div className="flex items-center gap-4">
        <span className="text-slate-300">Welcome, {user?.name}</span>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;