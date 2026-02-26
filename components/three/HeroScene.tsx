"use client";

import { Suspense, useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, scales, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 3;

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = (Math.random() - 0.5) * 2;

      orig[i3] = pos[i3];
      orig[i3 + 1] = pos[i3 + 1];
      orig[i3 + 2] = pos[i3 + 2];

      scl[i] = Math.random() * 0.5 + 0.3;
    }
    return [pos, scl, orig];
  }, [count]);

  const onPointerMove = useCallback(
    (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", onPointerMove);
    return () => window.removeEventListener("mousemove", onPointerMove);
  }, [onPointerMove]);

  useFrame((state) => {
    if (!mesh.current) return;
    const geometry = mesh.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      const noiseX = Math.sin(time * 0.3 + i * 0.01) * 0.15;
      const noiseY = Math.cos(time * 0.2 + i * 0.015) * 0.15;
      const noiseZ = Math.sin(time * 0.25 + i * 0.02) * 0.1;

      const mouseWorldX = mouse.current.x * viewport.width * 0.5;
      const mouseWorldY = mouse.current.y * viewport.height * 0.5;

      const dx = ox + noiseX - mouseWorldX;
      const dy = oy + noiseY - mouseWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 3);
      const pushStrength = influence * influence * 0.8;

      posAttr.setXYZ(
        i,
        ox + noiseX + (dx / (dist || 1)) * pushStrength,
        oy + noiseY + (dy / (dist || 1)) * pushStrength,
        oz + noiseZ
      );
    }

    posAttr.needsUpdate = true;

    mesh.current.rotation.z = time * 0.02;
    mesh.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00D4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    meshRef.current.rotation.x = time * 0.1 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = time * 0.15 + mouse.current.x * 0.3;
    meshRef.current.position.x = mouse.current.x * 0.5;
    meshRef.current.position.y = mouse.current.y * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial
        color="#00D4FF"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.elapsedTime;
    linesRef.current.rotation.z = time * 0.015;
    linesRef.current.rotation.x = Math.sin(time * 0.08) * 0.05;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];

    for (let i = 0; i < 40; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 1.5 + Math.random() * 2;

      const theta2 = theta1 + (Math.random() - 0.5) * 1;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
      const r2 = 1.5 + Math.random() * 2;

      points.push(
        r1 * Math.sin(phi1) * Math.cos(theta1),
        r1 * Math.sin(phi1) * Math.sin(theta1),
        (Math.random() - 0.5) * 1.5
      );
      points.push(
        r2 * Math.sin(phi2) * Math.cos(theta2),
        r2 * Math.sin(phi2) * Math.sin(theta2),
        (Math.random() - 0.5) * 1.5
      );
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return geo;
  }, []);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#7B61FF"
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.elapsedTime;
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.15;
    ringRef.current.rotation.z = time * 0.08;
    ringRef.current.position.y = Math.sin(time * 0.4) * 0.2;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[2.5, 0.005, 16, 100]} />
      <meshBasicMaterial
        color="#7B61FF"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Particles count={600} />
          <FloatingMesh />
          <ConnectionLines />
          <FloatingRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
