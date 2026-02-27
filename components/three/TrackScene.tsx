"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, useProgress, Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";
import * as THREE from "three";
import TrackEnvironment from "./TrackEnvironment";
import SpaceEnvironment from "./SpaceEnvironment";
import TrackCamera from "./TrackCamera";
import TrackRunner from "./TrackRunner";
import ParticleCharacter from "./ParticleCharacter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGPUTier } from "@/hooks/useGPUTier";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="track-loader">
        <div className="track-loader-bar">
          <div
            className="track-loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="track-loader-text">{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

const CA_OFFSETS: Record<string, THREE.Vector2> = {
  high: new THREE.Vector2(0.0006, 0.0006),
  medium: new THREE.Vector2(0.0003, 0.0003),
  low: new THREE.Vector2(0, 0),
};

export default function TrackScene() {
  const reduced = useReducedMotion();
  const { tier } = useGPUTier();

  if (reduced) return null;

  const useParticles = tier !== "low";
  const caOffset = CA_OFFSETS[tier] ?? CA_OFFSETS.medium;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      role="img"
      aria-label="3D animation of a runner on a rainbow road in space"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, tier === "high" ? 1.5 : 1]}
        camera={{ fov: 50, near: 0.1, far: 500 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#06031A");
          gl.toneMapping = 1; // ACESFilmicToneMapping
          gl.toneMappingExposure = 1.0;
        }}
      >
        <Suspense fallback={<Loader />}>
          <TrackCamera />
          <SpaceEnvironment />
          <TrackEnvironment />
          {useParticles ? <ParticleCharacter /> : <TrackRunner />}
          <Preload all />

          <EffectComposer multisampling={tier === "high" ? 2 : 0}>
            <Bloom
              intensity={tier === "high" ? 0.04 : 0.02}
              luminanceThreshold={0.85}
              luminanceSmoothing={0.9}
              kernelSize={
                tier === "high" ? KernelSize.LARGE : KernelSize.MEDIUM
              }
            />
            <ChromaticAberration
              offset={caOffset}
              blendFunction={BlendFunction.NORMAL}
              radialModulation
              modulationOffset={0.3}
            />
            <Vignette offset={0.3} darkness={tier === "low" ? 0 : 0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
