import type { Metadata } from "next";
import { GitFork, Star } from "lucide-react";
import { PageShell, ComingSoon } from "@/components/site/page-shell";
import { GithubIcon } from "@/components/site/brand-icons";
import { getGitHubData } from "@/lib/github";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Public repositories, stars, and contributions by Dhananjay.",
};

// Revalidate hourly (matches the fetch cache).
export const revalidate = 3600;

export default async function OpenSourcePage() {
  const data = await getGitHubData();

  return (
    <PageShell
      eyebrow="Open Source"
      title="Contributions, in public."
      description="Live from the GitHub API — pinned repos, stars, and the languages I work in most, refreshed hourly."
    >
      {!data ? (
        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <p className="text-muted-foreground">
            {profile.name}&apos;s GitHub isn&apos;t connected yet. Once the handle is
            set, this page will show live repositories, stars, forks, and top languages.
          </p>
          <ComingSoon phase="Phase 2 (awaiting GitHub handle)" />
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Public repos" value={data.publicRepos} />
            <Stat label="Total stars" value={data.totalStars} />
            <Stat label="Followers" value={data.followers} />
            <Stat label="Top language" value={data.topLanguages[0]?.name ?? "—"} />
          </div>

          {/* Languages */}
          {data.topLanguages.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Languages
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.topLanguages.map((l) => (
                  <span
                    key={l.name}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm"
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Repos */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Top repositories
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="size-4 text-muted-foreground" />
                    <span className="font-medium group-hover:text-brand">{repo.name}</span>
                  </div>
                  {repo.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {repo.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5" /> {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="size-3.5" /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <GithubIcon className="size-4" /> View full profile
          </a>
        </div>
      )}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
