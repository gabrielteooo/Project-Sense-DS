# Design tab template

The **Button** Design tab (`115:606`) is the reference implementation. New components follow the same **section order** and block kinds.

## Canonical outline

| # | Section | Level | Block kind | Content |
| --- | --- | --- | --- | --- |
| 1 | **Anatomy** | H2 | `anatomy` | PNG + legend (or `figureDemoId` for coded figure) |
| 2 | **Configuration** | H2 | `controlledExample` | Interactive matrix / props demo |
| 3 | **Specification** | H2 | `sectionGroup` | Container for H3 subsections below |
| 3a | Colour | H3 | `controlledExample` | Token/state colour demo + spec table |
| 3b | Structure | H3 | `controlledExample` | Diagram (PNG in demo) + spec table |
| 3c | *Component-specific* | H3 | `figureTable` or `controlledExample` | **Optional.** e.g. Button Group for Button; omit if N/A |
| 3d | Size | H3 | `controlledExample` | Size diagram + dimension table |
| 3e | Typography | H3 | `controlledExample` | Type spec table (often table-only) |

Reference JSON: [`../components/button.json`](../components/button.json) → `designTab`.

Copy skeleton: [`_template.designTab.json`](./_template.designTab.json) into `content/components/<slug>.json` under `"designTab"`. Replace `COMPONENT_SLUG`, Figma node IDs, copy, image paths, and `demoId` values.

## Assets

- Per-component PNGs: `public/components/<slug>/` → served as `/components/<slug>/...`
- Add cache-bust query on figures when re-exporting: `?v=YYYYMMDDhhmm`
- Record Figma frame/table node IDs in repo root [`FIGMA.md`](../../../FIGMA.md)

## Demos (React)

JSON only **references** behaviour via `demoId`. Implement demos in:

`src/components/design-tab/demos/designTabDemoRegistry.tsx`

Naming: `<slug>-design-<section>` (e.g. `button-design-colour`, `dropdown-design-structure`).

Typical demo building blocks:

- Spec tables: `*SpecTable.tsx` + `*Spec.ts` data (from Figma tables)
- Configuration / colour: preview panel + controls (see Button demos)

## Section kinds (schema)

Types: `src/types/designTab.ts`

- **`anatomy`** — `figure` or `figureDemoId`, `legend[]`
- **`controlledExample`** — `demoId`, optional `description`
- **`sectionGroup`** — `children[]` (H3 subsections only)
- **`figureTable`** — optional `description`, `figure`, size toggles / `tablesBySize` when needed; use for image-led specs without a custom demo

## Wiring a new component

1. Merge `_template.designTab.json` into `content/components/<slug>.json`.
2. Export images from Figma; drop under `public/components/<slug>/`.
3. Add demos + registry entries for each `demoId`.
4. Point the component Design tab at `DesignTabPage` + a loader (see `loadButtonDesignTab.ts` pattern).
5. Document Figma nodes in `FIGMA.md`.

Full Figma → repo notes: [component-doc-from-figma.md](../../docs/source/component-doc-from-figma.md).
