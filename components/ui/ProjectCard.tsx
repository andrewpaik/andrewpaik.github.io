"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import type { Project } from "@/lib/data/projects";

// Generate a unique gradient based on project slug
function getGradient(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash % 60) + 170; // cyan-blue range
  const hue2 = Math.abs((hash * 7) % 60) + 250; // purple range
  return `linear-gradient(135deg, hsla(${hue1}, 80%, 60%, 0.12), hsla(${hue2}, 70%, 55%, 0.08))`;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="h-full group cursor-pointer">
        {/* Thumbnail placeholder */}
        <div
          className="w-full h-44 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
          style={{ background: getGradient(project.slug) }}
        >
          <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--color-text-primary)] opacity-10">
            {project.title}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--color-bg-primary)]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[var(--color-accent-primary)] text-sm font-medium flex items-center gap-2">
              View Project
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
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          {project.category.map((cat) => (
            <Tag key={cat} variant="accent">
              {cat}
            </Tag>
          ))}
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </Card>
    </Link>
  );
}
