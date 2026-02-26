"use client";

import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowBorder({ children, className }: GlowBorderProps) {
  return (
    <div className={cn("relative rounded-xl p-[1px] group", className)}>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="relative bg-[var(--color-bg-tertiary)] rounded-xl">
        {children}
      </div>
    </div>
  );
}
