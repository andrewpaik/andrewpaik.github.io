"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const contacts = [
  {
    platform: "Email",
    handle: "andrew@example.com",
    href: "mailto:andrew@example.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    handle: "andrewpaik",
    href: "https://linkedin.com/in/andrewpaik",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    handle: "andrewpaik",
    href: "https://github.com/andrewpaik",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    platform: "Twitter / X",
    handle: "@andrewpaik",
    href: "https://twitter.com/andrewpaik",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.768L20 4" />
      </svg>
    ),
  },
];

export default function ContactLinks() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.platform}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Card className="group cursor-pointer flex items-center gap-4">
                <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] transition-colors">
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
                  className="w-4 h-4 ml-auto text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] transition-all"
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
