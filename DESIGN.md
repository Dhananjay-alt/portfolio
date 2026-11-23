---
name: Dhananjay Hire — Portfolio
description: Complete systems, shipped end to end.
colors:
  paper: "#f2f0eb"
  surface: "#e9e6df"
  ink: "#111111"
  mute: "#66635d"
  line: "#d9d5cc"
  field: "#85807a"
  signal-vermilion: "#b93a15"
  danger: "#a3271b"
  paper-dark: "#121211"
  surface-dark: "#1b1b19"
  ink-dark: "#eceae4"
  mute-dark: "#9b978f"
  line-dark: "#2b2a27"
  field-dark: "#6e6a63"
  signal-vermilion-dark: "#ff7a4d"
  danger-dark: "#ff8a7a"
typography:
  display:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.254rem + 6.385vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  headline-1:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.37rem + 3.756vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline-2:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.875rem, 1.303rem + 2.441vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Instrument Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.081rem + 0.188vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  section: "clamp(72px, 11vw, 152px)"
  gutter: "clamp(20px, 4vw, 40px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  tag:
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  preview-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: Dhananjay Hire — Portfolio

## Overview

**Creative North Star: "The Engineer's Notebook"**

A working document, not a brochure. Warm paper, near-black ink, ruled hairlines and mono notes in
the margin: the page looks like the place where a system was reasoned out, and every mark on it is
there because it carries information. Precision is the ornament. The one splash of colour is the
pen you'd circle a finding with.

The page is quiet and dense in the right places. Large serif headings set the rhythm; everything
else is a disciplined sans and a small mono label. Structure comes from a 12-column grid and 1px
rules, never from boxes, cards or shadows. Motion is part of the craft and held to the same
restraint: it explains where something came from or where it went, and is removed when it doesn't.

**Key Characteristics:**
- Paper and ink, one accent used like a red pen.
- Hairline rules instead of containers; the grid does the grouping.
- Serif for headings, sans for reading, mono for metadata.
- Numbered sections (`01 — Work`) and tabular figures, like a spec.
- Every motion has a reason, and all of it degrades to stillness.

## Colors

A near-monochrome paper-and-ink palette with a single warm signal colour; dark mode is the same
system with the lights off, not a different palette.

### Primary
- **Signal Vermilion**: the only chromatic colour. Links that need emphasis, the active-nav
  underline, focus rings, the first node of an architecture schematic, the prize badge dot, string
  tokens in code. Lightened in dark mode to keep 7:1.

### Neutral
- **Notebook Paper**: page background. Never pure white.
- **Pressed Paper (surface)**: one step down from paper, for code blocks, previews and the command
  palette's selected row. The only "filled" area besides the primary button.
- **Ink**: all body text and headings, and the fill of the one primary button. Near-black, never
  #000.
- **Pencil Grey (mute)**: secondary copy, metadata, labels. 5.3:1 on paper, 4.8:1 on surface.
- **Rule Line**: 1px dividers between rows and sections. Decorative only; never the sole edge of a
  control.
- **Field Edge**: the border of inputs and textareas. Exists so a form field's outline clears the
  3:1 non-text contrast minimum, which Rule Line does not.
- **Danger**: form errors only.

### Named Rules
**The Red Pen Rule.** Signal Vermilion covers well under 5% of any screen. It marks, it never
fills: no backgrounds, no large type, no gradients.

**The No-Violet Rule.** No violet, lavender or lilac anywhere in the system's own design.

**The Field Edge Rule.** Anything a visitor types into is outlined in Field Edge, never Rule Line.

## Typography

