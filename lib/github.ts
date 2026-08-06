import { githubUsername } from "@/config/github";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
};

export type GitHubData = {
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  repos: Repo[];
};

const API = "https://api.github.com";

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

/** Fetch public profile + top repos. Returns null if unconfigured or on error. */
export async function getGitHubData(): Promise<GitHubData | null> {
  if (!githubUsername) return null;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${githubUsername}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(`${API}/users/${githubUsername}/repos?per_page=100&sort=updated`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const raw = (await reposRes.json()) as GitHubApiRepo[];

    const owned = raw.filter((r) => !r.fork);
    const totalStars = owned.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    const langCounts = new Map<string, number>();
    for (const r of owned) {
      if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
    const topLanguages = [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const repos: Repo[] = owned
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        language: r.language,
        updatedAt: r.updated_at,
      }));

    return {
      username: githubUsername,
      name: user.name ?? null,
      bio: user.bio ?? null,
      avatarUrl: user.avatar_url,
      followers: user.followers ?? 0,
      publicRepos: user.public_repos ?? 0,
      totalStars,
      topLanguages,
      repos,
    };
  } catch {
    return null;
  }
}

type GitHubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};
