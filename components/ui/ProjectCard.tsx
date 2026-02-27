"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import type { Project } from "@/lib/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="h-full group cursor-pointer">
        {/* Thumbnail */}
        <div className="w-full h-44 rounded-lg mb-4 relative overflow-hidden bg-[var(--color-bg-tertiary)]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--color-text-primary)] opacity-10">
                {project.title}
              </span>
            </div>
          )}

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
