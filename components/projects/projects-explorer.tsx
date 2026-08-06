"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

type SortKey = "priority" | "year";

export function ProjectsExplorer({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("priority");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projects.filter((p) => {
      const inCategory =
        category === "All" ||
        p.category === category ||
        p.secondaryCategory === category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.allTech ?? []).some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });

    list = [...list].sort((a, b) =>
      sort === "year" ? b.year - a.year : a.priority - b.priority,
    );
    return list;
  }, [projects, query, category, sort]);

  const filters = ["All", ...categories];

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech…"
            aria-label="Search projects"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            Sort projects
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <option value="priority">Featured</option>
            <option value="year">Newest</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {filters.map((f) => {
          const active = category === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(f)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-4 font-mono text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </div>

      <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No projects match that filter.
        </p>
      )}
    </div>
  );
}
