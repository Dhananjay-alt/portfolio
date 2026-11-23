# Dhananjay — Portfolio Build Plan

> Principal-engineer planning package. **No app code is written until this is approved.**
> Target: Awwwards Site of the Day quality. Stack: Next.js 16 / React 19 / TS, free tooling only.

**Status legend:** ✅ decided · 🟡 needs your input (TODO) · 🔵 phased/later

---

## 0. Reading guide & decisions I need from you

This document is the full deliverable set (all 25 items from your brief). It is long by design — skim the **§ headers**, read the **decisions I need** below, and the **roadmap (§13)**.

**Blocking inputs (🟡) before we can ship real content:**
- Headshot image, résumé PDF
- GitHub / LinkedIn / X URLs, contact email (memory says `hackerxdhananjay@gmail.com` — confirm this is the public one)
- Per-project: live demo URLs, GitHub repo URLs, screenshots/video
- Exact project dates/timelines (I have years/events; need month granularity if you want it)

**Scope decisions I'm recommending (override if you disagree):**
1. **Ship in tiers.** The brief lists ~40 "special features." Building all before launch = never launching. I propose **Tier 1 (launch-critical)** → **Tier 2 (delight)** → **Tier 3 (flex)**. See §13.
2. **AI assistant = RAG over MDX via a Vercel Edge function + Groq** (you already use Groq/Llama). Free, grounded, no hallucination. Tier 2.
3. **3D is used surgically**, not everywhere — hero + skills constellation only. Heavy R3F on every route kills the 100/100 perf target. See §12 risk analysis.
4. **Blog & Playground ship empty-but-wired** at launch (structure + 1 seed post), filled over time.

---

## 1. Complete project architecture

**Rendering model:** Next.js 16 App Router, **Server Components by default**; client components only for interactivity islands (cursor, 3D, command palette, forms, animated sections). React 19 + React Compiler for automatic memoization.

**Content layer:** MDX compiled at build time via **Content Collections** (typed, faster/lighter than Contentlayer, actively maintained). Projects and blog posts are typed collections validated with Zod. Zero runtime CMS.

**Data flow:**
```
MDX (projects, blog, profile)  ──build──▶ typed content objects ──▶ RSC pages
GitHub REST/GraphQL (stars, pinned, contribs) ──ISR (revalidate 1h)──▶ Open Source page
Contact form ──▶ Server Action ──▶ Resend (email) + Zod validation
AI assistant ──▶ Edge route ──▶ retrieve(MDX embeddings) + Groq chat ──▶ streamed answer
Analytics ──▶ Plausible (self-host later) or PostHog free
```

**Layering (clean architecture):**
- `content/` — source of truth (MDX + data). No React.
- `lib/` — pure logic: content loading, GitHub client, RAG retriever, SEO/OG builders. Framework-agnostic, unit-testable.
- `features/` — vertical slices (hero, projects, skills, ai-assistant, command-palette…). Each owns its components/hooks/animations.
- `components/ui/` — shadcn primitives + design-system atoms.
- `app/` — routes; thin, compose features.

**Environments:** local → Vercel Preview (per-PR) → Production. Env vars: `GROQ_API_KEY`, `GITHUB_TOKEN` (read-only, for higher rate limits), `RESEND_API_KEY`, analytics keys.

---

## 2. UI/UX design system

**Design principles:** premium-OS feel — depth, glass (sparingly), soft light, purposeful motion. Everything reads as one system. Content-first: the engineering substance is the star; motion frames it, never buries it.

**Core surfaces:** matte near-black canvas, elevated glass panels for interactive chrome (nav, command palette, cards on hover), and one signature "light" that tracks the mouse in the hero + on featured cards.

**Interaction language (consistent everywhere):**
- Hover = subtle lift + glow + accent border.
- Press = elastic scale-down (spring).
- Reveal = staggered fade+rise on scroll into view.
- Focus = visible 2px accent ring (never removed for aesthetics — AAA).

**Component states:** every interactive component specifies default / hover / active / focus-visible / disabled / loading. Documented in the component checklist (§15).

---

## 3. Folder structure

