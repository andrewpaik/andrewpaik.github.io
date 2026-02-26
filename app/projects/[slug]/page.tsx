import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: project.title,
      description: project.description,
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.indexOf(project);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm mb-8"
        >
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
              d="M7 17l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <h1
          className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {project.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-muted)]">
            {project.role}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-muted)]">
            {project.year}
          </span>
          {project.category.map((cat) => (
            <Tag key={cat} variant="accent">
              {cat}
            </Tag>
          ))}
        </div>

        <div className="section-divider mb-12" />

        {/* Description */}
        <div className="prose-custom space-y-5 text-[var(--color-text-secondary)] leading-[1.8] text-base mb-12">
          {project.longDescription.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mb-12">
          <p className="label mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex gap-4 mb-16">
            {project.liveUrl && (
              <Button href={project.liveUrl} external>
                View Live
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
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="secondary" external>
                View Source
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
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="section-divider mb-8" />
        <div className="flex justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group text-left"
            >
              <span className="label block mb-1">Previous</span>
              <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors font-[family-name:var(--font-display)] font-semibold">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group text-right"
            >
              <span className="label block mb-1">Next</span>
              <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors font-[family-name:var(--font-display)] font-semibold">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
