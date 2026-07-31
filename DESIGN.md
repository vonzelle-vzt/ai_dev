```yaml
version: 1
name: DevShop (ai_dev) — AI Dev Shop
description: >
  A dark-only engineering console. Near-black zinc surfaces, hairline zinc borders, and one
  saturated blue that carries the entire brand — the logo mark, the primary CTA, the active nav
  item, the focus ring, and every chart series. Everything else is deliberately restrained:
  there is no second brand hue, no shadow, no gradient except a single hero headline sweep. Depth
  is expressed as a three-step surface ladder (zinc-950 page → zinc-900 card → zinc-800 inset)
  plus a 1px border, never as a drop shadow. Status is the only place other hues appear, always
  as a low-opacity tinted pill.

# Where these values are copied FROM. See "Token source of truth" below.
source: src/app/globals.css

# ── Base layer ──────────────────────────────────────────────────────────────
# Token names are written exactly as globals.css declares them, minus the `--`.
# Every hex below is a verbatim transcription of src/app/globals.css `:root`
# (lines 50-83). The `tw` note is the Tailwind palette step that value equals —
# recorded because 494 raw palette classes in feature code need a migration map.
colors:
  background: "#09090b"          # tw zinc-950 — page canvas
  foreground: "#fafafa"          # tw zinc-50  — primary text
  card: "#18181b"               # tw zinc-900 — raised surface, also popover + sidebar
  card-foreground: "#fafafa"     # tw zinc-50
  popover: "#18181b"            # tw zinc-900
  popover-foreground: "#fafafa"  # tw zinc-50
  primary: "#3b82f6"            # tw blue-500 — THE brand hue
  primary-foreground: "#fafafa"  # tw zinc-50
  secondary: "#27272a"          # tw zinc-800 — inset / secondary button fill
  secondary-foreground: "#fafafa"
  muted: "#27272a"              # tw zinc-800
  muted-foreground: "#a1a1aa"    # tw zinc-400 — secondary text
  accent: "#3b82f6"             # tw blue-500 — identical to primary by design
  accent-foreground: "#fafafa"
  destructive: "#ef4444"        # tw red-500 — the ONLY semantic token that exists
  border: "#27272a"             # tw zinc-800 — every hairline
  input: "#27272a"              # tw zinc-800
  ring: "#3b82f6"               # tw blue-500 — focus ring
  chart-1: "#3b82f6"            # tw blue-500  ┐
  chart-2: "#60a5fa"            # tw blue-400  │ monochrome blue ramp,
  chart-3: "#93c5fd"            # tw blue-300  │ light→dark, NOT categorical
  chart-4: "#2563eb"            # tw blue-600  │
  chart-5: "#1d4ed8"            # tw blue-700  ┘
  sidebar: "#18181b"            # tw zinc-900 — NOTE: the shipped Sidebar uses bg-zinc-950
  sidebar-foreground: "#fafafa"
  sidebar-primary: "#3b82f6"
  sidebar-primary-foreground: "#fafafa"
  sidebar-accent: "#27272a"
  sidebar-accent-foreground: "#fafafa"
  sidebar-border: "#27272a"
  sidebar-ring: "#3b82f6"

# Fonts are next/font (Geist) bound to CSS vars in src/app/layout.tsx and mapped
# into Tailwind by the @theme block (globals.css lines 10-11).
# NOTE: there is no declared type scale in the token layer. The roles below are
# the de-facto scale, transcribed from actual usage counts in src/app/**.
typography:
  hero:
    fontFamily: var(--font-sans)   # → var(--font-geist-sans), Geist
    fontSize: 48px / 72px at md    # text-5xl md:text-7xl — landing hero only
    fontWeight: 700
    lineHeight: 1.1                # leading-[1.1]
    letterSpacing: -0.025em        # tracking-tight
  section-title:
    fontFamily: var(--font-sans)
    fontSize: 30px                 # text-3xl — marketing section headings (h2)
    fontWeight: 700
    lineHeight: 1.2
  page-title:
    fontFamily: var(--font-sans)
    fontSize: 24px                 # text-2xl font-bold — 25 uses; EVERY dashboard page title
    fontWeight: 700
    lineHeight: 1.2
  stat-value:
    fontFamily: var(--font-sans)
    fontSize: 30px                 # text-3xl font-bold, tinted by status hue
    fontWeight: 700
  card-title:
    fontFamily: var(--font-sans)
    fontSize: 16px                 # CardTitle default: text-base leading-snug font-medium
    fontWeight: 500
    lineHeight: 1.375
  body:
    fontFamily: var(--font-sans)
    fontSize: 14px                 # text-sm — the default body size in this app
    fontWeight: 400
  meta:
    fontFamily: var(--font-sans)
    fontSize: 12px                 # text-xs — 78 uses, the single most common size
    fontWeight: 400
  eyebrow:
    fontFamily: var(--font-sans)
    fontSize: 12px                 # text-xs font-medium uppercase tracking-wider
    fontWeight: 500
    letterSpacing: 0.05em
  code:
    fontFamily: var(--font-mono)   # → var(--font-geist-mono), Geist Mono
    fontSize: 14px                 # IDs, URLs, hex values, commit SHAs

# NO spacing tokens are declared. This is the stock Tailwind 4px scale; the
# entries below are the rhythm the app actually uses, not an invented system.
spacing:
  tight: 8px      # gap-2  — icon↔label inside a control (35 uses, the default)
  snug: 12px      # gap-3  — nav item internals, list rows
  base: 16px      # gap-4  — grid gutters, card internals, Card's own flex gap
  section: 24px   # gap-6 / space-y-6 — between dashboard sections
  page: 32px      # p-8    — dashboard content inset (dashboard layout)
  band: 80px      # py-20  — marketing section vertical band

# Declared in globals.css @theme (lines 41-47) as multipliers of --radius: 0.5rem.
rounded:
  sm: 4.8px      # calc(var(--radius) * 0.6)
  md: 6.4px      # calc(var(--radius) * 0.8)
  lg: 8px        # var(--radius) — buttons, nav items, most surfaces (45 uses)
  xl: 11.2px     # calc(var(--radius) * 1.4) — Card
  2xl: 14.4px    # calc(var(--radius) * 1.8) — feature icon tiles
  3xl: 17.6px    # calc(var(--radius) * 2.2)
  4xl: 20.8px    # calc(var(--radius) * 2.6) — Badge (reads as a pill at h-5)
  full: 9999px   # rounded-full — avatars, status dots, progress tracks

# NO motion tokens are declared anywhere in the token layer. These are the
# Tailwind defaults the app relies on implicitly. See "Known gaps".
motion:
  duration-default: 150ms        # Tailwind default for transition-colors / transition-all
  ease-default: cubic-bezier(0.4, 0, 0.2, 1)
  press: translateY(1px)         # active:translate-y-px — global on Button
  pulse: animate-pulse           # live/running indicators only

# ── Variant layers ──────────────────────────────────────────────────────────
variants:
  '.dark':
    description: >
      DECLARED BUT INERT. globals.css lines 85-117 redeclare 31 of the 32 :root tokens with
      BYTE-IDENTICAL values (only --radius is absent, so it inherits). Selecting .dark changes
      nothing. It is hardcoded permanently on <html> in src/app/layout.tsx line 19, and no
      ThemeProvider is mounted, so it can never be removed at runtime either.
      CONSEQUENCE — this is the entry an agent must not misread: the base :root palette here
      IS the dark palette. Adding a light mode means writing NEW values into :root and moving
      today's values into .dark, which is the inverse of the usual shadcn migration. Editing
      .dark alone will produce no visible change whatsoever.
    colors: {}   # intentionally empty — it overrides nothing
  '@custom-variant dark (&:is(.dark *))':
    description: >
      globals.css line 5. Registers the `dark:` Tailwind variant against the .dark class.
      Because .dark is always present on <html>, every `dark:` utility in the shadcn
      primitives (button, badge, card, …) is ALWAYS ACTIVE. Treat `dark:` classes in
      src/components/ui/** as unconditional, not conditional.
  '@media (prefers-reduced-motion: reduce)':
    description: >
      NOT IMPLEMENTED. No reduced-motion handling exists in globals.css or any component,
      including the animate-pulse live indicators and framer-motion. See "Known gaps".

# ── Components ──────────────────────────────────────────────────────────────
# Only components that exist in src/components/**. Bindings are read from the
# actual cva definitions, not inferred.
components:
  button-primary:
    source: src/components/ui/button.tsx — variant "default"
    background: '{colors.primary}'
    text: '{colors.primary-foreground}'
    typography: '{typography.body}'   # text-sm font-medium
    rounded: '{rounded.lg}'
    padding: h-8 px-2.5 gap-1.5 (default); h-9 (lg); h-7 (sm); h-6 (xs)
    states: >
      hover — bg-primary/80, links only ([a]:hover);
      focus-visible — border-ring + 3px ring-ring/50;
      active — translate-y-px (global press affordance on every variant);
      disabled — opacity-50 + pointer-events-none;
      invalid — aria-invalid:border-destructive + ring-destructive/40
  button-outline:
    source: src/components/ui/button.tsx — variant "outline"
    background: '{colors.input} at 30% (dark:bg-input/30 — always active)'
    border: '{colors.input}'
    states: hover — bg-input/50; aria-expanded — bg-muted
  button-secondary:
    background: '{colors.secondary}'
    text: '{colors.secondary-foreground}'
    states: hover — bg-secondary/80
  button-ghost:
    background: transparent
    states: hover — bg-muted/50 (dark variant, always active)
  button-destructive:
    background: '{colors.destructive} at 20% (dark:bg-destructive/20)'
    text: '{colors.destructive}'
    states: hover — bg-destructive/30; focus — ring-destructive/40
    note: A tinted destructive, NOT a solid red fill. Do not make it solid.
  card:
    source: src/components/ui/card.tsx
    background: '{colors.card}'
    text: '{colors.card-foreground}'
    border: ring-1 ring-foreground/10 — a RING, not a border; no box-shadow
    rounded: '{rounded.xl}'
    padding: py-4 with px-4 on header/content (py-3/px-3 at data-size="sm")
    typography: '{typography.body}'
    footer: border-t + bg-muted/50, flush to the card edge
  badge:
    source: src/components/ui/badge.tsx
    height: 20px (h-5), px-2, text-xs font-medium
    rounded: '{rounded.4xl}'
    variants: default = solid primary; secondary; destructive = destructive/20 tint; outline; ghost; link
  status-pill:
    source: >
      Not a component — a repeated inline convention across 8 dashboard pages
      (cto/quality, cto/review-queue, refer, projects/[id]/revisions, …).
      Rendered as <Badge className="bg-{hue}-500/10 text-{hue}-400 border-0">.
    pattern: 10% tinted background + 400-step text of the same hue, no border
    hues: >
      emerald = success / passed / live / completed;
      amber = warning / awaiting someone;
      red = failed / needs attention;
      blue = in progress / running (doubles as the brand hue);
      zinc = idle / pending / neutral
    note: >
      NO TOKEN EXISTS for emerald or amber. This convention is currently
      unrepresentable in tokens — see "Known gaps" before "fixing" it.
  sidebar:
    source: src/components/shared/sidebar.tsx
    width: 256px (w-64), fixed, full height; content offset by pl-64
    background: zinc-950 raw class — NOTE this contradicts {colors.sidebar} (#18181b)
    border: border-r {colors.border}
    item: rounded-lg px-3 py-2 text-sm, gap-3 to a 16px lucide icon
    states: >
      active (pathname match or prefix) — bg-zinc-800 + text-blue-400;
      idle — text-zinc-400;
      hover — text-zinc-50 + bg-zinc-900;
      transition-colors on all
  nav-marketing:
    source: src/app/page.tsx
    treatment: fixed, h-14, bg-zinc-950/80 + backdrop-blur-lg, border-b border-zinc-800/50
    note: The 50%-opacity hairline is the marketing-page border weight; dashboards use full-opacity.
```

