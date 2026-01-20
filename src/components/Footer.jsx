import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* TOP GRADIENT LINE */}
      <div className="absolute top-0 left-0 w-full h-px
        bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
      />

      {/* GLOW */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2
        w-[600px] h-[600px]
        bg-blue-500/20 blur-[160px] rounded-full -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          max-w-7xl mx-auto
          px-6 md:px-16 py-16
          grid gap-12 md:grid-cols-3
        "
      >
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold tracking-wide">
            Rezim<span className="text-blue-500">.dev</span>
          </h3>

          <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
            Building immersive, cinematic, and performance-focused web
            experiences using modern technologies.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-slate-300 mb-4">
            Navigation
          </h4>

          <ul className="space-y-3 text-slate-400">
            {["Home", "Projects", "Resume", "Contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() =>
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-white transition"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-slate-300 mb-4">
            Contact
          </h4>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=rezimtitoria04@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Rezim,"
            target="_blank"
            rel="noopener noreferrer"
            className="
    px-4 py-2 rounded-full
    bg-white text-black
    text-sm font-medium
    hover:bg-gray-200 transition
  "
          >
            Email Me
          </a>

          <p className="mt-6 text-xs text-slate-500">
            Available for freelance & full-time opportunities
          </p>
        </div>
      </motion.div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6
          flex flex-col md:flex-row gap-4
          items-center justify-between text-xs text-slate-500"
        >
          <span>© {new Date().getFullYear()} Rezim.dev All rights reserved.</span>
          <span>Designed & built with ❤️</span>
        </div>
      </div>
    </footer>
  );
}
