import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, ComingSoon } from "@/components/site/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on realtime systems, Web3, Rust, and AI tooling.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell
      eyebrow="Writing"
      title="Notes on building things."
      description="Writing on realtime systems, Web3, Rust, and AI-powered developer tooling."
    >
      {posts.length === 0 ? (
        <ComingSoon phase="Phase 2" />
      ) : (
        <ul className="mt-[clamp(40px,6vw,80px)] border-b border-line">
          {posts.map((post, idx) => (
            <Reveal as="li" key={post.slug} index={idx} className="border-t border-line">
              <Link href={`/blog/${post.slug}`} className="work-row group grid-12 items-baseline gap-y-3 py-8">
                <p className="label tabular md:col-span-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true"> · </span>
                  {post.readingTime}
                </p>
                <div className="md:col-span-8">
                  <h2 className="work-title text-h3">{post.title}</h2>
                  <p className="mt-2 max-w-[60ch] text-mute">{post.description}</p>
                </div>
                <span aria-hidden="true" className="work-arrow hidden text-[1.25rem] leading-none md:col-span-1 md:block md:text-right">
                  ↗
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}

      <p className="mt-8">
        <a href="/feed.xml" className="label link hover:text-ink">
          RSS feed
        </a>
      </p>
    </PageShell>
  );
}
