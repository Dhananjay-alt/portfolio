import { highlight } from "@/lib/code";

/** Server-rendered, palette-coloured code block with an optional caption. */
export async function CodeSample({
  source,
  language,
  filename,
  caption,
}: {
  source: string;
  language: string;
  filename?: string;
  caption?: string;
}) {
  const html = await highlight(source, language);
  return (
    <figure className="code-block">
      {filename && <p className="label mb-3">{filename}</p>}
      {/* Scrollable regions must be reachable by keyboard. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={filename ? `Code: ${filename}` : "Code sample"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && <figcaption className="mt-4 text-[0.9375rem] text-mute">{caption}</figcaption>}
    </figure>
  );
}
