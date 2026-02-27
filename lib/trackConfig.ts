import * as THREE from "three";

// Track path — Rainbow Road with gentle hills and turns
export const TRACK_POINTS = [
  new THREE.Vector3(0, 0, 0), // Start (Station 1: Hero)
  new THREE.Vector3(0, 3, -20), // Rise
  new THREE.Vector3(2, 0, -40), // Dip (Station 2: Projects)
  new THREE.Vector3(0, 5, -60), // Peak
  new THREE.Vector3(-2, 1, -80), // Gentle dip (Station 3: Blog)
  new THREE.Vector3(0, 6, -100), // Highest point
  new THREE.Vector3(1, 2, -120), // Descend (Station 4: About)
  new THREE.Vector3(0, 4, -140), // Rise again
  new THREE.Vector3(0, 0, -160), // End (Station 5: Contact)
];

export const trackCurve = new THREE.CatmullRomCurve3(
  TRACK_POINTS,
  false,
  "catmullrom",
  0.5
);

// Station definitions
export interface Station {
  id: string;
  progress: number; // Normalized position on the track (0-1)
  label: string;
  pauseWidth?: number; // Override per-station pause width
}

// Default pause width for stations
export const STATION_PAUSE_WIDTH = 0.12;

export const STATIONS: Station[] = [
  { id: "hero", progress: 0.0, label: "Start" },
  { id: "projects", progress: 0.25, label: "Projects", pauseWidth: 0.28 },
  { id: "blog", progress: 0.5, label: "Blog" },
  { id: "about", progress: 0.7, label: "About" },
  { id: "contact", progress: 0.95, label: "Contact" },
];

/** Get the pause width for a given station */
export function getStationPauseWidth(station: Station): number {
  return station.pauseWidth ?? STATION_PAUSE_WIDTH;
}

// Fade margins for station content visibility
const FADE_IN = 0.03;
const FADE_OUT = 0.03;

// Animation clip names (from Mixamo GLB — order depends on export)
// Adjust these if the animations don't match the expected behavior
export const ANIMATION_CLIPS = {
  run: "mixamo.com",
  runToStop: "mixamo.com.001",
  idle: "mixamo.com.002",
};

/** Total raw scroll consumed by all station pauses */
function getTotalPauseWidth(): number {
  return STATIONS.reduce((sum, s) => sum + getStationPauseWidth(s), 0);
}

/**
 * Computes the center of each station's pause window in raw scroll space.
 * Used for scroll snapping.
 */
export function getStationSnapPoints(): number[] {
  const totalPauseWidth = getTotalPauseWidth();
  const travelWidth = 1.0 - totalPauseWidth;
  const totalTrackRange = STATIONS[STATIONS.length - 1].progress - STATIONS[0].progress;

  const snapPoints: number[] = [];
  let rawOffset = 0;

  for (let i = 0; i < STATIONS.length; i++) {
    const pw = getStationPauseWidth(STATIONS[i]);
    snapPoints.push(rawOffset + pw / 2);
    rawOffset += pw;

    if (i < STATIONS.length - 1) {
      const trackDistance = STATIONS[i + 1].progress - STATIONS[i].progress;
      const travelFraction = trackDistance / totalTrackRange;
      rawOffset += travelFraction * travelWidth;
    }
  }

  return snapPoints;
}

/**
 * Remaps raw scroll progress (0-1) into:
 * - Character track position (pauses at stations)
 * - Active station
 * - Per-station visibility (0-1 opacity)
 */
export function remapProgress(rawProgress: number): {
  progress: number;
  activeStation: string | null;
  stationVisibility: Record<string, number>;
} {
  const visibility: Record<string, number> = {};
  let activeStation: string | null = null;

  // Calculate station windows in raw scroll space
  const totalPauseWidth = getTotalPauseWidth();
  const travelWidth = 1.0 - totalPauseWidth;

  let characterProgress = 0;
  let rawOffset = 0;

  for (let i = 0; i < STATIONS.length; i++) {
    const station = STATIONS[i];
    const pw = getStationPauseWidth(station);
    const stationStart = rawOffset;
    const stationEnd = stationStart + pw;

    // Calculate visibility for this station
    if (rawProgress >= stationStart - FADE_IN && rawProgress <= stationEnd + FADE_OUT) {
      if (rawProgress < stationStart) {
        visibility[station.id] = (rawProgress - (stationStart - FADE_IN)) / FADE_IN;
      } else if (rawProgress > stationEnd) {
        visibility[station.id] = 1 - (rawProgress - stationEnd) / FADE_OUT;
      } else {
        visibility[station.id] = 1;
      }
      visibility[station.id] = Math.max(0, Math.min(1, visibility[station.id]));
    } else {
      visibility[station.id] = 0;
    }

    // Determine if this is the active station
    if (rawProgress >= stationStart && rawProgress <= stationEnd) {
      activeStation = station.id;
      characterProgress = station.progress;
    }

    rawOffset = stationEnd;

    // Travel segment after this station (except after last)
    if (i < STATIONS.length - 1) {
      const nextStation = STATIONS[i + 1];
      const trackDistance = nextStation.progress - station.progress;
      const travelFraction = trackDistance / (STATIONS[STATIONS.length - 1].progress - STATIONS[0].progress);
      const travelSegmentWidth = travelFraction * travelWidth;
      const travelStart = rawOffset;
      const travelEnd = rawOffset + travelSegmentWidth;

      if (rawProgress > travelStart && rawProgress < travelEnd && activeStation === null) {
        const travelT = (rawProgress - travelStart) / (travelEnd - travelStart);
        characterProgress = station.progress + travelT * trackDistance;
      }

      rawOffset = travelEnd;
    }
  }

  // Clamp
  characterProgress = Math.max(0, Math.min(1, characterProgress));

  return {
    progress: characterProgress,
    activeStation,
    stationVisibility: visibility,
  };
}
