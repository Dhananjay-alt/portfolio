/**
 * A script that runs synchronously while the HTML is parsed, before first
 * paint. The type flips to `text/plain` on the client so React neither
 * re-executes it nor warns about script tags during render (the pattern from
 * Next's "preventing flash before hydration" guide).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
