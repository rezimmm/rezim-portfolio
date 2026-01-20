import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import StorySection from "../components/StorySection";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-slate-300">
        Loading projects...
      </section>
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */
  if (!projects.length) {
    return (
      <section className="min-h-screen flex items-center justify-center text-slate-400">
        No projects added yet.
      </section>
    );
  }

  return (
    <StorySection
      id="projects"
      className="scroll-mt-32 relative"
    >
      {/* BACKGROUND GLOW */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2
                   w-[700px] h-[700px]
                   bg-blue-500/10 blur-[160px]
                   rounded-full -z-10"
      />

      <div ref={ref} className="max-w-7xl mx-auto">

        {/* =========================
           STORY CHAPTER — TITLE
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >

          {/* ✅ FIXED: motion.h1 */}
          <motion.h1
            className="
              relative z-10
              text-6xl md:text-7xl font-extrabold mb-6 leading-[1.15]
              bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500
              bg-clip-text text-transparent
              inline-block
            "
          >
            Projects
            <span
              className="absolute left-1/2 -bottom-3 h-[3px] w-16
               -translate-x-1/2 rounded-full
               bg-gradient-to-r from-blue-500 to-cyan-400"
            />
          </motion.h1>

          <p className="mt-6 text-slate-400 max-w-xl mx-auto">
            Selected works showcasing real-world applications,
            clean architecture, and performance-focused UI.
          </p>
        </motion.div>

        {/* =========================
           STORY CHAPTER — GRID
        ========================= */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3
                        max-w-7xl mx-auto px-2">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: index * 0.08,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                group rounded-3xl overflow-hidden
                bg-white/5 backdrop-blur-xl
                border border-white/10
                hover:border-blue-400/50
                hover:-translate-y-2
                hover:shadow-2xl hover:shadow-blue-500/20
                transition-all duration-500
              "
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={
                    project.image?.startsWith("http")
                      ? project.image
                      : `${import.meta.env.VITE_API_URL}${project.image}`
                  }
                  alt={project.title}
                  className="
                    w-full h-48 object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <h2 className="text-xl font-semibold mb-2">
                  {project.title}
                </h2>

                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="
                        text-xs px-3 py-1 rounded-full
                        bg-blue-500/10 text-blue-400
                        border border-blue-500/20
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 text-sm">
                  {project.githubUrl && (
                    <a
                      href={
                        project.githubUrl.startsWith("http")
                          ? project.githubUrl
                          : `https://${project.githubUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white transition"
                    >
                      GitHub →
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={
                        project.liveUrl.startsWith("http")
                          ? project.liveUrl
                          : `https://${project.liveUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Live →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StorySection>
  );
}