---

## Overview

DevShop is an operator's console that happens to have a marketing front door. Both halves share
one visual idea: **a near-black page, cards that step up one shade, hairlines instead of shadows,
and exactly one blue.** Nothing glows, nothing floats. The product reads as instrumentation —
dense, calm, and legible at 12px — and the only thing allowed to be loud is status.

The palette is unusually disciplined for an app this size: the entire chrome is four zinc steps
(950/900/800 + 50 text) and one blue. Charts do not get a categorical rainbow — `chart-1..5` is a
monochrome blue ramp, which means series are distinguished by *value ordering*, not by hue. That
is a deliberate constraint and it is the fastest way to make this app look wrong if broken.

Defining characteristics:

- **Dark only.** There is no light mode and no way to reach one. See `variants: '.dark'`.
- **Surface ladder, not elevation.** `#09090b` page → `#18181b` card → `#27272a` inset. Shadows
  are reserved for *floating* overlays only — inline surfaces get zero.
- **Hairlines carry structure.** `border-zinc-800` is the second-most-used class in the repo (98
  uses). Marketing surfaces soften it to `/50`; dashboards keep it solid.
- **One accent.** `primary`, `accent`, `ring`, `sidebar-primary` and `chart-1` are all the same
  `#3b82f6`. Introducing a second brand hue would be a redesign, not a tweak.
