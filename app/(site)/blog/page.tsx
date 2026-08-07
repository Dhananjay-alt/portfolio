import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, ComingSoon } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on realtime systems, Web3, Rust, and AI tooling.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell
      eyebrow="Blog"
      title="Notes on building things."
      description="Writing on realtime systems, Web3, Rust, and AI-powered developer tooling."
    >
      {posts.length === 0 ? (
        <ComingSoon phase="Phase 2" />
      ) : (
        <ul className="mt-12 divide-y divide-border/60">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-muted-foreground">{post.description}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
