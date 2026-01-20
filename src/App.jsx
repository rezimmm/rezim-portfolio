import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminInbox from "./admin/AdminInbox";
import AdminResume from "./admin/AdminResume";
import AdminProjects from "./admin/AdminProjects";
import AdminProjectList from "./admin/AdminProjectList";
import AdminRoute from "./admin/AdminRoute";

import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Background from "./components/webgl/Background";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  // ✅ Detect admin routes
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className={`relative min-h-screen overflow-visible bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white ${isAdmin ? "admin-page" : ""}`}>

      {!isAdmin && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Background />
        </div>
      )}

      {!isAdmin && <Cursor />}

      <Navbar />

      <main className="pt-20 relative z-10">
        <Routes>
          {/* 🌍 PUBLIC SITE (NORMAL SCROLL) */}
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Home />
                </section>

                <Projects />

                <section id="resume">
                  <Resume />
                </section>

                <section id="contact">
                  <Contact />
                </section>

                <section id="footer">
                  <Footer />
                </section>
              </>
            }
          />

          {/* 🔐 ADMIN AUTH */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 🔐 ADMIN DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* 📥 ADMIN INBOX */}
          <Route
            path="/admin/inbox"
            element={
              <AdminRoute>
                <AdminInbox />
              </AdminRoute>
            }
          />

          {/* 📄 ADMIN RESUME */}
          <Route
            path="/admin/resume"
            element={
              <AdminRoute>
                <AdminResume />
              </AdminRoute>
            }
          />

          {/* 🧩 ADMIN PROJECTS */}
          <Route
            path="/admin/projects"
            element={
              <AdminRoute>
                <AdminProjectList />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/projects/new"
            element={
              <AdminRoute>
                <AdminProjects />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/projects/edit/:id"
            element={
              <AdminRoute>
                <AdminProjects />
              </AdminRoute>
            }
          />

          {/* 🔁 FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </div>
  );
}
