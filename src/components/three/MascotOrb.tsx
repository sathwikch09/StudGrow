import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#6366F1"
          roughness={0.15}
          metalness={0.85}
          emissive="#4338CA"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export const MascotOrb: React.FC<{ size?: number }> = ({ size = 110 }) => {
  const liteMode = useAppStore((s) => s.liteMode);

  if (liteMode) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-teal-400 p-1 flex items-center justify-center shadow-lg shadow-indigo-500/20 animate-pulse"
      >
        <div className="w-full h-full rounded-full bg-slate-900/40 flex items-center justify-center text-3xl">
          🤖
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }} className="relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[2, 3, 2]} intensity={2} color="#818CF8" />
        <pointLight position={[-2, -1, 1]} intensity={1.5} color="#2DD4BF" />
        <Suspense fallback={null}>
          <OrbMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};
