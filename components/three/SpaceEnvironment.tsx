"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGPUTier, type GPUTier } from "@/hooks/useGPUTier";

import {
  starfieldVert,
  starfieldFrag,
  nebulaVert,
  nebulaFrag,
  ringVert,
  ringFrag,
  planetGlowVert,
  planetGlowFrag,
} from "./shaders";

// ─── Sun Configuration ──────────────────────────────────────────────
const SUN_POSITION: [number, number, number] = [160, 80, -100];
const SUN_DIRECTION = new THREE.Vector3(...SUN_POSITION).normalize();

// ─── Sun Component ──────────────────────────────────────────────────
function Sun() {
  return (
    <group position={SUN_POSITION}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#FFF5D0" />
      </mesh>
    </group>
  );
}

// ─── Starfield ──────────────────────────────────────────────────────

function starColor(temp: number): [number, number, number] {
  const t = temp / 100;
  let r: number, g: number, b: number;
  if (t <= 66) r = 1.0;
  else r = Math.max(0, Math.min(1, 1.292936 * Math.pow(t - 60, -0.1332)));
  if (t <= 66) g = Math.max(0, Math.min(1, 0.39008 * Math.log(t) - 0.63184));
  else g = Math.max(0, Math.min(1, 1.129891 * Math.pow(t - 60, -0.0755)));
  if (t >= 66) b = 1.0;
  else if (t <= 19) b = 0.0;
  else b = Math.max(0, Math.min(1, 0.54321 * Math.log(t - 10) - 1.19625));
  return [r, g, b];
}

