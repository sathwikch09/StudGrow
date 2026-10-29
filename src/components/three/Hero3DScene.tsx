import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Cone, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atomRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle mouse parallax
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.mouse.y * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.2 + t * 0.08, 0.05);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.y = t * 0.3;
    }
    if (atomRef.current) {
      atomRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing atom sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.7, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#4F46E5"
            roughness={0.2}
            metalness={0.8}
            emissive="#312E81"
            emissiveIntensity={0.6}
          />
        </Sphere>
      </Float>

      {/* Orbital glowing ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <Torus args={[1.3, 0.04, 16, 64]}>
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#7C3AED"
            emissiveIntensity={0.8}
            roughness={0.3}
          />
        </Torus>
      </mesh>

      {/* Second inclined ring */}
      <mesh ref={atomRef} rotation={[Math.PI / 3, 0, 0]}>
        <Torus args={[1.5, 0.03, 16, 64]}>
          <meshStandardMaterial
            color="#14B8A6"
            emissive="#0D9488"
            emissiveIntensity={0.8}
            roughness={0.3}
          />
        </Torus>
      </mesh>

      {/* Floating Geometric shapes representing knowledge */}
      {/* Floating Book / Tablet */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-1.8, 1.2, -0.5]} rotation={[0.4, 0.6, 0.2]}>
          <boxGeometry args={[0.8, 1.1, 0.15]} />
          <meshStandardMaterial color="#6366F1" roughness={0.4} />
        </mesh>
      </Float>

      {/* Rising Bar Chart Block 1 */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <Cylinder args={[0.2, 0.2, 0.8, 16]} position={[1.8, -0.8, -0.2]}>
          <meshStandardMaterial color="#22C55E" roughness={0.3} metalness={0.4} />
        </Cylinder>
      </Float>

      {/* Rising Bar Chart Block 2 */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Cylinder args={[0.2, 0.2, 1.3, 16]} position={[2.3, -0.5, -0.4]}>
          <meshStandardMaterial color="#10B981" roughness={0.3} metalness={0.5} />
        </Cylinder>
      </Float>

      {/* Science Cone */}
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1}>
        <Cone args={[0.4, 0.9, 16]} position={[-1.7, -1.1, 0.2]} rotation={[-0.3, 0.2, 0.5]}>
          <meshStandardMaterial color="#F59E0B" roughness={0.3} />
        </Cone>
      </Float>

      {/* Small floating particles */}
      <Sphere args={[0.1, 16, 16]} position={[-1.2, 0.8, 0.8]}>
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[1.4, 1.3, -0.6]}>
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
}

export const Hero3DScene: React.FC = () => {
  const liteMode = useAppStore((s) => s.liteMode);

  if (liteMode) {
    // 2D High-performance CSS fallback
    return (
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl animate-pulse" />
        <div className="relative text-center p-8">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-4xl shadow-xl shadow-indigo-500/25 mb-4">
            🚀
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            StudGrow 3D Adaptive Engine
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Lite mode active (Low battery & high speed optimization)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -4, -2]} intensity={0.6} color="#4F46E5" />
        <pointLight position={[3, 4, 3]} intensity={0.8} color="#14B8A6" />
        <Suspense fallback={null}>
          <FloatingObjects />
        </Suspense>
      </Canvas>
    </div>
  );
};
