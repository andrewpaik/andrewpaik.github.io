"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className,
  external,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]";

  const variants = {
    primary: cn(
      baseStyles,
      "bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]",
      "before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] before:transition-transform before:duration-300 hover:before:translate-x-0"
    ),
    secondary: cn(
      baseStyles,
      "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-accent-primary)]"
    ),
    ghost: cn(
      baseStyles,
      "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
    ),
  };

  const styles = cn(variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          <span className="relative z-10">{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
