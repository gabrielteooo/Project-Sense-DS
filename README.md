# FMS DS Handbook

Design tokens and the **FMS Design System Handbook** site (React/Vite), aligned to Figma file `6kT7I28zU5LC7cedwE87Ce`.

Local clone folder name: **`FMS DS Handbook`**.

## Repository layout

| Path | Purpose |
| --- | --- |
| `tokens/` | Source design tokens and generated `dist/` (CSS, resolved JSON). Served as Vite `publicDir` for the handbook. |
| `scripts/` | Token and handbook content build scripts (`npm run tokens:build`). |
| `handbook/` | Handbook app — see [handbook/README.md](./handbook/README.md). |

## Commands

```bash
npm run tokens:build   # Regenerate token outputs from tokens/source
npm run handbook:dev   # Local handbook at http://localhost:5173
npm run handbook:build # Production build → handbook/dist/ (gitignored)
```

## Deploy on Vercel

1. **Root Directory:** leave empty (repo root) *or* set to `handbook` — both include a `vercel.json`.
2. **Environment variable:** `FONTAWESOME_NPM_AUTH_TOKEN` — your [Font Awesome npm token](https://fontawesome.com/account/general) (required for `@awesome.me/kit` on install).
3. Redeploy after the variable is set. Output is `handbook/dist` (or `dist` when Root Directory is `handbook`).

Local Font Awesome auth: copy `handbook/.npmrc.example` to `handbook/.npmrc` (gitignored).

## Conventions

- **Page copy:** JSON under `handbook/content/` (imported in React pages).
- **Handbook images:** `handbook/public/` — import paths in page components (Vite `publicDir` is `tokens/`, not `handbook/public/`).
- **Figma exports (optional):** `handbook/figma-exports/` for PNG/spec drops when not using MCP.
- **Authoring notes:** `handbook/docs/source/` — non-runtime reference (e.g. colour copy drafts).
