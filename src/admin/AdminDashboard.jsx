import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "./StatCard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const admin = JSON.parse(
    localStorage.getItem("admin") ||
    sessionStorage.getItem("admin") ||
    "{}"
  );

  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    starred: 0,
  });

  /* 🔐 AUTH CHECK */
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  /* 📊 FETCH STATS */
  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/admin/login");
          return;
        }


        const data = await res.json();
        setStats(data);
      } catch {
        // keep previous stats
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen px-10 py-24 text-white max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      {/* Admin Info */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
          {(admin.name || admin.email)?.[0]?.toUpperCase() || "R"}
        </div>

        <div>
          <p className="font-semibold">
            {admin.name || "Rezim"}
          </p>
          <p className="text-sm text-gray-400">
            {admin.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Messages" value={stats.total} />
        <StatCard title="Unread Messages" value={stats.unread} />
        <StatCard title="Starred" value={stats.starred} />
      </div>

      {/* Links */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link className="card" to="/admin/inbox">
          📥 Open Inbox
        </Link>

        <Link className="card" to="/admin/projects">
          📁 Manage Projects
        </Link>

        <Link className="card" to="/admin/projects/new">
          ➕ Add Project
        </Link>

        <Link className="card" to="/admin/resume">
          📝 Edit Resume
        </Link>

        <button
          onClick={handleLogout}
          className="p-6 bg-red-500/20 border border-red-500/40 rounded-xl"
        >
          🚪 Logout
        </button>
      </div>

    </div>
  );
}
