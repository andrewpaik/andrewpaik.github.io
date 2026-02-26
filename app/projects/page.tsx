"use client";

import { useState } from "react";
import ProjectHeader from "@/components/sections/ProjectHeader";
import ProjectGrid from "@/components/sections/ProjectGrid";
import { projects, categories } from "@/lib/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <>
      <ProjectHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        categories={categories}
      />
      <ProjectGrid projects={filtered} />
    </>
  );
}
