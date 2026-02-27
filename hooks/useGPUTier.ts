"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "./useMediaQuery";

export type GPUTier = "high" | "medium" | "low";

interface GPUTierResult {
  tier: GPUTier;
  isMobile: boolean;
}

const LOW_END_PATTERNS = [
  /intel.*hd/i,
  /intel.*uhd/i,
  /intel.*iris/i,
  /mali/i,
  /adreno\s*[1-5]\d{2}/i,
  /powervr/i,
  /swiftshader/i,
  /llvmpipe/i,
];

const HIGH_END_PATTERNS = [
  /nvidia.*rtx/i,
  /nvidia.*gtx\s*1[6-9]/i,
  /nvidia.*gtx\s*[2-9]/i,
  /radeon.*rx\s*[5-7]/i,
  /apple.*m[1-9]/i,
  /apple.*gpu/i,
];

function detectTier(renderer: string, isMobile: boolean): GPUTier {
  if (isMobile) return "low";

  for (const pattern of HIGH_END_PATTERNS) {
    if (pattern.test(renderer)) return "high";
  }

  for (const pattern of LOW_END_PATTERNS) {
    if (pattern.test(renderer)) return "low";
  }

  return "medium";
}

export function useGPUTier(): GPUTierResult {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tier, setTier] = useState<GPUTier>("medium");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL
          ) as string;
          setTier(detectTier(renderer, isMobile));
        } else {
          setTier(isMobile ? "low" : "medium");
        }
        const loseContext = gl.getExtension("WEBGL_lose_context");
        loseContext?.loseContext();
      } else {
        setTier("low");
      }
    } catch {
      setTier(isMobile ? "low" : "medium");
    }
  }, [isMobile]);

  return { tier, isMobile };
}
