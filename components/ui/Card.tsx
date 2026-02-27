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
        "relative bg-[var(--color-bg-secondary)] border border-dashed border-[var(--color-border)] p-6",
        hover && "transition-all duration-300 hover:border-solid hover:border-[var(--color-border-hover)]",
        className
      )}
    >
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-border-hover)]" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-border-hover)]" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-border-hover)]" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-border-hover)]" />
      {children}
    </div>
  );
}
