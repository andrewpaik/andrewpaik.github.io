"use client";

import { useState } from "react";
import BlogHeader from "@/components/sections/BlogHeader";
import BlogList from "@/components/sections/BlogList";
import { blogPosts, blogCategories } from "@/lib/data/blog";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeFilter);

  return (
    <>
      <BlogHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        categories={blogCategories}
      />
      <BlogList posts={filtered} />
    </>
  );
}
