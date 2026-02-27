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
    "inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xs font-medium uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-text-primary)]";

  const variants = {
    primary: cn(
      baseStyles,
      "px-5 py-2.5 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
    ),
    secondary: cn(
      baseStyles,
      "px-5 py-2.5 border border-dashed border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-solid hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
    ),
    ghost: cn(
      baseStyles,
      "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
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
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
