"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as skeletonClone } from "three/addons/utils/SkeletonUtils.js";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { useGPUTier } from "@/hooks/useGPUTier";
import { trackCurve } from "@/lib/trackConfig";
import { particleCharVert, particleCharFrag } from "./shaders";

const _point = new THREE.Vector3();
const _tangent = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();

type RunnerState = "idle" | "running" | "stopping" | "stopped";

function getBoneWeight(name: string): number {
  const n = name.toLowerCase();
  if (n.includes("hips") || n.includes("spine")) return 3;
  if (n.includes("upleg") || n.includes("leg")) return 2.5;
  if (n.includes("arm") || n.includes("forearm")) return 2;
  if (n.includes("head") || n.includes("neck")) return 2;
  if (n.includes("shoulder")) return 1.5;
  if (n.includes("foot") || n.includes("hand")) return 1;
  if (n.includes("toe")) return 0.5;
  return 1;
}

function getBoneRadius(name: string): number {
  const n = name.toLowerCase();
  if (n.includes("hips")) return 0.35;
  if (n.includes("spine")) return 0.3;
  if (n.includes("head")) return 0.25;
  if (n.includes("upleg") || n.includes("arm")) return 0.25;
  if (n.includes("leg") || n.includes("forearm")) return 0.2;
  if (n.includes("foot") || n.includes("hand")) return 0.15;
  return 0.15;
}

