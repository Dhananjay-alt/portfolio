import type { Heading } from "@/lib/blog";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="text-[length:var(--text-small)]">
      <p className="label mb-4">On this page</p>
      <ul className="border-l border-line">
        {headings.map((h) => (
          <li key={h.slug} className={h.depth === 3 ? "pl-3" : undefined}>
            <a href={`#${h.slug}`} className="-ml-px block min-h-11 border-l py-3 leading-5 border-transparent pl-4 text-mute hover:border-ink hover:text-ink">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
