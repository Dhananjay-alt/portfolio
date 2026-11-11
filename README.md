# Dhananjay Hire — portfolio

Next.js 16 (App Router), React 19, Tailwind v4. Content lives in typed files under `content/`.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck && pnpm lint && pnpm test
```

## Structure

| Path | What it holds |
| --- | --- |
| `app/(site)/` | Routes. Home, `/work`, `/work/[slug]`, `/about`, `/blog`, `/contact`, `/resume`, plus `/experience`, `/skills`, `/playground`, `/open-source` (linked from the footer). |
| `components/home/` | The home sections: hero, selected work, capabilities, journey, philosophy. |
| `components/work/` | Work list, project preview, case-study pieces. |
| `components/motion/` | Motion primitives (see below). |
| `components/site/` | Header, footer, theme toggle, cursor, shared bits. |
| `content/` | Profile, projects, experience, skills, blog posts (MDX). |
| `lib/motion.ts` | Motion tokens — the single source of truth. |
| `app/globals.css` | Design tokens and every CSS-driven animation. |

`/projects` and `/projects/:slug` redirect permanently to `/work` (`next.config.ts`).

## Design tokens

Defined at the top of `app/globals.css`: `--paper`, `--surface`, `--ink`, `--mute`, `--line`
and one `--accent`, each with a `.dark` counterpart. Tailwind exposes them as `bg-paper`,
`text-ink`, `text-mute`, `border-line`, `text-accent`. To change the accent, change `--accent`
in both blocks and keep it at or above 4.5:1 against `--paper` and `--surface`.

Type: Instrument Serif (display, `h1`–`h3`), Geist (body), Geist Mono (`.label`, `.tag`).
The scale is fluid: `.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-lead`.

## Motion system

### Tokens

Everything is defined once in `lib/motion.ts`. JS (Motion, GSAP) imports the values; CSS reads
the custom properties that `motionCssVars()` writes onto `<html>`, so the two cannot drift.

| Token | Value | CSS variable |
| --- | --- | --- |
| `ease.out` | `cubic-bezier(0.22, 1, 0.36, 1)` | `--ease-out` |
| `ease.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | `--ease-in-out` |
| `duration.micro` | 150ms | `--dur-micro` |
| `duration.small` | 250ms | `--dur-small` |
| `duration.medium` | 450ms | `--dur-medium` |
| `duration.large` | 800ms (hero and page-level only) | `--dur-large` |
| `stagger.step` / `maxItems` | 50ms / 8 | `--stagger` |
| `reveal.distance` / `amount` | 16px / 0.3 | `--reveal-y` |
| `spring` | stiffness 300, damping 30 | — |
| `magnetic.max` | 6px | — |

Rules: animate only `transform`, `opacity`, `clip-path` and `filter`. Reveals travel 16px,
never rotate, never bounce. If removing an animation loses nothing, remove it.

### Primitives (`components/motion/`)

- **`<Reveal>`** — 16px fade-up when 30% in view, once. `index` staggers siblings; `as` picks the element.
- **`<SplitHeading>`** — section heading whose lines slide up out of masks (GSAP SplitText), once, on enter.
- **`<MagneticButton>`** — wraps the primary CTA; leans up to 6px toward the pointer.
- **`<PageTransition>`** — wrap the content of each `page.tsx` for the route-change transition. `PageShell` already does this.
- **`<SharedElement name>`** — the same `name` on two routes morphs the element between them.

### How it stays fast and accessible

- **No JS, no hidden content.** Hidden initial states exist only under `html.js`, a class an
  inline script adds before first paint. With JavaScript disabled the page is fully readable.
- **LCP never waits for JS.** The hero and page-title reveals are CSS animations that start
  on first paint. A second inline script marks reveal blocks already in the first viewport as
  shown, without animating them.
- **GSAP is lazy.** `lib/gsap.ts` loads GSAP, ScrollTrigger and SplitText on idle, only on pages
  that use them. Motion's engine is loaded on demand through `LazyMotion`; use `m.*` from
  `motion/react-m`, not `motion.*`.