export default function ParticleCharacter() {
  const gltf = useGLTF("/models/runner.glb");
  const { tier } = useGPUTier();
  const particleCount = tier === "high" ? 8000 : tier === "medium" ? 6000 : 4000;
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const stateRef = useRef<RunnerState>("idle");
  const stoppedTimer = useRef(0);
  const facingCamera = useRef(true);
  const turnProgress = useRef(0);
  const lastProgress = useRef(0);
  const smoothSpeed = useRef(0);
  const warmupFrames = useRef(0);

  // Clone scene with invisible meshes (skeleton still animates)
  const cleanScene = useMemo(() => {
    let primaryArmature: THREE.Object3D | null = null;
    for (const child of gltf.scene.children) {
      if (child.name === "Armature") {
        primaryArmature = child;
        break;
      }
    }
    if (!primaryArmature) return new THREE.Group();

    const tempScene = new THREE.Group();
    tempScene.add(primaryArmature);
    const cloned = skeletonClone(tempScene);
    gltf.scene.add(primaryArmature);

    cloned.traverse((child) => {
      if (child.name === "mixamorigHips") child.position.z = 0;
    });

    // Hide meshes — skeleton still animates
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).visible = false;
      }
    });

    return cloned;
  }, [gltf.scene]);

  // Collect bones from cloned skeleton
  const bones = useMemo(() => {
    const result: THREE.Bone[] = [];
    cleanScene.traverse((child) => {
      if ((child as THREE.Bone).isBone) result.push(child as THREE.Bone);
    });
    return result;
  }, [cleanScene]);

  // Build particle system: geometry, textures, material, mesh
  const { pointsMesh, boneTexture, boneTexturePrev, shaderMat } =
    useMemo(() => {
      const boneCount = Math.max(bones.length, 1);

      // Bone data textures — width=4 (4 vec4 columns per mat4), height=boneCount
      const makeTex = () => {
        const data = new Float32Array(4 * 4 * boneCount);
        const tex = new THREE.DataTexture(
          data,
          4,
          boneCount,
          THREE.RGBAFormat,
          THREE.FloatType
        );
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.needsUpdate = true;
        return tex;
      };
      const bt = makeTex();
      const btPrev = makeTex();

      // Distribute particles across bones weighted by importance
      const totalWeight =
        bones.reduce((s, b) => s + getBoneWeight(b.name), 0) || 1;

      const positions = new Float32Array(particleCount * 3);
      const boneIndices = new Float32Array(particleCount);
      const localOffsets = new Float32Array(particleCount * 3);
      const seeds = new Float32Array(particleCount);

      let pi = 0;
      for (let bi = 0; bi < bones.length; bi++) {
        const weight = getBoneWeight(bones[bi].name);
        const radius = getBoneRadius(bones[bi].name);
        const count = Math.floor((weight / totalWeight) * particleCount);

        for (let i = 0; i < count && pi < particleCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = Math.cbrt(Math.random()) * radius;
          const idx = pi * 3;

          positions[idx] = positions[idx + 1] = positions[idx + 2] = 0;
          localOffsets[idx] = r * Math.sin(phi) * Math.cos(theta);
          localOffsets[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
          localOffsets[idx + 2] = r * Math.cos(phi);
          boneIndices[pi] = bi;
          seeds[pi] = Math.random();
          pi++;
        }
      }

      // Fill remaining particles on random bones
      while (pi < particleCount) {
        const bi = Math.floor(Math.random() * Math.max(bones.length, 1));
        const radius = getBoneRadius(bones[bi]?.name ?? "");
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * radius;
        const idx = pi * 3;

        positions[idx] = positions[idx + 1] = positions[idx + 2] = 0;
        localOffsets[idx] = r * Math.sin(phi) * Math.cos(theta);
        localOffsets[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
        localOffsets[idx + 2] = r * Math.cos(phi);
        boneIndices[pi] = bi;
        seeds[pi] = Math.random();
        pi++;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geo.setAttribute(
        "boneIndex",
        new THREE.BufferAttribute(boneIndices, 1)
      );
      geo.setAttribute(
        "localOffset",
        new THREE.BufferAttribute(localOffsets, 3)
      );
      geo.setAttribute(
        "particleSeed",
        new THREE.BufferAttribute(seeds, 1)
      );

      const mat = new THREE.ShaderMaterial({
        vertexShader: particleCharVert,
        fragmentShader: particleCharFrag,
        uniforms: {
          uBoneTexture: { value: bt },
          uBoneTexturePrev: { value: btPrev },
          uBoneCount: { value: boneCount },
          uTime: { value: 0 },
          uSpeed: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const pts = new THREE.Points(geo, mat);
      pts.frustumCulled = false;
      pts.visible = false; // Hidden until warmup frames complete

      return {
        pointsMesh: pts,
        boneTexture: bt,
        boneTexturePrev: btPrev,
        shaderMat: mat,
      };
    }, [bones, particleCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      pointsMesh.geometry.dispose();
      shaderMat.dispose();
      boneTexture.dispose();
      boneTexturePrev.dispose();
    };
  }, [pointsMesh, shaderMat, boneTexture, boneTexturePrev]);

  // Retarget animation clips (same logic as TrackRunner)
  const clipMap = useMemo(() => {
    const boneNames = new Set<string>();
    cleanScene.traverse((child) => boneNames.add(child.name));

    const clips = gltf.animations.map((clip) => {
      const newClip = clip.clone();
      for (const track of newClip.tracks) {
        const dotIdx = track.name.indexOf(".");
        if (dotIdx === -1) continue;
        const boneName = track.name.substring(0, dotIdx);
        const property = track.name.substring(dotIdx);
        if (boneNames.has(boneName)) continue;
        const stripped = boneName.replace(/_\d+$/, "");
        if (boneNames.has(stripped)) track.name = stripped + property;
      }
      return newClip;
    });

    if (clips.length < 3) {
      return {
        run: clips[0] || null,
        runToStop: clips[1] || null,
        idle: clips[2] || null,
      };
    }

    const sorted = [...clips].sort((a, b) => a.duration - b.duration);
    return { run: sorted[0], runToStop: sorted[1], idle: sorted[2] };
  }, [gltf.animations, cleanScene]);

  // Set up mixer and actions
  useEffect(() => {
    const mixer = new THREE.AnimationMixer(cleanScene);
    mixerRef.current = mixer;

    const actions: Record<string, THREE.AnimationAction> = {};

    if (clipMap.run) {
      actions.run = mixer.clipAction(clipMap.run);
      actions.run.setLoop(THREE.LoopRepeat, Infinity);
    }
    if (clipMap.idle) {
      actions.idle = mixer.clipAction(clipMap.idle);
      actions.idle.setLoop(THREE.LoopRepeat, Infinity);
    }
    if (clipMap.runToStop) {
      actions.runToStop = mixer.clipAction(clipMap.runToStop);
      actions.runToStop.setLoop(THREE.LoopOnce, 1);
      actions.runToStop.clampWhenFinished = true;
    }

    actionsRef.current = actions;
    if (actions.idle) actions.idle.reset().play();
    stateRef.current = "idle";

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === actions.runToStop) {
        crossFade("idle", 0.4);
        stateRef.current = "stopped";
      }
    };
    mixer.addEventListener("finished", onFinished);

    return () => {
      mixer.removeEventListener("finished", onFinished);
      mixer.stopAllAction();
      mixer.uncacheRoot(cleanScene);
    };
  }, [cleanScene, clipMap]);

  const crossFade = useCallback((toName: string, duration: number) => {
    const actions = actionsRef.current;
    const toAction = actions[toName];
    if (!toAction) return;
    Object.values(actions).forEach((a) => {
      if (a !== toAction && a.isRunning()) a.fadeOut(duration);
    });
    toAction.reset().fadeIn(duration).play();
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !mixerRef.current) return;

    const { progress } = useTrackProgress.getState();
    const t = Math.max(0, Math.min(progress, 0.999));
    const state = stateRef.current;

    // Speed computation
    const progressDelta = Math.abs(progress - lastProgress.current);
    lastProgress.current = progress;
    const frameSpeed = delta > 0 ? progressDelta / delta : 0;
    smoothSpeed.current +=
      (frameSpeed - smoothSpeed.current) * Math.min(1, delta * 8);
    const isScrolling = smoothSpeed.current > 0.0005;

    // Position on track
    _point.copy(trackCurve.getPointAt(t));
    groupRef.current.position.copy(_point);

    // Orientation
    _tangent.copy(trackCurve.getTangentAt(t));
    if (facingCamera.current && !isScrolling && state === "idle") {
      _lookTarget.copy(_point).sub(_tangent);
      _lookTarget.y = _point.y;
      groupRef.current.lookAt(_lookTarget);
    } else {
      if (facingCamera.current) {
        facingCamera.current = false;
        turnProgress.current = 0;
      }
      turnProgress.current = Math.min(1, turnProgress.current + delta * 3);
      const ease = 1 - Math.pow(1 - turnProgress.current, 3);
      const forward = _point.clone().add(_tangent);
      forward.y = _point.y;
      const backward = _point.clone().sub(_tangent);
      backward.y = _point.y;
      _lookTarget.lerpVectors(backward, forward, ease);
      groupRef.current.lookAt(_lookTarget);
    }

    // State machine
    if (isScrolling) {
      stoppedTimer.current = 0;
      if (state !== "running") {
        crossFade("run", 0.3);
        stateRef.current = "running";
      }
      if (actionsRef.current.run) {
        actionsRef.current.run.timeScale = Math.max(
          0.5,
          Math.min(smoothSpeed.current * 40, 2.0)
        );
      }
    } else {
      stoppedTimer.current += delta;
      if (state === "running" && stoppedTimer.current > 0.3) {
        if (actionsRef.current.runToStop) {
          crossFade("runToStop", 0.25);
          stateRef.current = "stopping";
        } else {
          crossFade("idle", 0.4);
          stateRef.current = "stopped";
        }
      }
    }

    mixerRef.current.update(delta);

    // Force world matrix update so bone.matrixWorld is current this frame
    groupRef.current.updateMatrixWorld(true);

    // Update bone data textures
    if (bones.length > 0) {
      const currData = boneTexture.image.data as Float32Array;
      const prevData = boneTexturePrev.image.data as Float32Array;

      // Copy current → prev (trail buffer)
      prevData.set(currData);
      boneTexturePrev.needsUpdate = true;

      // Write current bone matrices (column-major, matches mat4 constructor)
      for (let i = 0; i < bones.length; i++) {
        const el = bones[i].matrixWorld.elements;
        const offset = i * 16;
        for (let j = 0; j < 16; j++) {
          currData[offset + j] = el[j];
        }
      }
      boneTexture.needsUpdate = true;
    }

    // Update shader uniforms
    shaderMat.uniforms.uTime.value += delta;
    shaderMat.uniforms.uSpeed.value = smoothSpeed.current;

    // Show particles after warmup (bone data needs a few frames to stabilize)
    warmupFrames.current++;
    if (warmupFrames.current === 3 && !pointsMesh.visible) {
      pointsMesh.visible = true;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <primitive object={cleanScene} />
      </group>
      <primitive object={pointsMesh} />
    </>
  );
}

useGLTF.preload("/models/runner.glb");
