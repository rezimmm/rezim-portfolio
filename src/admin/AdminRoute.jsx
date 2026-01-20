import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("checking");

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setStatus("unauthorized");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setStatus("authorized");
      })
      .catch(() => {
        localStorage.clear();
        sessionStorage.clear();
        setStatus("unauthorized");
      });
  }, [token]);

  /* ⏳ Loading */
  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying admin access...
      </div>
    );
  }

  /* 🔐 Not allowed */
  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  /* ✅ Allowed */
  return children;
}