- **12px is a first-class size.** `text-xs` (78 uses) outnumbers `text-sm` (61). Metadata,
  eyebrows and table cells live at 12px; do not bump them to 14px "for readability".
- **Status is tint, never fill.** `bg-{hue}-500/10 text-{hue}-400`. A solid `bg-emerald-500`
  badge would be off-system.

## Colors

**Brand & accent**

| Token | Value | For |
|---|---|---|
| `{colors.primary}` | **#3b82f6** | The primary CTA fill, the logo tile, active nav text, links |
| `{colors.accent}` | **#3b82f6** | Identical to primary — the token layer has no distinct accent |
| `{colors.ring}` | **#3b82f6** | Focus rings only, at `/50` opacity and 3px |
| `{colors.primary-foreground}` | **#fafafa** | Text on a primary fill |

The blue is reserved. It appears on: the primary CTA, the logo mark, the active sidebar item, the
focus ring, informational status pills, and chart series. It is **not** a decorative accent —
tinting a heading, an icon row, or a card border blue outside those cases dilutes the one signal
the interface has.

**Surface**

| Token | Value | For |
|---|---|---|
| `{colors.background}` | **#09090b** | The page canvas. Nothing sits behind it. |
| `{colors.card}` | **#18181b** | Any raised surface: cards, popovers, sidebar, menus |
| `{colors.secondary}` / `{colors.muted}` | **#27272a** | Insets *inside* a card: image wells, secondary buttons, table stripes |
| `{colors.border}` / `{colors.input}` | **#27272a** | Every hairline and every field edge |

