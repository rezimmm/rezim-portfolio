import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN BASED ON REMEMBER ME
      if (remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("admin", JSON.stringify(data.admin));
      }

      // ✅ REDIRECT AFTER LOGIN
      navigate("/admin/dashboard");
    } catch {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md p-10 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

        <h2 className="text-3xl font-extrabold mb-2 text-center">
          Admin Login
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Secure access to dashboard
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="w-full mb-5 p-3 rounded-lg bg-transparent
          border border-white/20 focus:border-blue-500
          focus:outline-none transition"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-3 rounded-lg bg-transparent
            border border-white/20 focus:border-blue-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2
            cursor-pointer text-gray-400 hover:text-blue-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2 mb-6 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="accent-blue-500"
          />
          Remember me
        </label>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600
          shadow-lg shadow-blue-500/40 hover:bg-blue-700 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </motion.button>
      </motion.form>
    </div>
  );
}
