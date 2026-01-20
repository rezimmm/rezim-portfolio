import Reveal from "../components/Reveal";
import { motion } from "framer-motion";
import { FaJava } from "react-icons/fa";

import {
  SiPython,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";

/* =========================
   SKILLS WITH ICONS
========================= */
const skills = [
  { name: "Java", icon: FaJava, color: "text-orange-500" },
  { name: "Python", icon: SiPython, color: "text-blue-400" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "Express", icon: SiExpress, color: "text-gray-300" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
];

/* =========================
   EXPERIENCE
========================= */
const experience = [
  {
    role: "Full Stack Developer",
    company: "Personal Projects",
    year: "2024 - Present",
    desc: "Building modern MERN stack applications with animations, authentication, admin dashboards, and REST APIs.",
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    year: "2023 - 2024",
    desc: "Designed responsive, animated UI/UX using React, Tailwind CSS, and Framer Motion.",
  },
];

export default function Resume() {
  return (
    <section
      className="
        relative py-32 overflow-hidden
        bg-[radial-gradient(circle_at_top,#0f172a,#020617_70%)]
      "
    >

      <div
        id="resume-anchor"
        className="absolute top-[45vh] left-0 w-full h-px"
      />

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2
                      w-[700px] h-[700px]
                      bg-blue-500/20 blur-[140px] rounded-full -z-10" />

      {/* =========================
         HEADING + DOWNLOAD
      ========================= */}
      <Reveal>
        <h2 className="text-5xl md:text-6xl font-extrabold text-center
               bg-gradient-to-r from-blue-400 to-cyan-400
               bg-clip-text text-transparent mb-4 drop-shadow-[0_0_30px_rgba(59,130,246,0.35)]">
          Resume & Skills
        </h2>

        <p className="text-center text-slate-400 max-w-xl mx-auto mb-10">
          Technologies, experience & professional background
        </p>

        <div className="flex justify-center mt-8">
          <a
            href={`${import.meta.env.VITE_API_URL}/uploads/Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-8 py-3
              rounded-full
              bg-gradient-to-r from-blue-600 to-cyan-500
              text-white font-medium
              shadow-lg shadow-blue-500/40
              hover:shadow-blue-500/70
              hover:scale-105
              transition-all duration-300
            "
          >
            📄 Download Resume
          </a>
        </div>

      </Reveal>

      {/* =========================
         SKILLS SECTION
      ========================= */}
      <Reveal>
        <div className="flex items-center gap-4 mt-24 mb-12">
          <span className="h-[2px] w-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />

          <h3
            className="
      text-3xl md:text-4xl font-extrabold tracking-wide
      bg-gradient-to-r from-blue-400 to-cyan-400
      bg-clip-text text-transparent
    "
          >
            Skills
          </h3>

          <span className="h-[2px] flex-1 bg-white/10 rounded-full" />
        </div>

        <div
          className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
            gap-6
            px-4 sm:px-8 md:px-16 lg:px-24
          "
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 p-7 rounded-3xl
                         bg-gradient-to-br from-white/10 to-white/0
                         border border-white/10
                         hover:border-blue-400/60
                         hover:shadow-xl hover:shadow-blue-500/20
                         hover:-translate-y-2
                         transition-all duration-300"
            >
              <skill.icon className={`text-4xl ${skill.color}`} />
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* =========================
         EXPERIENCE SECTION
      ========================= */}
      <Reveal>
        <div className="px-6 md:px-16 max-w-6xl">
          <h3 className="text-3xl font-semibold mt-28 mb-10">
            Experience
          </h3>

          <div className="relative space-y-16 pl-14 pr-6 border-l border-white/20">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-8"
              >
                <span className="absolute -left-[11px] top-2 w-5 h-5
                               bg-gradient-to-r from-blue-500 to-cyan-400
                               rounded-full shadow-lg shadow-blue-500/60" />

                <h4 className="text-xl font-bold">
                  {item.role} —{" "}
                  <span className="text-blue-400">{item.company}</span>
                </h4>

                <p className="text-sm text-gray-400 mb-2">{item.year}</p>
                <p className="text-gray-300 max-w-2xl leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
