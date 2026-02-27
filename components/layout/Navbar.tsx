"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navLinks = [
  { href: "/about", label: "/about" },
  { href: "/projects", label: "/projects" },
  { href: "/blog", label: "/blog" },
  { href: "/contact", label: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled && !isHome
            ? "bg-[rgba(250,250,250,0.95)] border-b border-dashed border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-12">
          {/* Brand — terminal prompt style */}
          <Link
            href="/"
            className={cn(
              "font-[family-name:var(--font-display)] text-sm font-medium tracking-tight",
              isHome ? "text-white" : "text-[var(--color-text-primary)]"
            )}
          >
            ap
            <span
              className={cn(
                isHome ? "text-[#00D4FF]" : "text-[var(--color-text-muted)]"
              )}
              style={{ animation: "terminal-blink 1s step-end infinite" }}
            >
              _
            </span>
          </Link>

          {/* Desktop nav — terminal path style */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.05em] transition-colors",
                    isHome
                      ? isActive
                        ? "text-white"
                        : "text-white/35 hover:text-white/70"
                      : isActive
                        ? "text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  )}
                >
                  {isActive && (
                    <span
                      className={cn(
                        isHome ? "text-[#00D4FF]" : "text-[var(--color-text-secondary)]"
                      )}
                    >
                      {">"}{" "}
                    </span>
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block w-4 h-[1px] transition-all duration-300 origin-center",
                isHome ? "bg-white" : "bg-[var(--color-text-primary)]",
                mobileOpen && "rotate-45 translate-y-[3.5px]"
              )}
            />
            <span
              className={cn(
                "block w-4 h-[1px] transition-all duration-300",
                isHome ? "bg-white" : "bg-[var(--color-text-primary)]",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-4 h-[1px] transition-all duration-300 origin-center",
                isHome ? "bg-white" : "bg-[var(--color-text-primary)]",
                mobileOpen && "-rotate-45 -translate-y-[3.5px]"
              )}
            />
          </button>
        </div>

        {/* Scroll progress — thin line */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-[1px] origin-left",
            isHome ? "bg-[#00D4FF]" : "bg-[var(--color-text-muted)]"
          )}
          style={{
            transform: `scaleX(${scrollProgress})`,
            opacity: scrollProgress > 0 ? 0.4 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-40 md:hidden flex items-center justify-center",
              isHome ? "bg-[#08080A]" : "bg-[var(--color-bg-primary)]"
            )}
          >
            <nav className="flex flex-col items-start gap-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-2xl tracking-[0.02em] transition-colors",
                        isHome
                          ? isActive
                            ? "text-white"
                            : "text-white/40 hover:text-white"
                          : isActive
                            ? "text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm mr-2",
                          isHome ? "text-[#00D4FF]" : "text-[var(--color-text-muted)]"
                        )}
                      >
                        {isActive ? ">" : " "}
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
