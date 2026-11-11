import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/site/page-shell";
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
        <div className="rule mt-12 pt-8">
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
              <p className="label">
                Languages
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.topLanguages.map((l) => (
                  <span
                    key={l.name}
                    className="tag"
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Repos */}
          <div>
            <p className="label">
              Top repositories
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group rounded-md border border-line p-5"
                >
                  <span className="link link-group font-medium">{repo.name}</span>
                  {repo.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {repo.description}
                    </p>
                  )}
                  <div className="label tabular mt-4 flex items-center gap-4">
                    {repo.language && <span>{repo.language}</span>}
                    <span>{repo.stars} stars</span>
                    <span>{repo.forks} forks</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noreferrer noopener"
            className="link"
          >
            View full profile{" "}
            <span aria-hidden="true" className="arrow arrow-up">
              ↗
            </span>
          </a>
        </div>
      )}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rule pt-4">
      <p className="tabular font-display text-[2rem] leading-none">{value}</p>
      <p className="label mt-2">{label}</p>
    </div>
  );
}
