"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { getAllProjects } from "@/lib/projects";
import { fireConfetti } from "@/lib/confetti";
import { fireMatrix } from "@/lib/matrix";

type Line = { type: "in" | "out" | "err"; text: string };

const HELP = [
  "Available commands:",
  "  help          — show this list",
  "  whoami        — who is Dhananjay",
  "  about         — short bio",
  "  projects      — list projects",
  "  open <slug>   — open a project (e.g. open syncspace)",
  "  skills        — list the stack",
  "  contact       — how to reach me",
  "  resume        — download the resume",
  "  theme <name>  — set theme (dark|light|system)",
  "  confetti      — 🎉",
  "  matrix        — enter the matrix",
  "  clear         — clear the screen",
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: `${profile.name} — ${profile.role}` },
    { type: "out", text: "Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const router = useRouter();
  const { setTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function print(text: string, type: Line["type"] = "out") {
    setLines((prev) => [...prev, { type, text }]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines((prev) => [...prev, { type: "in", text: cmd }]);
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const projects = getAllProjects();

    switch (name.toLowerCase()) {
      case "help":
        HELP.forEach((l) => print(l));
        break;
      case "whoami":
        print(`${profile.name}, ${profile.role} · ${profile.education.school} '${String(profile.education.graduationYear).slice(2)}`);
        break;
      case "about":
        profile.bio.forEach((b) => print(b));
        break;
      case "projects":
        projects.forEach((p) => print(`  ${p.slug.padEnd(16)} ${p.tagline}`));
        print("Use 'open <slug>' to view one.");
        break;
      case "open": {
        const slug = args[0];
        const found = projects.find((p) => p.slug === slug);
        if (!slug) print("Usage: open <slug>", "err");
        else if (!found) print(`No project '${slug}'. Try 'projects'.`, "err");
        else {
          print(`Opening ${found.title}…`);
          router.push(`/projects/${found.slug}`);
        }
        break;
      }
      case "skills":
        skillGroups.forEach((g) => print(`  ${g.category.padEnd(10)} ${g.skills.map((s) => s.name).join(", ")}`));
        break;
      case "contact":
        print(`email:  ${profile.email}`);
        print("Or run 'open' on the site's Contact page: /contact");
        router.prefetch("/contact");
        break;
      case "resume":
        print("Opening resume…");
        router.push("/resume");
        break;
      case "theme": {
        const t = args[0];
        if (["dark", "light", "system"].includes(t)) {
          setTheme(t);
          print(`Theme set to ${t}.`);
        } else print("Usage: theme <dark|light|system>", "err");
        break;
      }
      case "confetti":
        fireConfetti();
        print("🎉");
        break;
      case "matrix":
        fireMatrix();
        print("Wake up, Neo…");
        break;
      case "sudo":
        print("Nice try. You already have root here. 😉");
        break;
      case "clear":
        setLines([]);
        break;
      default:
        print(`command not found: ${name}. Type 'help'.`, "err");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-[oklch(0.12_0.008_265)] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-muted-foreground">dhananjay@portfolio: ~</span>
      </div>

      <div ref={scrollRef} className="h-80 overflow-y-auto p-4 text-[oklch(0.9_0.02_265)]">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words leading-relaxed">
            {l.type === "in" ? (
              <span>
                <span className="text-brand-2">➜</span>{" "}
                <span className="text-brand">~</span> {l.text}
              </span>
            ) : (
              <span className={l.type === "err" ? "text-red-400" : ""}>{l.text}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-brand-2">➜</span>
          <span className="text-brand">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-[oklch(0.9_0.02_265)] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
