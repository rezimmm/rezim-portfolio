import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StorySection({ children, className = "", id }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // ✅ SAFE RANGE
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative min-h-[160vh] ${className}`}
    >
      {/* 🔥 THIS IS THE FIX */}
      <div
        id={`${id}-anchor`}
        className="absolute top-[45vh] left-0 w-full h-px"
      />

      <motion.div
        style={{ y, opacity }}
        className="sticky top-24 h-[calc(100vh-6rem)] flex items-center"
      >
        <div className="w-full">{children}</div>
      </motion.div>
    </section>
  );
}
