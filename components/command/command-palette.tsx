"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { useUIStore } from "@/stores/ui-store";
import { navItems } from "@/config/nav";
import { getAllProjects } from "@/lib/projects";
import { profile } from "@/content/profile";

/** ⌘K palette. Loaded on demand by <CommandPaletteLoader>. */
export default function CommandPalette() {
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const router = useRouter();
  const { setTheme } = useTheme();
  const projects = getAllProjects();

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
      overlayClassName="fixed inset-0 z-[190] bg-ink/30 data-[state=open]:animate-in data-[state=open]:fade-in"
      contentClassName="fixed left-1/2 top-[18vh] z-[200] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border border-line bg-paper data-[state=open]:animate-in data-[state=open]:fade-in"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-mute"
        />
        <kbd className="label hidden rounded border border-line px-1.5 py-0.5 sm:block">Esc</kbd>
      </div>

      <Command.List className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
        <Command.Empty className="py-8 text-center text-sm text-mute">No results found.</Command.Empty>

        <Group heading="Navigation">
          {navItems.map((item) => (
            <Item key={item.href} onSelect={() => run(() => router.push(item.href))}>
              {item.label}
            </Item>
          ))}
        </Group>

        <Group heading="Work">
          {projects.map((p) => (
            <Item
              key={p.slug}
              value={`project ${p.title} ${p.tagline}`}
              onSelect={() => run(() => router.push(`/work/${p.slug}`))}
            >
              <span>{p.title}</span>
              <span className="label ml-auto truncate">{p.category}</span>
            </Item>
          ))}
        </Group>

        <Group heading="Actions">
          <Item
            value="copy email"
            onSelect={() => run(() => void navigator.clipboard?.writeText(profile.email))}
          >
            Copy email address
          </Item>
          <Item value="rss feed" onSelect={() => run(() => router.push("/feed.xml"))}>
            RSS feed
          </Item>
        </Group>

        <Group heading="Theme">
          <Item value="theme dark" onSelect={() => run(() => setTheme("dark"))}>
            Dark
          </Item>
          <Item value="theme light" onSelect={() => run(() => setTheme("light"))}>
            Light
          </Item>
          <Item value="theme system" onSelect={() => run(() => setTheme("system"))}>
            System
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
      className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.06em] [&_[cmdk-group-heading]]:text-mute"
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
      className="flex cursor-pointer items-center gap-2.5 rounded px-2.5 py-2 text-sm outline-none data-[selected=true]:bg-surface"
    >
      {children}
    </Command.Item>
  );
}
