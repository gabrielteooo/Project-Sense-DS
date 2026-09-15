# Figma → handbook implementation guidelines

Use this document when implementing or updating handbook UI from Figma so the built result matches the design file, not an interpretation of it.

**Design file:** [FMS Design System Site](https://www.figma.com/design/6kT7I28zU5LC7cedwE87Ce/FMS-Design-System-Site) (`6kT7I28zU5LC7cedwE87Ce`)

**Related docs:** [FIGMA.md](./FIGMA.md) (node IDs), [tokens/README.md](../tokens/README.md) (token pipeline)

---

## Before coding

### 1. Inspect the existing codebase

| Area | Where to look |
|------|----------------|
| App shell (header, sidebar, layout) | `src/components/shell/` — `HandbookAppShell`, `HandbookGlobalHeader`, `HandbookMenu`, `HandbookPageHeader` |
| Foundation pages & patterns | `src/components/foundation/`, `src/pages/` |
| Routing & IA | `src/App.tsx`, `src/config/navigation.ts` |
| Global / component styles | `src/styles/handbook.css` |
| Layout numbers from Figma | `src/figma/metrics.ts` (`HANDBOOK_SHELL`, `FIGMA_NODES`) |
| Generated content (e.g. base colours) | `content/`, `@content` alias |
| Utilities | `src/utils/` |

**Stack:** Vite 6, React 18, React Router. No CSS-in-JS library — use `handbook.css` plus inline styles only when values come from `metrics.ts`.

**Design tokens in the browser:** Vite `publicDir` serves the repo `tokens/` folder. Foundation CSS loads as `/dist/css/foundation.css` (variables prefixed **`--fms-*`**). Prefer token variables over hard-coded hex when the token name matches Figma.

**Icons:** **Font Awesome 6 Free** (solid), via classes like `fa-solid fa-magnifying-glass`. Icon size token: `--fms-typography-font-size-icon` (14px). Do not substitute emojis or other icon sets unless Figma explicitly uses something else and it is exported into the repo.

**Scope:** Light mode only unless the file and product scope change.

**Build commands:**

```bash
npm run handbook:dev      # local preview
npm run handbook:build    # production build
npm run tokens:build      # after Figma token exports change
```

---

### 2. Read the selected Figma frame

Open the exact node (URL `node-id=` or ID in [FIGMA.md](./FIGMA.md)). In Dev Mode (or Figma MCP `get_design_context` when enabled), record:

- **Layout:** Frame hierarchy, auto-layout direction, alignment, distribution, constraints
- **Dimensions:** Width, height, min/max, hug/fill
- **Spacing:** Padding, gap, item spacing — copy **exact px** (or token-bound values)
- **Typography:** Family, size, weight, line height, letter spacing, paragraph spacing
- **Visual:** Fill/stroke colours (map to token names), border width, radius, shadows, opacity
- **Assets:** Icons, images, illustrations — export or reference the same asset; note component instances and variants
- **States:** Default, hover, pressed, selected, disabled, loading, error — only implement what Figma shows
- **Responsive:** Breakpoints and resize behaviour if defined

Add or update the node ID in `FIGMA.md` and `src/figma/metrics.ts` (`FIGMA_NODES`) when implementing a new component or frame.

---

### 3. Identify reusable project pieces

Before adding new files, check whether an existing piece already matches Figma:

| Pattern | Reuse |
|---------|--------|
| App chrome | `HandbookAppShell`, `HandbookGlobalHeader`, `HandbookMenu`, `HandbookMenuItem` |
| Page title block | `HandbookPageHeader` |
| Base colour table / swatch / contrast | `BaseColourTable`, `PreviewSwatch`, `ContrastBadge` |
| Buttons (e.g. tertiary icon) | `.handbook-btn`, `.handbook-btn--tertiary` in `handbook.css` |
| Nav structure | `HANDBOOK_NAV` in `navigation.ts` |
| Colour / spacing / type | `--fms-*` from `foundation.css`; component tokens in `tokens/dist/components/*.resolved.json` when needed |

Extract repeated Figma patterns into shared components under `src/components/` (group by `shell`, `foundation`, etc.) instead of duplicating markup.

---

### 4. State the implementation plan (required)

Before editing code, write a short plan (in the PR, chat, or task notes):

1. **Figma reference** — file key, node ID, link
2. **Files to touch** — list paths; avoid unrelated pages
3. **Reuse** — existing components/tokens
4. **New work** — new components, metrics keys, nav entries, token build
5. **Metrics** — values to add to `metrics.ts` from Dev Mode
6. **States** — which interaction states are in scope
7. **Verification** — how you will compare to Figma (frame overlay, checklist, viewport width e.g. 1440px)

Do not start coding until this plan is clear.

---

## Implementation requirements

- Reproduce the Figma frame **as closely as possible** at the target viewport (handbook default: **1440px** width in `HANDBOOK_VIEWPORT`).
- **Do not** redesign, simplify, or add UI that is not in Figma.
- **Do not** use approximate spacing or arbitrary values when exact Figma values are available — put them in `src/figma/metrics.ts` and reference them from components/CSS.
- **Do not** replace Figma icons or images with emojis, generic icons, or placeholders. Use FA only where Figma specifies FA; otherwise export assets to e.g. `handbook/public/` or `handbook/figma-exports/` and wire them in.
- **Preserve** project architecture: React components, router, `handbook.css` conventions, `--fms-*` tokens.
- **Reuse** existing components and tokens when they match; extend rather than fork.
- **Create** reusable components for repeated UI patterns (tables, menu rows, badges, etc.).
- **Use** semantic HTML (`header`, `nav`, `main`, `table`, `button`) and accessible names (`aria-label`, `aria-expanded`, visible text).
- **Use** Flexbox or Grid to mirror Figma auto-layout (row/column, gap, align-items, justify-content).
- **Do not** alter unrelated pages or components.
- **Match** text wrapping and truncation to Figma (e.g. `white-space`, `overflow`, `text-overflow`, max-width on containers).
- **Implement** all visible interaction states shown in Figma (hover, selected, disabled, loading, error, etc.) for the components you touch.

---

## Recommended workflow

1. **Tokens** — If Figma variables changed, export to `tokens/source/` and run `npm run tokens:build`. Use CSS variables in styles; do not hand-copy hex if a token exists.
2. **Metrics** — Add Dev Mode numbers to `HANDBOOK_SHELL` (or a frame-specific constant) in `metrics.ts`.
3. **Component** — Implement or update TSX; keep business logic thin; pass metrics via imports or CSS classes.
4. **Styles** — Prefer token-based rules in `handbook.css`; co-locate highly specific layout with the component only when necessary.
5. **Navigation** — Update `navigation.ts` only when IA matches Figma; keep labels and hierarchy in sync with the file.
6. **Verify** — Run `npm run handbook:dev`, open the route at 1440px width, compare side-by-side with Figma (same node, 100% or matching zoom).
7. **Document** — Update [FIGMA.md](./FIGMA.md) node table when IDs change.

---

## Token mapping cheat sheet

| Figma / Ant naming | CSS variable (examples) |
|--------------------|-------------------------|
| `colorBorder` | `--fms-colors-neutral-border-color-border` |
| `colorBgContainer` | `--fms-colors-neutral-bg-color-bg-container` |
| `colorBgLayout` | `--fms-colors-neutral-bg-color-bg-layout` |
| `colorText` | `--fms-colors-neutral-text-color-text` |
| `colorPrimary` | `--fms-colors-brand-primary-color-primary` |
| `colorPrimaryBg` | `--fms-colors-brand-primary-color-primary-bg` |
| Font size SM / LG | `--fms-typography-font-size-sm`, `--fms-typography-font-size-lg` |
| Line height SM / LG | `--fms-typography-line-height-sm`, `--fms-typography-line-height-lg` |
| Border radius | `--fms-border-radius-border-radius`, `--fms-border-radius-border-radius-sm` |

Component-level tokens (e.g. Button `textHoverBg`) live in resolved JSON under `tokens/dist/components/`; add corresponding CSS variables to the build pipeline only if the handbook needs them repeatedly.

---

## When Figma cannot be read

1. Confirm **Share → Anyone with the link → can view**.
2. Enable **Figma MCP** in Cursor and authenticate, or paste Dev Mode specs / PNGs into `handbook/figma-exports/`.
3. Do **not** guess missing values — leave a `TODO(figma)` in `metrics.ts` with the node ID and block pixel-perfect claims until specs exist.

---

## Implementation plan template (copy/paste)

```markdown
### Figma
- Link: 
- Node ID: 
- Viewport: 1440 × …

### Plan
- Reuse: 
- New/updated files: 
- metrics.ts additions: 
- States: default / hover / selected / …
- Out of scope: 

### Acceptance
- [ ] Layout matches auto-layout (gap, padding, alignment)
- [ ] Type matches (family, size, weight, line-height)
- [ ] Colours/borders/radii/shadows use tokens or documented Figma px
- [ ] Icons/assets match Figma
- [ ] A11y: semantics + labels
- [ ] No unrelated diffs
```
