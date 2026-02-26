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
    <footer className="bg-[var(--color-bg-secondary)]">
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Navigation */}
          <div>
            <p className="label mb-4">Navigation</p>
            <div className="flex flex-col gap-3">
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
            <p className="label mb-4">Connect</p>
            <div className="flex flex-col gap-3">
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

          {/* Tagline */}
          <div>
            <p className="label mb-4">Andrew Paik</p>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Building at the intersection of AI, blockchain, and real-world
              impact. USC Marshall School of Business.
            </p>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Andrew Paik. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
