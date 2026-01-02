import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      // redirect after login
      window.location.href = "/chat";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Login to continue using Eren AI
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
