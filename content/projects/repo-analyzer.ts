import type { Project } from "@/types/project";

export const repoAnalyzer: Project = {
  slug: "repo-analyzer",
  title: "Repo Analyzer",
  tagline: "Repository dependency visualizer with AI summaries.",
  category: "Developer Tools",
  secondaryCategory: "AI",
  year: 2026,
  status: "Live",
  role: "Solo full-stack engineer",
  timeline: "GDSC IIT Roorkee · June–July 2026",
  priority: 4,
  featured: true,
  context:
    "A solo project (Repo.Viz) for GDSC IIT Roorkee's Open Summer of Code. Point it at a local Python repo and it maps the real dependency graph, flags architectural smells, and explains modules in plain language.",
  links: {
    liveDemo: "", // TODO
    github: "", // TODO
    caseStudy: "https://youtu.be/DRNv6aYk8lQ",
  },
  techStack: {
    frontend: ["React", "React Flow", "dagre", "react-router"],
    backend: ["Python", "FastAPI", "ast", "networkx", "radon"],
    ai: ["Groq (Llama 3.3 70B)"],
    infra: ["SQLite (content-hash cache)"],
  },
  problem:
    "Jumping into a large, unfamiliar codebase is hard: a file explorer shows you folders, but not how the files actually depend on each other. You can't see the hubs, the tangled cycles, or which modules are quietly doing too much — and nothing explains what any given file is *for*.",
  approach:
    "Repo Analyzer parses Python source with the standard-library `ast` module and resolves each import to the actual file in the repo — handling packages, relative imports, and submodules while excluding standard-library and third-party imports, all without executing any code. It renders the result as an interactive React Flow canvas with automatic dagre layout, detects circular clusters with networkx, computes per-file complexity with radon, and uses an LLM to explain each file's role — grounding the prompt in the file's actual import relationships so the summary describes its role in the system.",
  architecture: [
    { layer: "Parse", detail: "Python `ast` resolves real inter-file imports (no code executed)" },
    { layer: "Analyze", detail: "networkx finds strongly-connected components; radon computes complexity" },
    { layer: "Explain", detail: "Groq (Llama 3.3 70B) summarizes each file's role from its dependencies" },
    { layer: "Cache", detail: "SQLite caches summaries keyed on a SHA-256 hash of file contents" },
    { layer: "Visualize", detail: "React Flow + dagre render a draggable, focusable dependency graph" },
  ],
  features: [
    {
      title: "Real dependency mapping",
      description:
        "Resolves each import to the actual file — packages, relative imports, submodules — excluding stdlib and third-party. No code is executed.",
    },
    {
      title: "Interactive graph canvas",
      description:
        "React Flow gives draggable nodes, zoom/pan, a minimap, and dagre auto-layout. Click a file to focus on just its direct dependencies.",
    },
    {
      title: "Circular-dependency detection",
      description:
        "networkx surfaces strongly-connected clusters of mutually-dependent files and highlights them — a structural problem a file explorer can't show.",
    },
    {
      title: "Per-file complexity metrics",
      description:
        "radon reports lines of code and cyclomatic complexity on every node, so bloated or complex files are obvious at a glance.",
    },
    {
      title: "AI file & architecture summaries",
      description:
        "A 3-sentence, role-aware explanation per file, plus a one-click repo-level architecture review of hubs, coupling, and cycles.",
    },
    {
      title: "Content-hash caching",
      description:
        "Summaries are cached in SQLite keyed on a SHA-256 of file contents, so a file is only re-analyzed when it actually changes.",
    },
  ],
  challenges: [
    {
      title: "Resolving imports without running code",
      description:
        "Statically mapping `import` statements to real files — across packages, relative imports, and submodules — is fiddly, but running the code was off the table for safety and speed. `ast` made it a pure static analysis.",
    },
    {
      title: "Making large graphs readable",
      description:
        "A dependency graph of a real repo is a hairball by default. Dagre's hierarchical layout plus a click-to-focus mode (fading everything but a file's direct dependencies) kept it legible at scale.",
    },
    {
      title: "Grounding AI summaries in real structure",
      description:
        "Generic 'summarize this file' prompts produce vague output. Feeding the file's actual import relationships into the prompt made summaries explain the file's *role in the system*, not just its code.",
    },
  ],
  decisions: [
    {
      title: "Groq (Llama 3.3 70B) over Gemini",
      choice: "Switched the AI backend from Gemini to Groq running Llama 3.3 70B.",
      rationale:
        "Gemini was the first choice but ran into API-access issues that blocked reliable development. Groq's Llama 3.3 70B was fast and dependable, and the AI layer was kept provider-agnostic so the backend can be swapped again if needed.",
    },
    {
      title: "SQLite content-hash cache over time-based caching",
      choice: "Keyed the summary cache on a SHA-256 of file contents.",
      rationale:
        "Content hashing means a summary is reused exactly as long as the file is unchanged and regenerated the moment it changes — you never pay for the same summary twice, and you're never served a stale one.",
    },
    {
      title: "Static ast analysis over runtime tracing",
      choice: "Resolved dependencies statically with `ast`.",
      rationale:
        "Executing an unfamiliar repo to trace imports is both a security risk and slow. Static analysis is safe, fast, and fully local — nothing about the user's code leaves their machine.",
    },
  ],
  lessons: [
    "Grounding an LLM in real structured context (import edges) is the difference between a vague summary and a useful one.",
    "Static analysis beats runtime instrumentation when safety and speed matter — and for a dev tool they always do.",
    "A content-hash cache is a tiny amount of code that removes both cost and staleness in one move.",
    "Being provider-agnostic about the LLM turned an API-access dead end (Gemini) into a one-file swap (Groq).",
  ],
  metrics: [
    { label: "Code executed", value: "None (static ast)" },
    { label: "AI model", value: "Llama 3.3 70B via Groq" },
    { label: "Cache key", value: "SHA-256 of contents" },
    { label: "Privacy", value: "Fully local" },
  ],
  media: {
    hero: "", // TODO
    screenshots: [], // TODO
    video: "https://youtu.be/DRNv6aYk8lQ",
  },
  accent: "oklch(0.78 0.15 155)",
};