```
portfolio/
├─ app/
│  ├─ (site)/                # public routes, shared layout (nav+cursor+lenis)
│  │  ├─ page.tsx            # Home
│  │  ├─ about/page.tsx
│  │  ├─ projects/page.tsx
│  │  ├─ projects/[slug]/page.tsx
│  │  ├─ experience/page.tsx
│  │  ├─ skills/page.tsx
│  │  ├─ blog/page.tsx
│  │  ├─ blog/[slug]/page.tsx
│  │  ├─ playground/page.tsx
│  │  ├─ open-source/page.tsx
│  │  ├─ resume/page.tsx
│  │  └─ contact/page.tsx
│  ├─ api/                   # edge/route handlers (ai chat, og image, revalidate)
│  ├─ sitemap.ts, robots.ts, manifest.ts
│  └─ layout.tsx, globals.css
├─ content/
│  ├─ projects/*.mdx         # 4 featured, schema-driven
│  ├─ blog/*.mdx
│  └─ profile.ts             # canonical facts (name, links, education…)
├─ features/                 # hero, projects, skills, ai-assistant, command-palette, cursor, contact, open-source…
├─ components/ui/            # shadcn + atoms
├─ hooks/                    # useMagnetic, useMousePosition, useReducedMotion, useLenis…
├─ lib/                      # content, github, rag, seo, og, analytics
├─ animations/               # variants, easings, transitions (shared motion tokens)
├─ providers/                # theme, lenis, sound, command-palette, motion-config
├─ config/                   # site.ts, nav.ts, socials.ts
├─ styles/                   # tokens.css (OKLCH vars), typography.css
├─ types/                    # content, github, ai
├─ public/                   # images, resume.pdf, fonts (self-hosted variable)
└─ tests/ + *.test.ts (colocated)
```

---

## 4. Component hierarchy

```
RootLayout
└─ Providers (Theme, MotionConfig, Lenis, Sound, CommandPalette)
   └─ SiteChrome
      ├─ CustomCursor (client, disabled on touch/reduced-motion)
      ├─ FloatingNav (hide-on-scroll, glass, active indicator)
      ├─ CommandPalette (⌘K)
      ├─ <main> {page}
      └─ Footer (socials, sitemap, theme+sound toggles)

Home = Hero(3D/shader bg) → FeaturedRail(SyncSpace first) → SkillsPreview → GitHubStats → CTA
ProjectDetail = Hero → Meta/Links/Badges → Problem → Approach(+ArchDiagram) →
                Features → Challenges → Decisions → Lessons → Metrics → NextProject
```

Reusable atoms: `MagneticButton`, `TiltCard`, `GlowBorder`, `RevealText`, `TechBadge`, `SectionHeading`, `Prose` (MDX renderer), `Spotlight`.

---

## 5. Animation system

- **Libraries:** Motion (Framer Motion) for component/gesture/layout; GSAP + ScrollTrigger for pinned/scrubbed cinematic sequences; Lenis for smooth scroll (fed into ScrollTrigger); R3F for 3D.
- **Shared tokens** (`animations/`): easings (`easeOutExpo`, spring presets `{stiffness, damping}`), durations (xs 0.15 / s 0.3 / m 0.5 / l 0.8), stagger (0.06). No ad-hoc magic numbers.
- **Entrance intro:** logo self-draws (SVG stroke), bg fades, headline reveals — one orchestrated timeline, ≤1.5s, skippable, runs once per session (sessionStorage).
- **Golden rule:** all motion respects `prefers-reduced-motion` (→ instant/opacity-only). GPU-only props (transform/opacity). No layout thrash.

---

## 6. Color system (OKLCH, dark-first)

```css
:root { /* dark default */
  --bg:        oklch(0.14 0.005 265);
  --surface:   oklch(0.18 0.008 265);
  --border:    oklch(0.28 0.01 265);
  --fg:        oklch(0.96 0.005 265);
  --muted:     oklch(0.68 0.01 265);
  --accent:    oklch(0.72 0.15 250);  /* electric indigo (Linear/Vercel energy) */
  --accent-2:  oklch(0.80 0.13 195);  /* cyan for gradients/data */
  --success:   oklch(0.78 0.15 155);
  --warn:      oklch(0.80 0.15 85);
}
:root[data-theme="light"] { /* mirrored, contrast-checked */ }
```
All pairings verified to **WCAG AAA (7:1)** for body text where feasible, AA minimum for large/UI. Gradients use accent→accent-2 in OKLCH for perceptually smooth blends.

