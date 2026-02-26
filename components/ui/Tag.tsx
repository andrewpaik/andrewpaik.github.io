import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export default function Tag({
  children,
  className,
  variant = "default",
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-[family-name:var(--font-mono)] text-[0.7rem] font-medium uppercase tracking-[0.1em] px-3 py-1 rounded-full",
        variant === "default" &&
          "bg-[var(--color-bg-tertiary)] text-[var(--color-accent-primary)] border border-[var(--color-border)]",
        variant === "accent" &&
          "bg-[rgba(0,212,255,0.1)] text-[var(--color-accent-primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