- **Reduced motion.** Lenis, the pinned Journey, SplitText, the cursor, the cursor-follow
  preview and the circular theme reveal are all off. What remains is opacity fades of 180ms or less.
- **Touch.** Nothing depends on hover: the work previews sit inline under each row, and the
  Journey is a vertical list under 768px.

### Every animation

| Animation | Trigger | Duration | Easing |
| --- | --- | --- | --- |
| Hero headline line-mask reveal | First page load of the session | 800ms, 70ms between lines | `ease.out` |
| Hero eyebrow, subtext, CTAs fade-up | After the headline starts (350ms) | 450ms, 60ms stagger | `ease.out` |
| Header fade-in | Last in the intro (650ms) | 450ms | `ease.out` |
| Intro on later loads in the session | Page load | 300ms fade | `ease.out` |
| Interior page title line-mask | Hard load of that page | 800ms | `ease.out` |
| Section heading line reveal (SplitText) | 30% in view, once | 800ms, 70ms between lines | `power4.out` (= `ease.out`) |
| Body block fade-up (`Reveal`) | 30% in view, once | 450ms, 50ms stagger, max 8 | `ease.out` |
| Work row: title shifts 12px, arrow nudges 4px | Hover / focus | 450ms | `ease.out` |
| Work preview follows cursor | Pointer move over a row | Spring | stiffness 300, damping 30 |
| Work preview clip-path wipe | Enter / leave the list | 450ms | `ease.out` |
| Title and preview morph into case study | Click a work row (also "Next project") | 550ms | `ease.inOut` |
| Route change: old page fades out | Navigation | 150ms | `ease.inOut` |
| Route change: new page fades up | Navigation, after 120ms | 450ms | `ease.out` |
| Journey: horizontal track, rolling year digit | Scroll (scrubbed), ≥768px | Scroll-linked | `power2.inOut` (= `ease.inOut`) |
| Journey: progress line draws | Scroll (scrubbed) | Scroll-linked | linear |
| Theme toggle circular reveal | Click the toggle | 800ms | `ease.inOut` |
| Header hides / returns | Scroll down / up | 250ms | `ease.inOut` |
| Header hairline and blur | Scrolled past 40px | 250ms | `ease.out` |
| Active nav underline slides | Route change | Spring | stiffness 300, damping 30 |
| Link underline draws left→right, retracts right | Hover / leave | 250ms | `ease.inOut` |
| Button press (scale 0.98) and hover (opacity) | Press / hover | 150ms | `ease.out` |
| Magnetic pull on primary CTA (max 6px) | Pointer move | Spring | stiffness 300, damping 30 |
| Arrow glyph nudge (3px) | Hover on its link | 250ms | `ease.out` |
| Email "Copy" → "Copied" morph | Click the address | 250ms | `ease.out` |
| Cursor dot follow and grow | Pointer move / over interactive | Spring | stiffness 500, damping 40 |
| Mobile menu open / close | Menu button | 250ms | `ease.out` |
| FAQ "+" rotates to "×" | Open a question | 250ms | `ease.out` |
| Smooth scroll (Lenis) | Wheel | lerp 0.1 | — |

## Adding a project

1. Create `content/projects/<slug>.ts` exporting a `Project` (copy `syncspace.ts`). The schema
   in `types/project.ts` validates it at build time. Fields the list and case study rely on:
   - `outcome` — one line shown in the work list
   - `tags` — exactly three
   - `badge` — optional, e.g. a prize
   - `architecture` — the layers; drawn as the preview schematic and listed in the case study
   - `code` — optional snippet (`language`, `source`, `filename`, `caption`)
   - `priority` — lower numbers come first
2. Register it in `content/projects/index.ts`.
3. Optional: put a screenshot in `public/` and set `media.hero`. It replaces the schematic in
   the hover preview and the case-study hero.

That is all: `/work/<slug>`, its OG image, the sitemap entry, JSON-LD, the home and `/work`
lists and the command palette are generated from the content file. Update the count in
`tests/projects.test.ts`.

## Adding a post

Add `content/blog/<slug>.mdx` with `title`, `description`, `date` and `tags` front matter. It
appears on `/blog` and in `/feed.xml`.
