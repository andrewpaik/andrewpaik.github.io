"use client";

import { useTrackProgress } from "@/hooks/useTrackProgress";
import { cn } from "@/lib/utils";

interface TrackStationProps {
  stationId: string;
  children: React.ReactNode;
  position?: "left" | "right" | "center";
  className?: string;
  glass?: boolean;
}

const positionClasses: Record<string, string> = {
  left: "left-8 md:left-16 top-[55%] -translate-y-1/2 max-w-md",
  right: "right-8 md:right-16 top-[55%] -translate-y-1/2 max-w-md",
  center:
    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full text-center px-6",
};

export default function TrackStation({
  stationId,
  children,
  position = "right",
  className,
  glass = true,
}: TrackStationProps) {
  const visibility = useTrackProgress(
    (s) => s.stationVisibility[stationId] ?? 0
  );

  return (
    <div
      className={cn("fixed z-10", positionClasses[position], className)}
      aria-hidden={visibility < 0.01}
      style={{
        opacity: visibility,
        transform: `${
          position === "center"
            ? `translate(-50%, calc(-10% + ${(1 - visibility) * 20}px))`
            : `translateY(calc(-10% + ${(1 - visibility) * 20}px))`
        }`,
        pointerEvents: visibility > 0.5 ? "auto" : "none",
      }}
    >
      {glass ? (
        <div className="relative p-6 md:p-8 border border-dashed border-white/[0.12] bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden">
          <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF00FF08] via-transparent to-[#00D4FF08] pointer-events-none" />
          <div className="relative">{children}</div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
