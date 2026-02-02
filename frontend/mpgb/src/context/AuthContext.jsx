import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import axios from "axios"; // Only used for the initial login call if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check for user on page refresh
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get("/auth/me");
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      // Use your API instance so base URL and headers are consistent
      const res = await API.post("/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        
        // This is the key: set the header for all future API calls immediately
        API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        
        setUser(res.data.user);
        return res.data; 
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error; 
    }
  };

  // 3. Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);