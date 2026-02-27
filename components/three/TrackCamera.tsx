"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { trackCurve } from "@/lib/trackConfig";

// Hoisted allocations — avoid GC pressure in useFrame
const _targetPos = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();
const _tangent = new THREE.Vector3();
const _lookMatrix = new THREE.Matrix4();
const _targetQuat = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

export default function TrackCamera() {
  const { camera } = useThree();
  const initialized = useRef(false);
  const smoothSpeed = useRef(0);
  const lastProgress = useRef(0);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;

    const { progress, activeStation } = useTrackProgress.getState();
    const t = Math.max(0, Math.min(progress, 0.999));

    // Frame-based speed for camera dynamics
    const progressDelta = Math.abs(progress - lastProgress.current);
    lastProgress.current = progress;
    const frameSpeed = delta > 0 ? progressDelta / delta : 0;
    smoothSpeed.current += (frameSpeed - smoothSpeed.current) * Math.min(1, delta * 5);

    const point = trackCurve.getPointAt(t);
    _tangent.copy(trackCurve.getTangentAt(t));

    // Speed-based distance: closer when stopped, further when scrolling fast (12-24)
    const baseDist = 12 + smoothSpeed.current * 180;
    const dist = Math.min(baseDist, 24);

    // Dynamic height: rises more when scrolling fast
    const heightBoost = Math.min(smoothSpeed.current * 60, 3);

    // Camera offset: behind and above the character
    _targetPos.set(
      point.x - _tangent.x * dist,
      point.y + 4 + heightBoost,
      point.z - _tangent.z * dist
    );

    // Larger idle drift at stations
    if (activeStation) {
      const e = elapsed.current;
      _targetPos.x += Math.sin(e * 0.3) * 0.8;
      _targetPos.y += Math.cos(e * 0.2) * 0.5;
    }

    // Speed-responsive look-ahead: further ahead when moving fast
    const lookAhead = 0.03 + smoothSpeed.current * 8;
    const lookT = Math.min(t + lookAhead, 1);
    _lookTarget.copy(trackCurve.getPointAt(lookT));
    _lookTarget.y += 0.5;

    // Smooth interpolation (snap on first frame)
    const lerpFactor = initialized.current ? 0.04 : 1;
    camera.position.lerp(_targetPos, lerpFactor);

    // Smooth look-at via quaternion slerp
    _lookMatrix.lookAt(camera.position, _lookTarget, _up);
    _targetQuat.setFromRotationMatrix(_lookMatrix);
    camera.quaternion.slerp(_targetQuat, initialized.current ? 0.06 : 1);

    // FOV: tighter (tunnel vision) when fast, wider at stations (48-58° range)
    const cam = camera as THREE.PerspectiveCamera;
    const speedIntensity = Math.min(smoothSpeed.current * 200, 1.0);
    const targetFov = activeStation
      ? 58
      : THREE.MathUtils.lerp(55, 48, speedIntensity);
    cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, delta * 2);
    cam.updateProjectionMatrix();

    initialized.current = true;
  });

  return null;
}
