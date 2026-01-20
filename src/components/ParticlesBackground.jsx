import { Canvas } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

function Particles() {
  const count = 1000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  return (
    <Points positions={positions} stride={3}>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticlesBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    >
      <Particles />
    </Canvas>
  );
}
