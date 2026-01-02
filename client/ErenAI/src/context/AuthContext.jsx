import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE AUTO-LOGIN
  useEffect(() => {
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  loadUser();
}, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setUser(res.data.user);
  };

  // 🔐 REGISTER
  const register = async (name, email, password) => {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    setUser(res.data.user);
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
