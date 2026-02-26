"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl p-6",
        hover &&
          "transition-all duration-300 hover:scale-[1.02] hover:border-[var(--color-border-hover)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
