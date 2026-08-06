"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  ArrowRight,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Monitor,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { navItems } from "@/config/nav";
import { getAllProjects } from "@/lib/projects";
import { profile } from "@/content/profile";

export function CommandPalette() {
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const toggle = useUIStore((s) => s.toggleCommand);
  const router = useRouter();
  const { setTheme } = useTheme();
  const projects = getAllProjects();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle]);

  function run(action: () => void) {
    setOpen(false);
    // Defer so the dialog closes before navigation/theme change.
    requestAnimationFrame(action);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in"
      contentClassName="glass fixed left-1/2 top-[18vh] z-[200] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-4">
        <Sparkles className="size-4 text-brand" />
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        <Group heading="Navigation">
          {navItems.map((item) => (
            <Item key={item.href} onSelect={() => run(() => router.push(item.href))}>
              <Home className="size-4 text-muted-foreground" />
              {item.label}
            </Item>
          ))}
        </Group>

        <Group heading="Projects">
          {projects.map((p) => (
            <Item
              key={p.slug}
              value={`project ${p.title} ${p.tagline}`}
              onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
            >
              <FolderGit2 className="size-4 text-muted-foreground" />
              <span>{p.title}</span>
              <span className="ml-auto truncate text-xs text-muted-foreground">
                {p.category}
              </span>
            </Item>
          ))}
        </Group>

        <Group heading="Actions">
          <Item onSelect={() => run(() => router.push("/contact"))}>
            <Mail className="size-4 text-muted-foreground" />
            Contact me
          </Item>
          <Item
            value="copy email"
            onSelect={() => run(() => navigator.clipboard?.writeText(profile.email))}
          >
            <Mail className="size-4 text-muted-foreground" />
            Copy email address
          </Item>
          <Item onSelect={() => run(() => router.push("/resume"))}>
            <FileText className="size-4 text-muted-foreground" />
            View resume
          </Item>
        </Group>

        <Group heading="Theme">
          <Item value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
            <Moon className="size-4 text-muted-foreground" /> Dark
          </Item>
          <Item value="theme light" onSelect={() => run(() => setTheme("light"))}>
            <Sun className="size-4 text-muted-foreground" /> Light
          </Item>
          <Item value="theme system" onSelect={() => run(() => setTheme("system"))}>
            <Monitor className="size-4 text-muted-foreground" /> System
          </Item>
        </Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
  value,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  value?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-foreground"
    >
      {children}
      <ArrowRight className="ml-auto size-3.5 opacity-0 transition-opacity group-data-[selected=true]:opacity-60" />
    </Command.Item>
  );
}
