import type { Project } from "@/types/project";

export const syncspace: Project = {
  slug: "syncspace",
  title: "SyncSpace",
  tagline: "Real-time collaborative study & coding workspace.",
  category: "Realtime",
  secondaryCategory: "Full-Stack",
  year: 2026,
  status: "Demo",
  role: "Full-stack engineer",
  timeline: "MDG Space, IIT Roorkee · May–June 2026",
  priority: 1,
  featured: true,
  context:
    "Built with MDG Space at IIT Roorkee — a multiplayer workspace where people study and code together in real time, with in-browser execution of untrusted code.",
  links: {
    liveDemo: "", // TODO: add live demo URL
    github: "", // TODO: add GitHub URL
  },
  techStack: {
    frontend: ["Next.js", "React", "Monaco Editor"],
    backend: ["Hocuspocus (WebSocket)", "Postgres"],
    infra: ["Yjs / CRDTs", "Docker sandbox", "Vercel + Railway"],
  },
  problem:
    "Studying and building together remotely usually means juggling a call, a shared doc that lags or conflicts, and a separate place to run code. Real-time editing tools either lock documents, force turn-taking, or drop edits under concurrency — and none of them let you safely execute untrusted code in the same space.",
  approach:
    "SyncSpace is a single multiplayer surface: shared documents, live presence and cursors, and an in-browser IDE that executes code inside isolated Docker containers. Collaboration state is conflict-free by construction using Yjs CRDTs synced over a custom Hocuspocus WebSocket server, with Postgres snapshot persistence so a room survives restarts. Multi-tenant isolation is enforced with Postgres row-level security, and each code run is dispatched to a per-run sandbox so untrusted user code can never touch the host.",
  architecture: [
    { layer: "Client", detail: "Next.js + React app with Monaco editor and live-cursor overlays" },
    { layer: "Sync", detail: "Yjs CRDTs over a custom Hocuspocus WebSocket server merge concurrent edits" },
    { layer: "Persistence", detail: "Postgres snapshots + row-level security for multi-tenant isolation" },
    { layer: "Execution", detail: "Per-run Docker sandbox: network isolation, read-only FS, memory/PID limits, wall-clock timeout" },
  ],
  features: [
    {
      title: "Conflict-free realtime editing",
      description:
        "Yjs CRDTs let everyone edit the same document at once — no lock-step, no turn-taking, no merge conflicts.",
    },
    {
      title: "Live cursors & presence",
      description:
        "See who's in the room and exactly where their cursor is, synced in real time over the Hocuspocus WebSocket layer.",
    },
    {
      title: "Sandboxed code execution",
      description:
        "Untrusted Python runs in a per-run Docker sandbox — network-isolated, read-only filesystem, memory/PID limits, and a wall-clock timeout — so nothing escapes to the host.",
    },
    {
      title: "Real IDE in the browser",
      description:
        "Monaco editor integration brings syntax highlighting, multi-cursor, and a genuine editor feel to the web.",
    },
  ],
  challenges: [
    {
      title: "Keeping concurrent edits consistent",
      description:
        "Naive shared-state broadcasting drops or clobbers edits under concurrency. Modeling documents as CRDTs made consistency a property of the data structure rather than something to enforce with locks.",
    },
    {
      title: "Executing untrusted code safely",
      description:
        "Running arbitrary user code is a security minefield. Isolating each run in a Docker container with constrained resources contained the blast radius without sacrificing the interactive feel.",
    },
    {
      title: "Surviving restarts without losing work",
      description:
        "CRDT state lives in memory on the WebSocket server. Persisting periodic Postgres snapshots meant a room could restart or a client could rejoin without losing the document.",
    },
  ],
  decisions: [
    {
      title: "Yjs CRDTs over Operational Transform",
      choice: "Adopted Yjs CRDTs for the shared document layer.",
      rationale:
        "OT requires a central authority to transform and order every operation, which is complex to implement correctly and a single point of failure. CRDTs converge automatically from any edit order, so the client stays simple, offline edits merge cleanly, and there's no server-side transform to get wrong.",
    },
    {
      title: "Docker isolation over a language sandbox",
      choice: "Ran each execution in its own Docker container.",
      rationale:
        "Language-level sandboxes are notoriously leaky. Full container isolation gives a hard security boundary and lets the same pipeline support multiple languages and resource limits.",
    },
  ],
  lessons: [
    "CRDTs move correctness into the data model — leaning on them early removed a whole class of sync bugs.",
    "Security boundaries are easier to reason about when they're infrastructural (containers) rather than in application code.",
    "Presence UX is disproportionately important: live cursors are what make a collaborative tool feel alive.",
  ],
  metrics: [
    { label: "Concurrent editors", value: "Unbounded (CRDT)" },
    { label: "Merge conflicts", value: "0 by design" },
    { label: "Execution isolation", value: "Per-run container" },
  ],
  media: {
    hero: "", // TODO: add hero image
    screenshots: [], // TODO
    video: "", // TODO
  },
  accent: "oklch(0.72 0.15 265)",
};
