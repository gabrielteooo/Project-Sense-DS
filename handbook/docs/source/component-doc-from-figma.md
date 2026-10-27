# Component documentation from Figma

Designers author in the shared Figma handbook template. After approval, implement in this repo: **`designTab` JSON** + **shared React layout**, with **interactive demos in a typed registry**.

## Design tab architecture

| Layer | Location |
| --- | --- |
| Layout | `src/components/design-tab/DesignTabPage.tsx` |
| Blocks | `blocks/` — section, figure, legend, preview panel, table |
| Demos | `demos/designTabDemoRegistry.tsx` — executable React only here |
| Content | `content/components/<slug>.json` → `designTab` |

### Section kinds

- **`anatomy`** — H2, figure (PNG or `figureDemoId`), legend list
- **`controlledExample`** — H2/H3, `demoId` (configuration, colour, …)
- **`sectionGroup`** — H2 wrapper with ordered H3 children
- **`figureTable`** (child) — optional description, size control, figure, table; omitted when empty

### Design tab template (all components)

Canonical outline — copy from `content/design-tab/_template.designTab.json` (reference: Button `designTab` in `button.json`).

| Order | Section | Kind |
| --- | --- | --- |
| 1 | Anatomy | `anatomy` |
| 2 | Configuration | `controlledExample` |
| 3 | Specification | `sectionGroup` |
| 3a | Colour | `controlledExample` |
| 3b | Structure | `controlledExample` |
| 3c | *Component-specific* | `figureTable` or `controlledExample` — **optional** (Button: Button Group) |
| 3d | Size | `controlledExample` |
| 3e | Typography | `controlledExample` |

**Assets:** `public/components/<slug>/` → `/components/<slug>/...`  
**Demos:** `demoId` = `<slug>-design-<section>` in `designTabDemoRegistry.tsx`  
**Figma nodes:** log frames/tables in `FIGMA.md`

### Button Design tab (`115:606`)

Pilot implementation of the template above. Configuration and Colour controls use **independent** React state. Colour table tokens resolve from `tokens/dist/components/button.resolved.json`.

## Usage / Updates

Unchanged on this pilot: `usage` + `ButtonUsageTab`, `updates` + `ComponentUpdatesTab`.

## Next component

1. Copy `content/design-tab/_template.designTab.json` into `content/components/<slug>.json` as `designTab` (or mirror `button.json` → `designTab`).  
2. Provide Figma link + PNG exports for Anatomy, Structure, Size, and any component-specific figure; Typography is often table-only.  
3. Register demos in `designTabDemoRegistry.tsx` for each `demoId`.  
4. Wire Design tab to `DesignTabPage` + loader (see `loadButtonDesignTab.ts`).  
5. Add Figma node IDs to `FIGMA.md`.
