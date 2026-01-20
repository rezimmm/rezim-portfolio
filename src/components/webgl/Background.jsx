import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        pointerEvents: "none",   // IMPORTANT
        touchAction: "none",     // IMPORTANT
      }}
    >
      <Canvas
        eventSource={document.body}   // 🔥 THIS FIXES SCROLL
        eventPrefix="client"
        camera={{ position: [0, 0, 4] }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />

        <Sphere args={[1.6, 100, 200]} scale={2.4}>
          <MeshDistortMaterial
            color="#3b82f6"
            distort={0.45}
            speed={2}
            roughness={0.1}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}
