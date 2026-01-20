import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function ScrollCamera() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => (scrollY.current = window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    camera.position.z = 5 + scrollY.current * 0.002;
    camera.position.y = -scrollY.current * 0.001;
  });

  return null;
}
