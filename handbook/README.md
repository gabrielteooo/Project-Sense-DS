# FMS Design System Handbook

Vite + React site for foundations and Get started guidelines.

## Layout

```
handbook/
├── content/          # Page content (JSON)
│   ├── foundation/
│   └── get-started/
├── public/           # Images and static assets (import in src/pages or components)
├── src/
│   ├── components/   # UI, shell, foundation tables
│   ├── config/       # Navigation
│   ├── content/      # TS loaders (e.g. getStartedDocs.ts)
│   ├── figma/        # metrics.ts, node IDs
│   └── pages/        # Route pages
├── docs/source/      # Authoring reference, not loaded by the app
└── figma-exports/    # Optional local Figma PNG/spec exports
```

## Figma workflow

- Node IDs: [FIGMA.md](./FIGMA.md)
- Implementation rules: [FIGMA_IMPLEMENTATION.md](./FIGMA_IMPLEMENTATION.md)

## Scripts

From repo root: `npm run handbook:dev` / `npm run handbook:build`.
