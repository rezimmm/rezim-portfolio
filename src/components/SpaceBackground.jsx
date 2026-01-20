import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function SpaceBackground() {
  return (
    <Canvas className="fixed inset-0 -z-10">
      <Stars radius={100} depth={50} count={5000} factor={4} />
    </Canvas>
  );
}
