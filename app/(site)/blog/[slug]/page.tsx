import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPostSlugs, getPost } from "@/lib/blog";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";
import { ShareButton } from "@/components/site/share-button";
import { ReadingMode } from "@/components/blog/reading-mode";
import { CopyCode } from "@/components/blog/copy-code";
import { PageTransition } from "@/components/motion/page-transition";
import { codeTheme } from "@/lib/code";

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
            { theme: codeTheme, keepBackground: false, defaultLang: "plaintext" },
          ],
        ],
      },
    },
  });

  return (
    <PageTransition>
      <div>
      <ReadingProgress />
      <CopyCode />
      <JsonLd
        data={[
          blogPostingSchema(post.meta),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.meta.title, path: `/blog/${post.meta.slug}` },
          ]),
        ]}
      />
      <div className="container-page pb-[var(--section-y)] pt-[clamp(40px,7vw,96px)]">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="group label inline-flex items-center gap-2 hover:text-ink"
          >
            <span aria-hidden="true" className="arrow arrow-back">
              ←
            </span>
            All writing
          </Link>
          <div className="flex items-center gap-6" data-reading-hide>
            <ReadingMode />
            <ShareButton title={post.meta.title} />
          </div>
        </div>

        <div className="mt-[clamp(40px,7vw,96px)] grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0 max-w-2xl">
            <header>
              <div className="label tabular flex items-center gap-3">
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
              <h1 className="text-h1 mt-5">
                {post.meta.title}
              </h1>
              <p className="text-lead mt-5 text-mute">
                {post.meta.description}
              </p>
              {post.meta.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.meta.tags.map((t) => (
                    <span
                      key={t}
                      className="tag"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <hr className="my-10 border-line" />

            <div className="prose">{content}</div>
          </article>

          <aside className="hidden lg:block" data-reading-hide>
            <div className="sticky top-[calc(var(--header-h)+32px)]">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>
      </div>
      </div>
    </PageTransition>
  );
}