function Starfield({ tier }: { tier: GPUTier }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = tier === "high" ? 12000 : tier === "medium" ? 8000 : 5000;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 150;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 20;
      positions[i * 3 + 2] = r * Math.cos(phi) - 80;

      // Power-law magnitude distribution (most stars faint)
      const magnitude = Math.pow(Math.random(), 3.0);
      sizes[i] = 0.2 + magnitude * 1.5;

      // Temperature-based spectral color
      const temp = 2500 + Math.pow(Math.random(), 2.0) * 35000;
      const [cr, cg, cb] = starColor(temp);
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starfieldVert}
        fragmentShader={starfieldFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ─── Milky Way Band ─────────────────────────────────────────────────
function MilkyWayBand({ tier }: { tier: GPUTier }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const count = tier === "high" ? 5000 : tier === "medium" ? 3000 : 1000;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const tilt = new THREE.Euler(0.3, 0.5, 0.2);
    const tiltMatrix = new THREE.Matrix4().makeRotationFromEuler(tilt);
    const tempVec = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.3;
      const phi = Math.PI / 2 + spread;
      const r = 80 + Math.random() * 150;

      tempVec.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      tempVec.applyMatrix4(tiltMatrix);

      positions[i * 3] = tempVec.x;
      positions[i * 3 + 1] = tempVec.y - 20;
      positions[i * 3 + 2] = tempVec.z - 80;

      sizes[i] = 0.15 + Math.pow(Math.random(), 4.0) * 0.5;

      colors[i * 3] = 0.95 + Math.random() * 0.05;
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.08;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.15;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starfieldVert}
        fragmentShader={starfieldFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// ─── Planet System (texture-based) ──────────────────────────────────
interface PlanetConfig {
  position: [number, number, number];
  radius: number;
  texture: string;
  nightTexture?: string;
  emissiveColor: string;
  emissiveIntensity: number;
  rotationSpeed: number;
  axialTilt: number;
  atmosphereColor: string;
  atmosphereOpacity: number;
  roughness: number;
  metalness: number;
  hasRings: boolean;
  ringColor?: string;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
}

const PLANETS: PlanetConfig[] = [
  {
    // Earth — moved further along the track so it doesn't obscure the start
    position: [22, 12, -35], radius: 6,
    texture: "/textures/planets/earth.png",
    nightTexture: "/textures/planets/earth_night.png",
    emissiveColor: "#FFCC66", emissiveIntensity: 0.5,
    rotationSpeed: 0.06, axialTilt: 0.4,
    atmosphereColor: "#4488CC", atmosphereOpacity: 0.25,
    roughness: 0.9, metalness: 0.0,
    hasRings: true, ringColor: "#8899BB", ringInnerRadius: 1.3, ringOuterRadius: 2.0,
  },
  {
    // Ocean world — small, distinct
    position: [18, 10, -55], radius: 4,
    texture: "/textures/planets/ocean_world.png",
    emissiveColor: "#FFFFFF", emissiveIntensity: 0,
    rotationSpeed: 0.05, axialTilt: 0.3,
    atmosphereColor: "#3388BB", atmosphereOpacity: 0.2,
    roughness: 0.9, metalness: 0.0,
    hasRings: false,
  },
  {
    // Gas giant — largest, mid section
    position: [-35, 0, -85], radius: 14,
    texture: "/textures/planets/gas_giant.png",
    emissiveColor: "#FFFFFF", emissiveIntensity: 0,
    rotationSpeed: 0.03, axialTilt: 0.5,
    atmosphereColor: "#AA8855", atmosphereOpacity: 0.15,
    roughness: 0.9, metalness: 0.0,
    hasRings: true, ringColor: "#B8A888", ringInnerRadius: 1.3, ringOuterRadius: 2.2,
  },
  {
    // Ice world — medium
    position: [-22, 14, -125], radius: 7,
    texture: "/textures/planets/ice_world.png",
    emissiveColor: "#FFFFFF", emissiveIntensity: 0,
    rotationSpeed: 0.05, axialTilt: 1.7,
    atmosphereColor: "#6699CC", atmosphereOpacity: 0.2,
    roughness: 0.9, metalness: 0.0,
    hasRings: false,
  },
  {
    // Volcanic — second largest, near end
    position: [25, -3, -155], radius: 9,
    texture: "/textures/planets/volcanic.png",
    nightTexture: "/textures/planets/volcanic_night.png",
    emissiveColor: "#FF4400", emissiveIntensity: 0.6,
    rotationSpeed: 0.04, axialTilt: 0.1,
    atmosphereColor: "#CC4422", atmosphereOpacity: 0.2,
    roughness: 0.9, metalness: 0.0,
    hasRings: false,
  },
];

// Atmospheric glow billboard — camera-facing plane behind the planet
function AtmosphereGlow({ radius, color, intensity }: { radius: number; color: string; intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowColor = useMemo(() => new THREE.Color(color), [color]);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) meshRef.current.lookAt(camera.position);
  });

  const size = radius * 3.2;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        vertexShader={planetGlowVert}
        fragmentShader={planetGlowFrag}
        uniforms={{
          uColor: { value: glowColor },
          uIntensity: { value: intensity },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Planet with night/emissive texture
function PlanetWithNight({ config, segments }: { config: PlanetConfig; segments: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [map, nightMap] = useTexture([config.texture, config.nightTexture!]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * config.rotationSpeed;
  });

  return (
    <group position={config.position}>
      <AtmosphereGlow radius={config.radius} color={config.atmosphereColor} intensity={config.atmosphereOpacity} />
      <group ref={groupRef} rotation={[config.axialTilt, 0, 0]}>
        <mesh>
          <sphereGeometry args={[config.radius, segments, segments]} />
          <meshBasicMaterial map={map} />
        </mesh>
        {config.emissiveIntensity > 0 && (
          <mesh>
            <sphereGeometry args={[config.radius * 1.002, segments, segments]} />
            <meshBasicMaterial
              map={nightMap}
              transparent
              opacity={config.emissiveIntensity * 0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}
        {config.hasRings && (
          <PlanetRings
            radius={config.radius}
            innerMult={config.ringInnerRadius ?? 1.3}
            outerMult={config.ringOuterRadius ?? 2.2}
            color={config.ringColor ?? "#888"}
            planetCenter={config.position}
          />
        )}
      </group>
    </group>
  );
}

// Planet without night texture
function PlanetSimple({ config, segments }: { config: PlanetConfig; segments: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const map = useTexture(config.texture);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * config.rotationSpeed;
  });

  return (
    <group position={config.position}>
      <AtmosphereGlow radius={config.radius} color={config.atmosphereColor} intensity={config.atmosphereOpacity} />
      <group ref={groupRef} rotation={[config.axialTilt, 0, 0]}>
        <mesh>
          <sphereGeometry args={[config.radius, segments, segments]} />
          <meshBasicMaterial map={map} />
        </mesh>
        {config.hasRings && (
          <PlanetRings
            radius={config.radius}
            innerMult={config.ringInnerRadius ?? 1.3}
            outerMult={config.ringOuterRadius ?? 2.2}
            color={config.ringColor ?? "#888"}
            planetCenter={config.position}
          />
        )}
      </group>
    </group>
  );
}

function Planet({ config, tier }: { config: PlanetConfig; tier: GPUTier }) {
  const segments = tier === "high" ? 48 : tier === "medium" ? 32 : 24;
  if (config.nightTexture) {
    return <PlanetWithNight config={config} segments={segments} />;
  }
  return <PlanetSimple config={config} segments={segments} />;
}

function PlanetRings({
  radius, innerMult, outerMult, color, planetCenter,
}: {
  radius: number;
  innerMult: number;
  outerMult: number;
  color: string;
  planetCenter: [number, number, number];
}) {
  const ringColor = useMemo(() => new THREE.Color(color), [color]);
  const centerVec = useMemo(() => new THREE.Vector3(...planetCenter), [planetCenter]);

  return (
    <mesh rotation={[Math.PI / 2 + 0.15, 0, 0]}>
      <ringGeometry args={[radius * innerMult, radius * outerMult, 64]} />
      <shaderMaterial
        vertexShader={ringVert}
        fragmentShader={ringFrag}
        uniforms={{
          uSunDir: { value: SUN_DIRECTION },
          uRingColor: { value: ringColor },
          uPlanetCenter: { value: centerVec },
          uPlanetRadius: { value: radius },
        }}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Planets({ tier }: { tier: GPUTier }) {
  return (
    <group>
      {PLANETS.map((config, i) => (
        <Suspense key={i} fallback={null}>
          <Planet config={config} tier={tier} />
        </Suspense>
      ))}
    </group>
  );
}

// ─── Nebula Clouds ──────────────────────────────────────────────────
interface NebulaData {
  position: [number, number, number];
  size: number;
  color1: [number, number, number];
  color2: [number, number, number];
  color3: [number, number, number];
  opacity: number;
}

const NEBULAE: NebulaData[] = [
  // All nebulae pushed deep into the scene — none near the track start
  { position: [-50, -15, -110], size: 60, color1: [0.0, 0.83, 1.0], color2: [0.0, 0.3, 0.6], color3: [0.2, 0.9, 0.8], opacity: 0.16 },
  { position: [55, 30, -140], size: 50, color1: [1.0, 0.0, 1.0], color2: [0.5, 0.0, 0.5], color3: [1.0, 0.5, 0.8], opacity: 0.15 },
  { position: [-70, 25, -130], size: 55, color1: [1.0, 0.42, 0.29], color2: [0.5, 0.15, 0.1], color3: [1.0, 0.7, 0.3], opacity: 0.14 },
  { position: [25, -25, -125], size: 50, color1: [0.29, 0.42, 1.0], color2: [0.1, 0.15, 0.5], color3: [0.5, 0.6, 1.0], opacity: 0.18 },
  { position: [-25, 40, -160], size: 55, color1: [1.0, 0.29, 0.55], color2: [0.5, 0.1, 0.25], color3: [1.0, 0.6, 0.7], opacity: 0.15 },
  { position: [70, -10, -100], size: 45, color1: [0.0, 1.0, 0.53], color2: [0.0, 0.4, 0.2], color3: [0.3, 1.0, 0.6], opacity: 0.12 },
  { position: [-60, 10, -150], size: 60, color1: [0.48, 0.38, 1.0], color2: [0.0, 0.3, 0.8], color3: [0.6, 0.5, 1.0], opacity: 0.16 },
];

function NebulaCloud({ data, complexity }: { data: NebulaData; complexity: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const c1 = useMemo(() => new THREE.Color(...data.color1), [data.color1]);
  const c2 = useMemo(() => new THREE.Color(...data.color2), [data.color2]);
  const c3 = useMemo(() => new THREE.Color(...data.color3), [data.color3]);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={meshRef} position={data.position}>
      <planeGeometry args={[data.size, data.size]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={nebulaVert}
        fragmentShader={nebulaFrag}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: c1 },
          uColor2: { value: c2 },
          uColor3: { value: c3 },
          uOpacity: { value: data.opacity },
          uComplexity: { value: complexity },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function NebulaClouds({ complexity }: { complexity: number }) {
  return (
    <group>
      {NEBULAE.map((nebula, i) => (
        <NebulaCloud key={i} data={nebula} complexity={complexity} />
      ))}
    </group>
  );
}

// ─── Floating Debris ────────────────────────────────────────────────
function SpaceDebris() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 25;

  const { matrices, rotationSpeeds } = useMemo(() => {
    const mats: THREE.Matrix4[] = [];
    const speeds: THREE.Vector3[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 15 + Math.random() * 50;
      dummy.position.set(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 30,
        -30 - Math.random() * 130
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = 0.3 + Math.random() * 0.8;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());
      speeds.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        )
      );
    }
    return { matrices: mats, rotationSpeeds: speeds };
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
    matrices.forEach((m, i) => {
      meshRef.current!.setMatrixAt(i, m);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _euler = useMemo(() => new THREE.Euler(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      _euler.setFromQuaternion(dummy.quaternion);
      _euler.x += rotationSpeeds[i].x * delta;
      _euler.y += rotationSpeeds[i].y * delta;
      _euler.z += rotationSpeeds[i].z * delta;
      dummy.quaternion.setFromEuler(_euler);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#555566"
        roughness={0.8}
        metalness={0.3}
        emissive="#222233"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  );
}

// ─── Main Export ────────────────────────────────────────────────────
export default function SpaceEnvironment() {
  const { tier } = useGPUTier();
  const nebulaComplexity = tier === "high" ? 1.0 : tier === "medium" ? 0.6 : 0.0;

  return (
    <group>
      <Sun />
      <Starfield tier={tier} />
      <MilkyWayBand tier={tier} />
      <Planets tier={tier} />
      <NebulaClouds complexity={nebulaComplexity} />
      <SpaceDebris />
    </group>
  );
}
