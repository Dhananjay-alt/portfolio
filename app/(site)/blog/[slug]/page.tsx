import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPostSlugs, getPost } from "@/lib/blog";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: { title: post.meta.title, description: post.meta.description, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            { theme: "github-dark", keepBackground: true, defaultLang: "plaintext" },
          ],
        ],
      },
    },
  });

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-36 md:pt-44">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All posts
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_220px]">
          <article className="min-w-0 max-w-2xl">
            <header>
              <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <time dateTime={post.meta.date}>
                  {new Date(post.meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.meta.readingTime}</span>
              </div>
              <h1 className="mt-4 text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
                {post.meta.title}
              </h1>
              <p className="mt-4 text-[length:var(--text-lead)] text-muted-foreground">
                {post.meta.description}
              </p>
              {post.meta.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.meta.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <hr className="my-10 border-border/60" />

            <div className="prose">{content}</div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