---

## 7. Typography system

- **Display/UI:** a variable sans (Geist or Inter Variable, self-hosted `.woff2`, `font-display: swap`, subset). 
- **Mono:** **JetBrains Mono** (matches Repo Analyzer's "instrument" identity; used for code, metrics, terminal mode).
- **Scale (fluid, `clamp()`):** step -1 … 8, ratio ~1.25 mobile → 1.333 desktop. Line-heights: tight (1.05) for display, 1.6 for prose. `text-wrap: balance` on headings, `pretty` on paragraphs.

---

## 8. Spacing system

4px base grid. Tokens `space-1..24` (4→96px). Section rhythm: `clamp(5rem, 12vh, 9rem)` vertical padding. Content max-width 72ch (prose) / 1200px (layout) / full-bleed for hero + horizontal-scroll rails.

---

## 9. Motion guidelines

Purpose over spectacle. Every animation answers "what does this communicate?" (hierarchy, causality, feedback, continuity). Spring physics for interactive elements; eased tweens for reveals. Nothing linear. Nothing >0.8s unless it's a deliberate cinematic beat. Interruptible. Reduced-motion is a first-class path, not an afterthought.

---

## 10. Accessibility guidelines (AAA target)

Semantic landmarks; single H1/page; logical heading order. Full keyboard nav incl. skip-link, focus-visible rings, focus trap in palette/modals. ARIA only where semantics fall short. `prefers-reduced-motion` honored globally. Custom cursor never hides the real focus indicator; degrades on touch. Color never the sole signal (cycles get icon+label, not just red). Alt text on all media. Forms: labels, error text, `aria-live` status. Test with keyboard-only + VoiceOver/NVDA + axe.

---

## 11. SEO strategy

Per-route `generateMetadata` (title, description, canonical). **Dynamic OG images** via `next/og` (edge) per project/post. JSON-LD: `Person` (home), `SoftwareSourceCode`/`CreativeWork` (projects), `BlogPosting` (posts), `BreadcrumbList`. `sitemap.ts`, `robots.ts`, RSS for blog. Open Graph + Twitter cards everywhere. Semantic HTML + fast LCP feed ranking.

---

## 12. Performance strategy (100/100 target)

- RSC-first; ship minimal JS. Client islands lazy-loaded (`next/dynamic`, Suspense).
- **3D budget:** hero scene lazy + `IntersectionObserver`-gated; capped DPR; `frameloop="demand"` where static; skips on reduced-motion & mobile-low-power (fallback gradient/poster). This is the #1 perf risk (§23).
- `next/image` (AVIF/WebP, sized, lazy, blur placeholder). Self-hosted subset fonts. Route-level code splitting. React Compiler memoization. Preload hero assets; prefetch on nav hover.
- CI Lighthouse budget gate on PRs (fail if <95).

---

## 13. Development roadmap (phased) 🔵

**Phase 0 — Foundation:** scaffold Next 16/TS/Tailwind/shadcn, tokens (color/type/space), providers, Lenis, custom cursor, floating nav, layout, CI + Lighthouse gate, deploy skeleton to Vercel.

**Phase 1 — Content spine (Tier 1, launch-critical):** Content Collections + project schema; seed 4 projects from source-of-truth; Home (hero + featured rail + GitHub stats + CTA); Projects landing + `[slug]` detail template; About; Contact (Resend); Resume; SEO/OG/sitemap/robots; full a11y pass. **← This is a shippable portfolio.**

**Phase 2 — Signature & delight (Tier 2):** hero 3D/shader; skills constellation; command palette (⌘K); intro animation; magnetic/tilt microinteractions; Open Source page (GitHub API/ISR); AI assistant (RAG+Groq); blog engine + 1 seed post; theme switch polish.

**Phase 3 — Flex (Tier 3):** Playground experiments; terminal/CLI mode; sound effects; confetti/Konami/dev mode; PWA/offline; Calendly; extra blog posts; screenshot/zen mode.

Ship at end of Phase 1. Everything after is additive and deployed continuously.

---

## 14. Milestones

- **M1** Foundation deployed, blank routes live on Vercel.
- **M2** Four project detail pages fully populated + Home + About + Contact. **Public launch.**
- **M3** Signature experience (3D hero, skills, ⌘K, AI assistant) live.
- **M4** Blog + Open Source + Playground populated; Lighthouse 100s locked; Awwwards submission.

---

## 15. Component checklist (abridged)

Chrome: CustomCursor, FloatingNav, CommandPalette, Footer, ThemeToggle, SoundToggle, SkipLink.
Primitives: MagneticButton, TiltCard, GlowBorder, RevealText, SectionHeading, TechBadge, Spotlight, Prose/MDX, ImageZoom, CopyCodeButton.
Home: Hero3D, AnimatedSubtitle(typing), FeaturedRail, GitHubStatsCard, ScrollIndicator.
Projects: ProjectCard, ProjectFilters(search/category/tech/year/sort), ArchitectureDiagram, MetricsGrid, ChallengeList, DecisionList, NextProjectCTA.
Skills: SkillsConstellation (R3F/force graph) + hover detail.
Systems: AIAssistant(chat), OpenSourceGrid, ContactForm, BlogTOC + ReadingProgress, Timeline (about/experience).
Each ships with: types, states (§2), reduced-motion path, a11y, story-in-Playground where relevant.

---

## 16. Database schema

No primary DB needed for launch (content is MDX/build-time). Optional later:
- **Supabase (free):** `contact_messages` (backup of form submissions), `page_views`/reactions if not using analytics tool.
- **AI assistant:** embeddings can be a static JSON built at build time (no DB) — or `pgvector` on Supabase if it grows. Start static.

---

## 17. API architecture

- `POST /api/contact` — Server Action; Zod-validated; Resend send; rate-limited (IP, in-memory/upstash-free).
- `POST /api/ai` — Edge; retrieves top-k MDX chunks, calls Groq chat, **streams** response; refuses out-of-scope politely (grounded only).
- `GET /api/og` — dynamic OG image (`next/og`).
- `GET /api/revalidate` or ISR — refresh GitHub stats hourly.
- GitHub data fetched server-side with token, cached (ISR 1h) — never client-side (rate limits + no token leak).

---

## 18. Content architecture — PROJECT CONTENT SCHEMA ✅

Zod-typed MDX frontmatter (drives every detail page identically):
```ts
{ slug, title, tagline, category, year, status,           // Live|Demo|Hackathon|Archived
  role, timeline, priority,
  links: { liveDemo?, github?, caseStudy? },
  award?, 
  techStack: { frontend?, backend?, web3?, infra?, ai? },  // grouped string[]
  problem, approach, features[], challenges[], decisions[], lessons[],
  metrics?: { label, value }[],
  media: { hero, screenshots[], video? } }
```
Body = MDX (prose + code + custom components: `<ArchDiagram/>`, `<Metric/>`, `<Callout/>`). Blog schema mirrors this pattern (title, date, tags, summary, readingTime auto).

---

## 19. Project content model — the four featured projects ✅

Seeded from your source-of-truth (verified Repo Analyzer against the live `repo-viz` repo):

1. **SyncSpace** [FLAGSHIP] — *Real-time collaborative study & coding workspace.* Realtime/Full-Stack · Nebula (MDG Space, IITR). Stack: Next.js, Supabase, **Yjs CRDTs**, Monaco, Docker sandbox. Highlights: conflict-free realtime (CRDT, no lock-step), live cursors/presence via Supabase, Docker-isolated untrusted code execution, in-browser IDE. **Decision to surface:** Yjs CRDTs vs Operational Transform. *Most cinematic treatment.*
2. **Paygent** — *On-chain payments dApp with ENS.* Web3 · ETHGlobal HackMoney, 🏆 **ENS Partner Prize** (V2). Stack: Solidity+Foundry, wagmi/viem, Next.js. Highlights: Foundry-tested contracts, ENS human-readable payment UX, wallet/chain via wagmi/viem.
3. **LuxAuth** (LuxuryAuthNFT) — *NFT authentication & provenance for luxury goods.* Web3/Full-Stack · ETHOnline 2025. Stack: Solidity+Foundry, ERC-721, IPFS, Next.js+Tailwind. Highlights: ERC-721 certs w/ IPFS metadata, brand-verification dashboard, minting portal, public QR/hash verify page.
4. **Repo Analyzer** (Repo.Viz) — *Repo dependency visualizer with AI summaries.* Dev Tools/AI · GDSC IITR Open Summer of Code (solo). Stack: FastAPI/Python, React, React Flow+dagre, networkx, radon, Groq Llama 3.3, SQLite. Highlights: `ast` import resolution (no code executed), **SCC circular-dep detection**, complexity metrics, AI role-aware summaries + repo-level architecture review, SHA-256 content-hash SQLite cache. **Decision to surface:** Groq/Llama chosen after abandoning Gemini over API-access issues (senior trade-off narrative).

---

## 20. Asset strategy 🟡

Self-hosted variable fonts (subset). `next/image` for all raster (AVIF/WebP + blur). SVG for logos/icons (Lucide). Project media: screenshots ≥1600w, optional MP4 (poster + lazy). **Need from you:** headshot, résumé PDF, per-project screenshots/video, demo/GitHub URLs. Placeholders (marked TODO) render gracefully until supplied.

---

## 21. Deployment strategy

Vercel (free). GitHub → auto Preview per PR, Production on `main`. Env vars in Vercel dashboard. ISR for GitHub data. Edge runtime for AI + OG. Analytics: Plausible (self-host later) or PostHog free. Custom domain when ready.

---

## 22. Future roadmap 🔵

i18n scaffolding (language switcher ready), MDX case studies, more Playground shaders/algorithms, live "now" page, RSS, richer AI assistant (project-aware actions), guestbook, view counters.

---

## 23. Risk analysis

| Risk | Impact | Mitigation |
|---|---|---|
| 3D/motion tanks Lighthouse perf | High | Lazy + gated + reduced-motion fallbacks; CI perf budget; 3D only on hero+skills |
| Feature sprawl (40+ specials) delays launch | High | Tiered scope; ship at Phase 1 |
| Missing real assets/links (🟡) | Med | Typed TODO placeholders; site works without them |
| GitHub API rate limits | Med | Server-side token + ISR cache |
| AI assistant hallucination | Med | Strict RAG grounding + "I can only answer about Dhananjay" guardrail |
| Custom cursor breaks a11y/touch | Med | Feature-detect; never remove focus ring |
| Scope of AAA contrast vs bold gradients | Low | OKLCH tokens pre-validated |

---

## 24. Testing strategy

- **Types** = first line of defense (strict TS, Zod at content boundaries).
- **Unit (Vitest):** lib logic — content loader, RAG retriever, GitHub client, SEO/OG builders, complexity of pure utils.
- **Component (Testing Library):** forms, filters, palette, keyboard nav.
- **E2E (Playwright):** critical paths — load home, open ⌘K, navigate to each project, submit contact (mocked), theme toggle.
- **A11y:** axe in CI + manual keyboard/SR pass.
- **Perf:** Lighthouse CI budget gate on PRs.
- **Visual:** Playwright screenshots on key routes (optional).

---

## 25. Complete implementation plan

Execution follows §13 phases. Working rhythm: **one vertical feature at a time, production-quality, no placeholder code**, each landed behind a PR with Preview URL + Lighthouse check. Order:

1. Phase 0 foundation (scaffold, tokens, chrome, CI, deploy).
2. Content schema + 4 seeded projects (§18/19).
3. Home → Projects/[slug] → About → Contact → Resume → SEO. **Launch (M2).**
4. Signature: hero 3D → skills → ⌘K → intro → AI assistant → Open Source → blog. **(M3).**
5. Playground + flex features + Lighthouse-100 lock + Awwwards submission. **(M4).**

After each feature: verify in Vercel Preview, run a11y + perf checks, then next.

---

### ✅ Approve, and I start Phase 0. Tell me any changes to scope/priority first.
