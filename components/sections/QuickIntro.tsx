"use client";

import { motion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";

const identityTags = [
  "AI / ML",
  "Blockchain",
  "Data Science",
  "Full-Stack",
  "Finance",
];

export default function QuickIntro() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="text-center text-[var(--color-text-secondary)] text-lg md:text-xl mb-8">
            Andrew Paik &mdash; USC Marshall School of Business
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center gap-3">
          {identityTags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Tag variant="accent">{tag}</Tag>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
