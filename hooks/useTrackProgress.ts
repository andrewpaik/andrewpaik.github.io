"use client";

import { create } from "zustand";
import { remapProgress } from "@/lib/trackConfig";

interface TrackState {
  rawProgress: number;
  progress: number;
  speed: number;
  activeStation: string | null;
  stationVisibility: Record<string, number>;
  setRawProgress: (p: number) => void;
  setSpeed: (s: number) => void;
}

export const useTrackProgress = create<TrackState>((set) => ({
  rawProgress: 0,
  progress: 0,
  speed: 0,
  activeStation: "hero",
  stationVisibility: {
    hero: 1,
    projects: 0,
    blog: 0,
    about: 0,
    contact: 0,
  },

  setRawProgress: (p: number) => {
    const { progress, activeStation, stationVisibility } = remapProgress(p);
    set({ rawProgress: p, progress, activeStation, stationVisibility });
  },

  setSpeed: (s: number) => set({ speed: s }),
}));
