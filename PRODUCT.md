# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters** screening engineering candidates, often in a batch, on a laptop or phone.
- **Early-stage founders** looking for a founding or first engineer who can own a product end to end.
- **Web3 protocol teams** looking for someone who writes tested Solidity and ships the app around it.

All three decide in about 30 seconds whether to reach out. Success is an email sent, the résumé
opened, or a case study read.

## Product Purpose

A personal portfolio for Dhananjay Hire, a Full-Stack & Web3 engineer at IIT Roorkee (B.Tech,
Metallurgical & Materials Engineering, class of 2028). It proves he ships complete systems — from
data model to interface — and makes contacting him effortless.

## Positioning

"Complete systems, shipped end to end." The through-line is a belief: **correctness belongs in the
data model** — CRDTs instead of locks, container isolation instead of language sandboxes, static
analysis instead of guesswork. Each project demonstrates that choice in a different domain
(realtime, on-chain, developer tooling).

## Operating Context

- Visitors arrive from a résumé, LinkedIn, GitHub, a hackathon page or a cold email.
- Each project has a case study at `/work/[slug]` in the order problem → architecture → key
  decisions → result. `/projects/*` URLs redirect there.
- Writing lives at `/blog` (MDX) with an RSS feed at `/feed.xml`. The FAQ lives on `/about`.
- Contact: email (`dhananjay_h@mt.iitr.ac.in`), GitHub (`Dhananjay-alt`), LinkedIn, the `/contact`
  form, and `public/resume.pdf`.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind v4, deployed on Vercel. All content is typed TypeScript
  under `content/`, validated by zod in `types/project.ts`.
- The home page is fixed at seven sections: nav, hero, selected work (4 projects), capabilities (5
  disciplines), journey (2024/2025/2026), philosophy, closing CTA + footer.
- Motion is a feature, held to restraint: every animation needs a reason. Tokens live in
  `lib/motion.ts` and are documented in the README.
- Hard requirements: Lighthouse ≥ 95 in every category on mobile, LCP < 2s, CLS < 0.05, fully
  readable with JavaScript disabled, full `prefers-reduced-motion` fallback, keyboard navigable,
  WCAG AA contrast.

## Brand Commitments

- Positioning line stays verbatim: "Complete systems, shipped end to end."
- Philosophy line stays verbatim: "Correctness belongs in the data model."
- Closing line: "Let's build what ships."
- No emoji, no stock icons, no gradients, no glassmorphism.

## Evidence on Hand

- **SyncSpace** (MDG Space, IIT Roorkee, 2026) — realtime collaborative study/coding workspace.
  Yjs CRDTs over a custom **Hocuspocus** WebSocket server (not Supabase), Postgres snapshots + RLS,
  per-run Docker sandbox. Live: https://syncspace-weld.vercel.app · Source:
  https://github.com/Dhananjay-alt/syncspace
- **Paygent v2** (ETHGlobal HackMoney 2026) — won the **Integrate ENS partner prize**. Agentic
  on-chain payments with ENS as the configuration layer. Source:
  https://github.com/Dhananjay-alt/paygent-v2
- **LuxAuth / LuxuryAuthNFT** (ETHGlobal ETHOnline 2025) — ERC-721 provenance for luxury goods.
  Source: https://github.com/Dhananjay-alt/LuxuryAuth-nft
- **Repo Analyzer** (GDSC IIT Roorkee, Open Summer of Code 2026) — Python dependency graph + AI
  summaries. Demo video: https://youtu.be/DRNv6aYk8lQ. **No public repo or live URL yet.**
- Four blog posts in `content/blog/`, the résumé PDF, and the experience timeline in
  `content/experience.ts`.

**Absent — do not fabricate:** project screenshots or video (previews are drawn architecture
schematics until real captures exist), live demos for Paygent, LuxAuth and Repo Analyzer,
testimonials, employer logos, metrics beyond those in the content files, a headshot.

## Product Principles

1. **Proof over adjectives.** Every claim points at a project, a decision or a repo.
2. **Thirty seconds to signal.** Role, positioning, best work and a way to reach out are visible
   without scrolling far.
3. **The site demonstrates the craft.** Performance, accessibility and motion quality are part of
   the evidence, not decoration.
4. **Restraint is the brief.** If removing something loses nothing, remove it.

## Accessibility & Inclusion

WCAG 2.2 AA. Full keyboard navigation with visible focus in the accent colour, semantic HTML,
`prefers-reduced-motion` honoured (no travel, no pinning, opacity fades ≤ 200ms), content readable
with JavaScript disabled, touch has no hover-dependent content.
