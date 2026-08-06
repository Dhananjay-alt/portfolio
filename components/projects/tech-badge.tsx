import { cn } from "@/lib/utils";

export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
