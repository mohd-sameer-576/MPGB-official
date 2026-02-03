import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Call the login function from Context
      await login(email, password);
      
      // 2. If successful, the token is now in localStorage via AuthContext
      // 3. Move to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid Admin Credentials or Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FFFBF7]">
      <form 
        onSubmit={handleLogin} 
        className="p-10 bg-white shadow-xl rounded-2xl w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
            MPGB_<span className="text-orange-600">COLLECTION</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Admin Control Panel</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="admin@ethnicvibe.com" 
              className="w-full p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
            loading ? 'bg-slate-400' : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
          }`}
        >
          {loading ? "Verifying..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default Login;