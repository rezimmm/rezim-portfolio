import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import profile from "../assets/rezim.jpg";

const introText = "Hi, I’m Rezim";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Creative Engineer",
  "Web Experience Designer",
];

export default function Home() {
  /* =======================
     STATE
  ======================= */
  const [name, setName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  /* =======================
     TYPING EFFECT (NAME)
  ======================= */
  useEffect(() => {
    if (nameIndex < introText.length) {
      const t = setTimeout(() => {
        setName(introText.slice(0, nameIndex + 1));
        setNameIndex((i) => i + 1);
      }, 70);
      return () => clearTimeout(t);
    }
  }, [nameIndex]);

  /* =======================
     TYPING EFFECT (ROLES)
  ======================= */
  useEffect(() => {
    let timeout;
    const role = roles[roleIndex];

    if (!isDeleting && charIndex < role.length) {
      timeout = setTimeout(() => {
        setText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 90);
    } else if (!isDeleting) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (charIndex > 0) {
      timeout = setTimeout(() => {
        setText(role.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 50);
    } else {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  /* =======================
     MOUSE PARALLAX
  ======================= */
  useEffect(() => {
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 30,
          y: (e.clientY / window.innerHeight - 0.5) * 30,
        });
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* =======================
     STORY VARIANTS
  ======================= */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="
          relative min-h-screen
          flex items-start
          px-6 md:px-16
          pt-32
          overflow-hidden
          bg-gradient-to-br from-[#020617] via-[#020617] to-black
        "
      >
        {/* TOP MASK */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-32
                        bg-gradient-to-b from-[#020617] to-transparent z-10" />

        {/* GLOWS */}
        <div className="absolute w-[600px] h-[600px] bg-blue-500/30 blur-[160px] rounded-full -top-40 -left-40 -z-10" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-[160px] rounded-full bottom-[-200px] right-[-100px] -z-10" />

        {/* CONTENT */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            relative z-10
            w-full max-w-7xl mx-auto
            grid md:grid-cols-2
            items-center gap-24
          "
        >
          {/* LEFT */}
          <motion.div
            variants={item}
            className="max-w-xl"
            style={{
              translateX: mouse.x * 0.4,
              translateY: mouse.y * 0.4,
            }}
          >
            {/* NAME */}
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 flex items-center gap-1 whitespace-nowrap"
            >
              {/* Typed intro text */}
              <span className="text-white">
                {name.startsWith("Hi, I’m") ? "Hi, I’m\u00A0" : name}
              </span>

              {/* Typed name */}
              {name.includes("Rezim") && (
                <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,1)]">
                  Rezim
                </span>
              )}

              {/* Cursor while typing */}
              {nameIndex < introText.length && (
                <motion.span
                  className="ml-1 text-blue-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                >
                  |
                </motion.span>
              )}

              {/* Wave after typing */}
              {nameIndex >= introText.length && (
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                >
                  👋
                </motion.span>
              )}
            </motion.h1>

            {/* ROLES */}
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-300 min-h-[3rem]">
              <span className="text-blue-400">{text}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1 text-blue-400"
              >
                |
              </motion.span>
            </h2>

            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-xl">
              I craft immersive, cinematic web experiences that feel alive.
            </p>

            <motion.div variants={item} className="mt-14 flex gap-8 flex-wrap">
              <MagneticButton
                primary
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </MagneticButton>

              <MagneticButton
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={item}
            style={{
              translateX: mouse.x * -0.3,
              translateY: mouse.y * -0.3,
            }}
            whileHover={{ scale: 1.05 }}
            className="relative mx-auto"
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-blue-400/40 blur-3xl"
            />
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl" />

            <div className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px]
                            rounded-full overflow-hidden border border-white/25
                            bg-white/5 backdrop-blur-xl shadow-2xl">
              <img src={profile} alt="Rezim" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

/* =======================
   MAGNETIC BUTTON
======================= */
function MagneticButton({ children, onClick, primary }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - rect.left - rect.width / 2) * 0.2,
          y: (e.clientY - rect.top - rect.height / 2) * 0.2,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <button
        onClick={onClick}
        className={`px-10 py-4 rounded-full text-lg transition ${primary
          ? "bg-blue-600 shadow-xl shadow-blue-500/40 hover:bg-blue-500"
          : "border border-white/30 hover:bg-white/10"
          }`}
      >
        {children}
      </button>
    </motion.div>
  );
}
