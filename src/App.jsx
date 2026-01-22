import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Background from "./components/webgl/Background";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white">
      <Background />
      <Cursor />
      <Navbar />

      <main className="pt-20 relative z-10">
        <Routes>
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

                <Footer />
              </>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