Note that `muted`, `secondary`, `border` and `input` are all the same value. That is not sloppiness
to be corrected — a border and an inset reading as the same shade is what produces the flat,
instrument-panel feel. Do not split them apart to "add depth".

**Text**

| Token | Value | For |
|---|---|---|
| `{colors.foreground}` | **#fafafa** | Headings and primary body |
| `{colors.muted-foreground}` | **#a1a1aa** | Secondary text, labels, descriptions |

There is a **third, tokenless text tier** in heavy use: raw `text-zinc-500` (**#71717a**, 108 uses)
for tertiary metadata, and `text-zinc-600` (#52525b) for disabled/placeholder glyphs. See the
migration table under Compliance — these have no token and must not be swapped to
`muted-foreground`, which is two steps lighter.

**Semantic**

| Role | What the code uses | Token? |
|---|---|---|
| Danger / failed | `{colors.destructive}` **#ef4444** *and* raw `red-500/10 + red-400` | ✅ token exists |
| Success / live | raw `emerald-500/10 + emerald-400` (#10b981 / #34d399) | ❌ **no token** |
| Warning / awaiting | raw `amber-500/10 + amber-400` (#f59e0b / #fbbf24) | ❌ **no token** |
| In progress | raw `blue-500/10 + blue-400` | partial — `primary` is blue-500 |
| Idle / pending | raw `zinc-500/10 + zinc-400` | ❌ no token for zinc-500 |
| Agent role accent | raw `purple-600` / `purple-400` (CTO, git) | ❌ **no token**, not semantic |

`destructive` is the only semantic token the system has. Everything else is convention held in
feature code. This is the biggest structural gap in the token layer.

## Typography

**Families.** Geist (`--font-geist-sans` → `--font-sans`) for everything; Geist Mono
(`--font-geist-mono` → `--font-mono`) for identifiers — project IDs, deploy URLs, commit SHAs,
hex values, referral codes. Both are loaded via `next/font/google` in `src/app/layout.tsx`, so no
`@font-face` or fallback stack is declared. `html` gets `font-sans` globally.

| Role | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `hero` | 48 → 72px | 700 | -0.025em, lh 1.1 | Landing headline only, once |
| `section-title` | 30px | 700 | — | Marketing `<h2>`, centered, `mb-12` |
| `stat-value` | 30px | 700 | — | Big numbers; tinted by status hue |
| `page-title` | 24px | 700 | — | **Every** dashboard page `<h1>` — 25 identical uses |
| `card-title` | 16px | 500 | lh 1.375 | `CardTitle` default |
| `body` | 14px | 400 | — | Default paragraph and control text |
| `meta` | 12px | 400 | — | Table cells, captions, timestamps, descriptions |
| `eyebrow` | 12px | 500 | +0.05em, uppercase | Sidebar group labels ("CLIENT", "CTO") |

Principles:

- **Weight jumps, size doesn't.** Emphasis inside a block is `font-medium`/`font-semibold` at the
  same size, not a size step. The scale has no 20px or 18px rung in real use — going up means 24px.
- **Only the hero tightens tracking.** Everything else runs at default tracking; only the uppercase
  eyebrow opens up.
- **No tabular-numeral rule exists.** Stat columns currently use proportional figures. If a number
  column jitters, that is an open decision — see Known gaps.

## Layout

Spacing is the stock Tailwind 4px scale; no spacing tokens are declared. The rhythm that is
actually in use:

`gap-2 (8px)` inside a control → `gap-3 (12px)` for list rows → `gap-4 (16px)` for grid gutters and
card internals → `space-y-6 (24px)` between dashboard sections → `p-8 (32px)` page inset →
`py-20 (80px)` marketing bands.

**Containers.** Dashboard: full width inside `pl-64` (256px sidebar) with a `p-8` inset — no max
width, tables are meant to breathe. Marketing: centered `max-w-4xl` for prose/hero, `max-w-5xl` for
card grids, `max-w-6xl` for the nav and footer bar, always with `px-6`.

**Grids.** `grid-cols-1 md:grid-cols-{2,3,4}` with `gap-4` (tight card grids) or `gap-6` (pricing,
feature cards). There is exactly one breakpoint in play — `md`.

**Whitespace philosophy.** The dashboard is dense on purpose: 12–14px text, 8px control gaps,
`py-2` nav items. The marketing page is the opposite — 80px bands and a 32px gap under every
heading. Do not import dashboard density into marketing, or marketing air into the dashboard.

## Elevation & depth

**Shadow is reserved for things that float.** There is not a single `shadow-*` class in
`src/app/**` — zero across all 34 pages and layouts. The only real shadows in the repo are on
overlay primitives that leave the document flow: `popover.tsx` and `select.tsx` and
`dropdown-menu.tsx` at `shadow-md`, `dropdown-menu` submenus and `sheet.tsx` at `shadow-lg`.
(Five further `shadow-none` occurrences in `tabs`, `input-group` and `command` are
*suppressions*, not shadows — they strip an upstream default.)

So the rule is: **if it is anchored in the layout, lift is a surface step plus a hairline. If it
detaches and floats over content, it gets a shadow from its primitive and you write nothing.**

| Level | Treatment | Use |
|---|---|---|
| 0 | `bg-background` #09090b | Page, sidebar |
| 1 | `bg-card` #18181b + `ring-1 ring-foreground/10`, **no shadow** | Cards |
| 2 | `bg-muted` #27272a | Insets inside a card: wells, secondary buttons, empty media slots |
| Floating | `bg-popover` + `shadow-md` / `shadow-lg` | Popover, select, dropdown, sheet — handled by the primitive |
| Overlay bar | `bg-background/80` + `backdrop-blur-lg` + `border-b` | Fixed marketing nav |

`Card` uses a `ring-1`, not a `border` — so a `border-*` class on a `Card` stacks a second edge on
top of the ring instead of replacing it. Override the ring, or accept the double line.

## Components

See the `components:` block above for exact token bindings. The rules that matter:

- **Button** — every variant gets `active:translate-y-px`. The press affordance is global; do not
  add a scale or a shadow on press. `destructive` is a *tint* (`/20` fill, colored text), never a
  solid red button.
- **Card** — vertical flex with `gap-4`; padding lives on `CardHeader`/`CardContent`, not on `Card`.
  `CardFooter` is flush, bordered on top, and filled `bg-muted/50`.
- **Badge** — 20px tall, `rounded-4xl`. The status-pill convention (`bg-{hue}-500/10` +
  `text-{hue}-400` + `border-0`) is layered on top of `variant="secondary"` or the default.
- **Sidebar** — active state is `bg-zinc-800 + text-blue-400`; it is the only place the accent
  colors *text* rather than a fill. Match on `pathname === href || pathname.startsWith(href + "/")`.
- **Live indicators** — a `h-1.5 w-1.5 rounded-full` dot in the hue, `animate-pulse` only when
  genuinely live/running.

**States that are undesigned.** There are no `loading.tsx`, `error.tsx` or `not-found.tsx` files
anywhere under `src/app` (0 of each). `Skeleton` is imported once — `dashboard/page.tsx:5` — and
never rendered; it is a dead import, not a pattern. There are no empty states, because every list
renders a hardcoded mock array that is never empty. Treat all four as unspecified.

## Do's and don'ts

**Do**

- Use the shadcn token classes (`bg-card`, `text-muted-foreground`, `border-border`,
  `bg-primary`) for anything the token layer covers.
- Express lift as a surface step + hairline. Keep the shadow count at zero.
- Keep the status convention `bg-{hue}-500/10 text-{hue}-400 border-0`, with the documented hue→
  meaning mapping.
- Keep dashboard page titles at exactly `text-2xl font-bold`. 25 pages already agree; the 26th
  should too.
- Put a change that a scoped variant needs inside that variant.

**Don't**

- **Don't blind-swap `text-zinc-500` → `text-muted-foreground`.** zinc-500 is #71717a;
  `muted-foreground` is zinc-400 #a1a1aa. That would lighten 108 call sites. Same trap for
  `border-zinc-700` and `text-zinc-600` — no token matches them.
- **Don't blind-swap `bg-blue-600` → `bg-primary`.** The de-facto CTA is blue-600 (#2563eb, 28
  uses); `primary` is blue-500 (#3b82f6). Substituting lightens every CTA in the product. Either
  accept the shift deliberately or leave the class.
- **Don't add a new raw Tailwind palette class.** The Compliance gate below fails on an increase
  over 494.
- **Don't edit `.dark` expecting a visual change.** It is byte-identical to `:root`. See
  `variants`.
- **Don't give charts a categorical palette.** `chart-1..5` is a deliberate monochrome blue ramp.
- **Don't introduce a second brand hue.** Purple currently appears only as a per-agent role accent
  (CTO, git) and is not part of the system.
- **Don't add a `shadow-*` class to an anchored surface.** Cards, panels, headers and rows use a
  surface step plus a hairline. Floating overlays already get their shadow from the primitive.

## Responsive behavior

One breakpoint is in real use: **`md` (768px)**. Below it the marketing nav's center links hide
(`hidden md:flex`) — the CTA and logo never hide. All grids collapse to `grid-cols-1`. The hero
drops from 72px to 48px.

**The dashboard has no mobile treatment.** `src/app/(dashboard)/layout.tsx` applies a fixed
`w-64` sidebar and an unconditional `pl-64` with no breakpoint and no drawer, so every dashboard
page is horizontally squeezed below ~1024px. This is a known, unhandled state — see Known gaps.

Touch targets: the default `Button` is `h-8` (32px), below the 44px iOS minimum. Sidebar items are
`py-2 + text-sm` ≈ 36px. No touch-target rule has been established.

---

## Token source of truth

| | |
|---|---|
| **Authoritative file** | `src/app/globals.css` — 103 CSS custom properties (40 in `@theme inline`, 32 in `:root`, 31 in `.dark`) |
| **This file's role** | Derived. Regenerate with `/vzt-ui extract` after changing the source. |
| **Consumers** | `src/components/ui/**` (26 shadcn primitives — token-driven), `src/components/shared/sidebar.tsx` and `src/app/**` (largely raw-palette, see Compliance) |
| **Derived artifacts** | None. There is no mobile app, no second theme file, and no `tailwind.config.*` — Tailwind v4 config lives entirely in the `@theme` block. |
| **Config** | `components.json` — style `base-nova`, baseColor `neutral`, cssVariables `true`, icons `lucide`, primitives on `@base-ui/react` |

Direction of derivation: `:root` declares the raw values → `@theme inline` maps them onto Tailwind
color/radius utilities → primitives consume the utilities. **Nothing is hand-mirrored**, so there
is no parity check to run. The one thing that must never be hand-edited into divergence is the
`@theme inline` block: each entry is a pure alias (`--color-card: var(--card)`), and hardcoding a
value there would silently decouple the utility from the token.

Two places bypass the token layer and are worth knowing about:

- `src/app/layout.tsx:20` — `<body className="… bg-zinc-950 text-zinc-50">` duplicates the
  `body { background: var(--background) }` rule in `globals.css`. The values agree today, so
  changing `--background` alone will **not** change the page background.
- `src/components/shared/sidebar.tsx:31` — the sidebar renders `bg-zinc-950` while
  `--sidebar` is `#18181b`. The `sidebar-*` token family is declared but effectively unused.

## Compliance

Run from the repo root. Baseline-and-ratchet: fail on an **increase**, not on non-zero.

```bash
# Gate 1 — raw Tailwind palette classes in feature code. The primary check:
# high signal, effectively zero false positives.
grep -rInE '\b(bg|text|border|ring|from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b' src --include='*.tsx' | wc -l
# BASELINE: 494   ← fails if this number goes UP   (measured 2026-07-30)

# Gate 2 — raw hex in feature code. Secondary, and MUST be filtered.
#   var(--token, #hex)  CSS custom-property fallbacks are the CORRECT defensive
#                       pattern — an unfiltered hex rule flags the best code in
#                       the repo and gets switched off within a week.
#   comments, tests     Not shipped styling.
grep -rInE '#[0-9a-fA-F]{6}\b' src --include='*.tsx' --include='*.ts' \
  | grep -v 'var(--' | grep -vE '^\s*//|/\*' \
  | grep -vE '\.test\.|\.spec\.' | wc -l
# BASELINE: 7   ← fails if this number goes UP   (measured 2026-07-30)
# All 7 are currently defensible: 2 Clerk `appearance.variables.colorPrimary`
# (a third-party API that takes a hex, not a CSS var), 4 white-label color-picker
# defaults, 1 useState seed for a user-chosen brand color.

# Gate 3 — repo-specific: no shadow in FEATURE code. Anchored surfaces express
# depth as a surface step plus a hairline; only floating overlay primitives get
# a shadow, and they already carry their own. Scoped to src/app deliberately —
# running it across src/components/ui would flag the 6 legitimate overlay
# shadows in popover/select/dropdown-menu/sheet and get switched off.
grep -rInE '\bshadow-(sm|md|lg|xl|2xl|inner)\b' src/app --include='*.tsx' | wc -l
# BASELINE: 0   ← this one is fail-on-nonzero   (measured 2026-07-30)
```

**Gate 1 migration map** — the 494 are not noise; the token layer *is* the Tailwind zinc/blue
scale, so most have an exact, zero-visual-change replacement. Substitute only from this table:

| Raw class | Uses | Replacement | Safe? |
|---|---:|---|---|
| `border-zinc-800` | 98 | `border-border` | ✅ exact (#27272a) |
| `bg-zinc-900` | 74 | `bg-card` | ✅ exact (#18181b) |
| `bg-zinc-800` | 50 | `bg-muted` / `bg-secondary` | ✅ exact (#27272a) |
| `bg-zinc-950` | 10 | `bg-background` | ✅ exact (#09090b) |
| `text-zinc-400` | 76 | `text-muted-foreground` | ✅ exact (#a1a1aa) |
| `text-zinc-50` | 7 | `text-foreground` | ✅ exact (#fafafa) |
| `text-zinc-500` | **108** | — | ❌ **no token** (#71717a). Leave it. |
| `border-zinc-700` | **51** | — | ❌ no token (#3f3f46). Leave it. |
| `text-zinc-600` | 12 | — | ❌ no token (#52525b). Leave it. |
| `bg-blue-600` | 28 | `bg-primary` | ⚠️ **shifts** blue-600 → blue-500. Deliberate call only. |
| `text-blue-400` | 26 | — | ❌ no token (#60a5fa; `chart-2` holds it, wrong role) |
| emerald / amber / purple | 57 | — | ❌ no tokens exist |

Caveat: Tailwind v4 ships its default palette in OKLCH, while these tokens are hex. The pairs above
match the v3 hex values exactly and are visually identical, but not bit-identical — eyeball the
first batch of substitutions once before doing the rest in bulk.

## Known gaps

Ask rather than invent when a change touches any of these.

1. **No light mode, and the usual escape hatch is wired backwards.** `.dark` duplicates `:root`
   byte-for-byte and is hardcoded on `<html>` with no `ThemeProvider` mounted. Building a light
   theme means rewriting `:root` and demoting today's values into `.dark` — not the normal shadcn
   direction. Related: `src/components/ui/sonner.tsx` calls `useTheme()` from `next-themes` with
   no provider above it, so toasts always resolve `theme = "system"` and can render light on a
   dark app. That is a live bug, not a style choice.

2. **No success / warning / info tokens.** `destructive` is the only semantic token. Emerald,
   amber and purple exist only as raw classes across 8 dashboard pages, so "use tokens only" is
   currently *impossible* for status UI. Adding `--success` / `--warning` / `--info` is a token-
   layer change and an `extract`-tier decision — do not invent them inline.

3. **The dashboard has no responsive treatment at all.** Unconditional `w-64` sidebar + `pl-64`
   with no breakpoint, no drawer, no collapse. Every dashboard page breaks below ~1024px. No
   mobile design exists to follow.

4. **Loading, empty, and error states are undesigned.** Zero `loading.tsx` / `error.tsx` /
   `not-found.tsx` files; `Skeleton` is imported in `dashboard/page.tsx:5` and never rendered.
   Every list is backed by a non-empty mock array, so these states have never been seen, let
   alone styled.

5. **No motion tokens and no reduced-motion support.** Durations and easings are Tailwind
   defaults; `framer-motion` is a dependency; `animate-pulse` runs on live indicators. Nothing
   honours `prefers-reduced-motion`.

6. **No form-error styling beyond `aria-invalid`.** The primitives style the invalid ring, but
   there is no documented error-message treatment, no helper-text rule, and no required-field
   marker.

7. **No focus-visible rule outside the primitives.** `globals.css` sets a global
   `outline-ring/50`, but raw `<Link>`/`<a>` elements in `page.tsx` and `sidebar.tsx` rely on it
   implicitly and have never been keyboard-tested.

8. **Contrast is unverified.** `text-zinc-500` (#71717a) on `bg-zinc-900` (#18181b) is the most
   common text pairing in the app and sits near the WCAG AA 4.5:1 line for body text. No a11y
   audit has been run; no contrast gate is wired.

9. **Two token families are declared but unused.** The whole `sidebar-*` group (8 tokens) and
   `chart-1..5` (5 tokens) have no consumer — the sidebar uses raw zinc, and no chart component
   exists despite `recharts` being installed. Whether they are aspirational or dead is unresolved.

10. **`bg-blue-600` vs `--primary: blue-500`.** The shipped CTA is one step darker than the token
    claims. Which one is the real brand blue has never been decided; both are load-bearing today.
