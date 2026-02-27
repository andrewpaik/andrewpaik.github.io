"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { trackCurve, STATIONS } from "@/lib/trackConfig";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { useGPUTier } from "@/hooks/useGPUTier";

import {
  particleStreamVert,
  particleStreamFrag,
} from "./shaders";

// ─── Particle Stream (flowing river of light along the track curve) ──
function ParticleStream() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { tier } = useGPUTier();

  const count = tier === "high" ? 6000 : tier === "medium" ? 4000 : 2000;

  const { geometry, curveTexture } = useMemo(() => {
    // 1. Bake curve into a DataTexture (500 samples, 2 rows: positions + tangents)
    const CURVE_SAMPLES = 500;
    const texData = new Float32Array(CURVE_SAMPLES * 2 * 4);

    for (let i = 0; i < CURVE_SAMPLES; i++) {
      const t = i / (CURVE_SAMPLES - 1);
      const pos = trackCurve.getPointAt(t);
      const tan = trackCurve.getTangentAt(t);

      // Row 0: positions
      const pIdx = i * 4;
      texData[pIdx] = pos.x;
      texData[pIdx + 1] = pos.y;
      texData[pIdx + 2] = pos.z;
      texData[pIdx + 3] = 1.0;

      // Row 1: tangents
      const tIdx = (CURVE_SAMPLES + i) * 4;
      texData[tIdx] = tan.x;
      texData[tIdx + 1] = tan.y;
      texData[tIdx + 2] = tan.z;
      texData[tIdx + 3] = 1.0;
    }

    const tex = new THREE.DataTexture(
      texData,
      CURVE_SAMPLES,
      2,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    // NearestFilter is required — LinearFilter on float textures needs
    // OES_texture_float_linear which isn't universally supported.
    // 500 samples is dense enough that nearest looks smooth.
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;

    // 2. Create per-particle attributes
    const trackTs = new Float32Array(count);
    const offsets = new Float32Array(count * 2);
    const seeds = new Float32Array(count);
    // Dummy position (actual positions computed in vertex shader)
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      trackTs[i] = Math.random();

      const angle = Math.random() * Math.PI * 2;
      // Ring distribution: concentrate particles between 0.25-0.9 radius
      // to leave the center clear for the character
      const r = Math.random();
      const radius = 0.25 + r * 0.65;
      offsets[i * 2] = Math.cos(angle) * radius;
      offsets[i * 2 + 1] = Math.sin(angle) * radius;

      seeds[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("trackT", new THREE.Float32BufferAttribute(trackTs, 1));
    geo.setAttribute("offset", new THREE.Float32BufferAttribute(offsets, 2));
    geo.setAttribute("seed", new THREE.Float32BufferAttribute(seeds, 1));

    // Set a large bounding sphere so particles aren't frustum-culled
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 3, -80), 120);

    return { geometry: geo, curveTexture: tex };
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      const store = useTrackProgress.getState();
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uCharacterProgress.value = store.progress;
      materialRef.current.uniforms.uSpeed.value = store.speed;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleStreamVert}
        fragmentShader={particleStreamFrag}
        uniforms={{
          uTime: { value: 0 },
          uCharacterProgress: { value: 0 },
          uSpeed: { value: 0 },
          uCurveData: { value: curveTexture },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Station Markers (lights only, no geometry to avoid depth-buffer conflicts) ──
const STATION_COLORS = ["#4A5080", "#5A4080", "#405070", "#504A80", "#4A4070"];

function StationMarkers() {
  const markers = useMemo(() => {
    return STATIONS.map((station, i) => {
      const pos = trackCurve.getPointAt(Math.min(station.progress, 0.999));
      return { ...station, position: pos, color: STATION_COLORS[i % STATION_COLORS.length] };
    });
  }, []);

  return (
    <group>
      {markers.map((marker) => (
        <group key={marker.id} position={[marker.position.x, marker.position.y + 0.02, marker.position.z]}>
          <pointLight intensity={0.6} color={marker.color} distance={8} decay={2} />
        </group>
      ))}
    </group>
  );
}

// ─── Ambient Particles (speed-reactive, GPU-tier scaled) ────────────
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const { tier } = useGPUTier();

  const count = tier === "high" ? 1500 : tier === "medium" ? 800 : 400;

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);

    const palette = [
      [1, 1, 1],
      [0, 0.83, 1],
      [0.48, 0.38, 1],
      [1, 0, 1],
      [0, 1, 0.53],
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30 + 5;
      positions[i * 3 + 2] = Math.random() * -170;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col[0];
      colors[i * 3 + 1] = col[1];
      colors[i * 3 + 2] = col[2];

      vels[i * 3] = (Math.random() - 0.5) * 0.004;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return { geometry: geo, velocities: vels };
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;
    const speed = useTrackProgress.getState().speed;
    const speedBoost = Math.min(speed * 3000, 1.0);

    const attr = particlesRef.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += velocities[i];
      arr[i + 1] += velocities[i + 1];
      // Streak in travel direction when scrolling
      arr[i + 2] += velocities[i + 2] - speedBoost * 0.05;
    }
    attr.needsUpdate = true;

    // Brighten when moving fast
    if (matRef.current) {
      matRef.current.opacity = 0.35 + speedBoost * 0.3;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        ref={matRef}
        vertexColors
        size={0.08}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────
export default function TrackEnvironment() {
  return (
    <group>
      <ParticleStream />
      <StationMarkers />
      <AmbientParticles />

      {/* Dreamy lighting — soft purple ambient + warm key light */}
      <ambientLight intensity={0.6} color="#2a1a4e" />
      <directionalLight position={[160, 80, -100]} intensity={1.5} color="#FFF5D0" />
    </group>
  );
}
