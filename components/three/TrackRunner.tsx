"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone as skeletonClone } from "three/addons/utils/SkeletonUtils.js";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { trackCurve } from "@/lib/trackConfig";

const _point = new THREE.Vector3();
const _tangent = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();

type RunnerState = "idle" | "running" | "stopping" | "stopped";

export default function TrackRunner() {
  const gltf = useGLTF("/models/runner.glb");
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const stateRef = useRef<RunnerState>("idle");
  const stoppedTimer = useRef(0);
  const facingCamera = useRef(true);
  const turnProgress = useRef(0);
  const lastProgress = useRef(0);
  const smoothSpeed = useRef(0);

  // Build a clean scene with only the first armature, properly cloned
  const cleanScene = useMemo(() => {
    // Find the first armature in the original scene
    let primaryArmature: THREE.Object3D | null = null;
    for (const child of gltf.scene.children) {
      if (child.name === "Armature") {
        primaryArmature = child;
        break;
      }
    }

    if (!primaryArmature) {
      console.error("Could not find Armature in GLB");
      return new THREE.Group();
    }

    // Create a temporary scene with just the primary armature for cloning
    const tempScene = new THREE.Group();
    tempScene.add(primaryArmature);

    // SkeletonUtils.clone properly rebinds SkinnedMesh skeletons
    const cloned = skeletonClone(tempScene);

    // Put the armature back in the original scene (useGLTF caches it)
    gltf.scene.add(primaryArmature);

    // Fix Hips z-offset (GLTFLoader sanitizes "mixamorig:Hips" → "mixamorigHips")
    cloned.traverse((child) => {
      if (child.name === "mixamorigHips") {
        child.position.z = 0;
      }
    });

    // Apply wireframe material
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: "#00D4FF",
          wireframe: true,
          transparent: true,
          opacity: 0.7,
        });
        mesh.frustumCulled = false;
      }
    });

    return cloned;
  }, [gltf.scene]);

  // Retarget animation clips and identify by duration
  const clipMap = useMemo(() => {
    // Collect all bone names from the cloned scene
    const boneNames = new Set<string>();
    cleanScene.traverse((child) => {
      boneNames.add(child.name);
    });

    // Retarget all clips: rewrite track names to match cloned armature bones.
    // GLTFLoader sanitizes names (strips ":") and deduplicates with "_1", "_2".
    // Primary armature bones: "mixamorigHips", "mixamorigSpine", etc.
    // Clip 0 tracks: "mixamorigHips.position" (matches primary bones)
    // Clip 1 tracks: "mixamorigHips_1.position" (targets 2nd armature)
    // Clip 2 tracks: "mixamorigHips_2.position" (targets 3rd armature)
    // We strip the "_N" suffix so clips 1 & 2 target the primary armature.
    let retargetCount = 0;
    const clips = gltf.animations.map((clip) => {
      const newClip = clip.clone();
      for (const track of newClip.tracks) {
        const dotIdx = track.name.indexOf(".");
        if (dotIdx === -1) continue;

        const boneName = track.name.substring(0, dotIdx);
        const property = track.name.substring(dotIdx);

        // If bone already exists in scene, no retargeting needed
        if (boneNames.has(boneName)) continue;

        // Strip armature duplication suffix (_1, _2)
        const stripped = boneName.replace(/_\d+$/, "");

        if (boneNames.has(stripped)) {
          track.name = stripped + property;
          retargetCount++;
        }
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
    // shortest = run loop (~0.8s), medium = runToStop transition (~1.5s), longest = idle breathing
    return {
      run: sorted[0],
      runToStop: sorted[1],
      idle: sorted[2],
    };
  }, [gltf.animations, cleanScene]);

  // Set up mixer and actions on the clean cloned scene
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

    // Start idle
    if (actions.idle) {
      actions.idle.reset().play();
    }
    stateRef.current = "idle";

    // RunToStop → Idle transition
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

    Object.values(actions).forEach((action) => {
      if (action !== toAction && action.isRunning()) {
        action.fadeOut(duration);
      }
    });

    toAction.reset().fadeIn(duration).play();
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !mixerRef.current) return;

    const { progress } = useTrackProgress.getState();
    const t = Math.max(0, Math.min(progress, 0.999));
    const state = stateRef.current;

    // Compute speed from frame-to-frame progress delta (more reliable than store speed)
    const progressDelta = Math.abs(progress - lastProgress.current);
    lastProgress.current = progress;
    const frameSpeed = delta > 0 ? progressDelta / delta : 0;
    // Smooth the speed to avoid flickering between states
    smoothSpeed.current += (frameSpeed - smoothSpeed.current) * Math.min(1, delta * 8);
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
        actionsRef.current.run.timeScale = Math.max(0.5, Math.min(smoothSpeed.current * 40, 2.0));
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
  });

  return (
    <group ref={groupRef}>
      <primitive object={cleanScene} />
    </group>
  );
}

useGLTF.preload("/models/runner.glb");
