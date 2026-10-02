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

### Button Design tab (`115:606`)

1. Anatomy  
2. Configuration (`button-design-configuration`)  
3. Specification (group)  
   - Colour (`button-design-colour`) — independent controls; table from `tokens/dist/components/button.resolved.json`  
   - Structure — PNG per size when provided; else coded canvas fallback  
   - Button group — **optional**; add a `figureTable` child only when Figma includes it  
   - Size — diagram + dimension tables per size  

Configuration and Colour controls are **independent** (separate React state).

## Usage / Updates

Unchanged on this pilot: `usage` + `ButtonUsageTab`, `updates` + `ComponentUpdatesTab`.

## Next component

1. Copy `designTab` shape from `button.json` (or run a loader like `loadButtonDesignTab.ts` for your slug).  
2. Register demos in `designTabDemoRegistry.tsx`.  
3. Point `ButtonDesignTab`-style entry at `DesignTabPage` + your document loader.  
4. Export PNGs to `handbook/public/images/docs/` → `/images/docs/...`.