**Display Font:** Instrument Serif (with Iowan Old Style, Georgia)
**Body Font:** Geist (with system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** A narrow, characterful serif with editorial authority over a neutral, engineered
sans; the mono carries the "notebook margin" voice for years, tags and section numbers.

### Hierarchy
- **Display** (400, 44px → 112px fluid, 0.96): the home hero, the case-study title, the closing
  "Let's build what ships." and the Philosophy line.
- **Headline 1** (400, 36px → 76px, 1.0): interior page titles and home section headings.
- **Headline 2** (400, 30px → 56px, 1.04): case-study chapters, About sections, project titles in
  the work list.
- **Title** (400 serif, 24px → 32px, 1.12): row titles (capabilities, decisions, architecture
  layers, posts).
- **Lead** (400, 18px → 20px, 1.5): the one paragraph that introduces a section. 46–56ch.
- **Body** (400, 16px, 1.6): everything else. Long-form posts use 18px at 1.7.
- **Small** (400, 14px, 1.5): nav, buttons, meta values, code.
- **Label** (400 mono, 12px, 0.06em, uppercase): section indices, years, tags, field names.

### Named Rules
**The 1.2 Rule.** Adjacent heading levels differ by at least 1.2× at every viewport width,
including 375px. No size exists between two steps of the scale.

**The Two-Faces-Per-Line Rule.** A line is serif or sans or mono — never mixed except the label's
index digit in ink.

## Layout

A 12-column grid (24px gutters) inside a 1200px content width, with fluid side gutters of
20–40px. Sections are separated by a 1px rule and generous vertical space (72–152px, fluid). Rows
inside a section are ruled list items on the grid: index in column 1, title in columns 2–6,
description in 7–10, metadata right-aligned in 11–12. Under 768px everything collapses to one
column in reading order; nothing hides.

Spacing is on a **4px base**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, plus the fluid section and
gutter values. Icon-sized marks (status dots) use 8px.

### Named Rules
**The Hairline Rule.** Group with space and a 1px rule. If you are about to draw a box, use a rule
instead.

**The Same-Edges Rule.** Every block starts on the container edge or a grid column; nothing is
nudged off-grid for effect.

## Elevation & Depth

Flat. There are no shadows anywhere in the system. Depth is tonal: Pressed Paper sits one step
below Notebook Paper. The header gains a translucent paper fill and a hairline only after the page
scrolls 40px, so it reads as lifted only when something passes under it.

### Named Rules
**The Flat-By-Default Rule.** No `box-shadow`. If something must sit above the page (command
palette, mobile menu), it gets a paper fill and a hairline, not a shadow.

## Shapes

Small, consistent radii: 4px for tags and inline code, 6px for buttons, inputs, code blocks and
preview panels, 8px for the command palette. Status marks are circles. No pills, no blobs, no
rotated or skewed shapes.

## Components

### Buttons
- **Shape:** gently squared (6px).
- **Primary:** ink fill, paper text, 44px tall, 20px side padding, Small type at weight 500. It is
  the only filled button in the system; "Get in touch" in the header is its 36px variant, which
  keeps a 44px hit area through an invisible 4px extension above and below.
- **Hover / Press:** opacity to 0.86 on hover (150ms); scale 0.98 on press. The primary CTA in the
  hero and closing section adds a magnetic pull of up to 6px.
- **Secondary:** not a button — a text link with the drawn underline.

### Links
- **Default:** inherits colour; a 1px underline draws in from the left on hover and retracts to the
  right on leave (250ms).
- **Emphasis:** Signal Vermilion for the single most important link in a section.
- **Arrows:** a trailing glyph (→ ↗ ↓ ←) nudges 3px in its direction on hover.

### Tags
- **Style:** transparent background, 1px Rule Line border, 4px radius, Label type in Pencil Grey,
  4px × 8px padding. Never interactive.
- **Prize badge:** a tag in Ink with an 8px Signal Vermilion dot.

### Inputs / Fields
- **Style:** transparent on paper, 1px Field Edge border, 6px radius, 12px × 16px padding, Body type.
- **Focus:** border turns Signal Vermilion plus the global 2px focus ring.
- **Error:** Danger border and a Small message directly under the field.

### Navigation
- **Header:** name left; Work, About, Writing and the theme toggle right; "Get in touch" the only
  filled button. Small type. The active link carries a 1px vermilion underline that slides between
  items. Hides on scroll down, returns on scroll up.
- **Mobile:** a "Menu" text control opens a full-width panel of Headline-sized links separated by
  rules.

### Work Row (signature)
A full-width ruled row: index, project title in Headline 2, one-line outcome, three tags, year and
↗. On hover with a mouse the title shifts 12px and a preview follows the cursor; on touch the
preview sits inline under the row.

### Journey Year (signature)
The one oversized number in the system: on desktop the Journey section pins and shows the current
year at 7rem → 19rem fluid (Instrument Serif, tabular lining figures, 0.82 line height) while its
last digit rolls 4 → 5 → 6 with the scroll. It is a decorative, `aria-hidden` echo of the real
year headings and is exempt from the type scale; nothing else may use it.

### Architecture Schematic (signature)
The project preview until real screenshots exist: the project's layers drawn as nodes on a hairline
rail on Pressed Paper, the first node in Signal Vermilion. Replaced by `media.hero` when present.

## Do's and Don'ts

### Do:
- **Do** use Ink (#111111) on Notebook Paper (#f2f0eb) for all reading text.
- **Do** separate rows and sections with a 1px Rule Line and space on the 4px scale.
- **Do** set years, indices and tags in Label (Geist Mono 12px, uppercase, 0.06em).
- **Do** keep every interactive target at least 44px tall outside running text.
- **Do** outline form fields in Field Edge (#85807a light, #6e6a63 dark).
- **Do** give every animation a reason, use the tokens in `lib/motion.ts`, and provide the reduced-motion fallback.

### Don't:
- **Don't** use shadows, gradients, glassmorphism or blur except the scrolled header's 12px backdrop.
- **Don't** use emoji, stock icons or icon fonts; arrows are typographic glyphs.
- **Don't** introduce a second accent or any violet/lavender tone.
- **Don't** add a type size between two steps of the scale, or one that breaks the 1.2 Rule.
- **Don't** put spacing off the 4px base (no 6, 7, 10, 14 or 18px gaps).
- **Don't** fill a background with Signal Vermilion or set large type in it.
- **Don't** box content in cards; use rows on the grid.
