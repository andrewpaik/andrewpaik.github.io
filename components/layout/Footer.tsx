import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/andrewpaik", label: "GitHub" },
  { href: "https://linkedin.com/in/andrewpaik", label: "LinkedIn" },
  { href: "https://twitter.com/andrewpaik", label: "Twitter/X" },
  { href: "mailto:andrew@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[-0.02em] mb-3">
              Andrew Paik
            </p>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-xs">
              Making things that think.
              <br />
              Based in Los Angeles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4">
              Pages
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4">
              Elsewhere
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] mt-12 pt-6 flex flex-col md:flex-row justify-between gap-2">
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Andrew Paik
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-text-muted)]">
            Designed & built from scratch
          </p>
        </div>
      </div>
    </footer>
  );
}
