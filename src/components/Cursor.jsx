import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;

    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="
        fixed top-0 left-0
        z-[9999]
        w-4 h-4 rounded-full
        bg-blue-500
        pointer-events-none
        shadow-[0_0_20px_rgba(59,130,246,0.8)]
        will-change-transform
        transform: translate3d(x, y, 0);
      "
      style={{
        transform: `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0)`,
      }}
    />
  );
}
