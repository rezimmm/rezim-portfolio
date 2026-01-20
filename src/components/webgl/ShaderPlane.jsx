import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShaderPlane() {
  const materialRef = useRef();

  useFrame(({ clock, mouse }) => {
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value = new THREE.Vector2(mouse.x, mouse.y);
  });


  return (
    <mesh scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }}

        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;

          void main() {
            float dist = distance(vUv, uMouse);
            float glow = 0.15 / (dist + 0.05);

            vec3 base = vec3(0.02, 0.1, 0.4);
            vec3 highlight = vec3(0.0, 0.8, 0.6);

            vec3 color = mix(base, highlight, glow);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}
