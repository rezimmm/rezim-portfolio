import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

function GmailIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red */}
      <path
        d="M502.3 190.8L327.4 338.1l-71.4-53.6-71.4 53.6L9.7 190.8 256 31.9z"
        fill="#EA4335"
      />
      {/* Blue */}
      <path
        d="M9.7 190.8v234.6c0 23.4 19 42.4 42.4 42.4h85.1V256z"
        fill="#4285F4"
      />
      {/* Green */}
      <path
        d="M374.8 467.8h85.1c23.4 0 42.4-19 42.4-42.4V190.8L374.8 256z"
        fill="#34A853"
      />
      {/* Yellow */}
      <path
        d="M137.2 467.8h237.6V256l-118.8 89.1L137.2 256z"
        fill="#FBBC04"
      />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  /* -----------------------
     SCROLL EFFECTS
  ----------------------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  /* -----------------------
     ACTIVE SECTION TRACK
  ----------------------- */
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("-anchor", ""));
          }
        });
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 mx-auto z-50 w-[94%] sm:w-[92%] max-w-5xl"
    >
      {/* DESKTOP BAR */}
      <div
        className={`
          flex items-center justify-between
          px-6 py-3 rounded-full
          backdrop-blur-xl border border-white/10
          transition-all duration-300
          ${scrolled
            ? "bg-black/85 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            : "bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"}
        `}
      >
        {/* LOGO */}
        <button
          onClick={() => scrollTo("home")}
          className="px-3 py-2 rounded-full bg-white text-black font-bold text-sm"
        >
          Rezim <span className="text-blue-600">.dev</span>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-sm">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative transition
                ${active === link.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"}
              `}
            >
              {link.label}
              {active === link.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <a
          href={
            import.meta.env.PROD
              ? "https://rezimmmm.github.io/rezim-admin/"
              : "http://localhost:5174/admin/login"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-sm text-white/70 hover:text-white"
        >
          Admin
        </a>

        {/* CTA */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=rezimtitoria04@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="
            hidden md:flex
            group relative overflow-hidden
            px-5 py-2.5 rounded-full
            bg-white text-black
            text-sm font-semibold
            items-center gap-3
            transition-all duration-300
            hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]
          "
        >
          {/* Gmail SVG Icon */}
          <motion.div
            initial={{ x: 0, rotate: 0 }}
            whileHover={{ x: 5, rotate: 12 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <GmailIcon className="w-5 h-5" />
          </motion.div>

          <span>Email Me</span>

          {/* Shine sweep */}
          <span
            className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/60 to-transparent
      translate-x-[-100%]
      group-hover:translate-x-[100%]
      transition-transform duration-700
    "
          />
        </motion.a>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-4 md:hidden
            rounded-2xl
            bg-black/85 backdrop-blur-xl
            border border-white/10
            p-6 flex flex-col gap-4
          "
        >
          {/* Mobile nav links */}
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left text-lg transition
                ${active === link.id
                  ? "text-blue-400"
                  : "text-white/80 hover:text-white"}
              `}
            >
              {link.label}
            </button>
          ))}

          {/* Divider */}
          <div className="h-px bg-white/10 my-2" />

          {/* Admin link (mobile) */}
          <a
            href={
              import.meta.env.PROD
                ? "https://rezimmmm.github.io/rezim-admin/"
                : "http://localhost:5174/admin/login"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-4 py-2 rounded-full
                       border border-white/20
                       text-white/80 hover:bg-white/10 transition"
          >
            Admin Login
          </a>

          {/* Email CTA (mobile only) */}
          <a
            href="mailto:rezimtitoria04@gmail.com"
            className="px-4 py-2 rounded-full
                       bg-white text-black
                       text-center font-medium"
          >
            Email Me
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
