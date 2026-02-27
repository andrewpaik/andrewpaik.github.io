"use client";

import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contacts = [
  {
    platform: "GitHub",
    handle: "andrewpaik",
    href: "https://github.com/andrewpaik",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "andrew-paik",
    href: "https://www.linkedin.com/in/andrew-paik-9b78882b3/",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function ContactLinks() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {contacts.map((contact, i) => (
            <ScrollReveal
              key={contact.platform}
              delay={i * 0.06}
              duration={0.5}
            >
              <TiltCard maxTilt={4}>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="group cursor-pointer flex items-center gap-4">
                    <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-display)] font-semibold text-sm">
                        {contact.platform}
                      </p>
                      <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                        {contact.handle}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 ml-auto text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </Card>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
