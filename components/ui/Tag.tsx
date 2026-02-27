import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
  size?: "default" | "sm";
}

export default function Tag({
  children,
  className,
  variant = "default",
  size = "default",
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-block font-[family-name:var(--font-ibm-plex-mono)] font-medium uppercase tracking-[0.1em]",
        size === "default" && "text-[0.7rem] px-2 py-0.5",
        size === "sm" && "text-[0.6rem] px-1.5 py-0.5",
        variant === "default" &&
          "text-[var(--color-text-secondary)] border border-[var(--color-border)]",
        variant === "accent" &&
          "text-[var(--color-text-primary)] border border-[var(--color-text-primary)]",
        variant === "outline" &&
          "border border-white/20 text-white/60",
        className
      )}
    >
      {children}
    </span>
  );
}
