"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/lib/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

// Unique gradient per project based on index
const gradients = [
  "from-[rgba(0,212,255,0.15)] to-[rgba(123,97,255,0.08)]",
  "from-[rgba(123,97,255,0.15)] to-[rgba(0,212,255,0.08)]",
  "from-[rgba(0,212,255,0.1)] to-[rgba(123,97,255,0.15)]",
];

export default function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="label text-center mb-4">Featured Work</p>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] text-center mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Projects I&apos;ve Built
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="h-full group cursor-pointer">
                  {/* Thumbnail placeholder */}
                  <div
                    className={`w-full h-40 rounded-lg mb-4 bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}
                  >
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-accent-primary)] opacity-30">
                      {project.title[0]}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/projects" variant="secondary">
            View All Projects
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
