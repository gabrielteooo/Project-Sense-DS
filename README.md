# FMS DS Handbook

Design tokens, the **FMS Design System Handbook** site (React/Vite), and the **`@fms/ui`** product component library (Ant Design 5). Handbook Figma file: `6kT7I28zU5LC7cedwE87Ce`. Product components follow **Project Sense DS (original)**.

Local clone folder name: **`FMS DS Handbook`**.

Cursor / agent instructions: **[AGENTS.md](./AGENTS.md)**.

## Repository layout

| Path | Purpose |
| --- | --- |
| `tokens/` | Source design tokens and generated `dist/` (CSS, resolved JSON). Served as Vite `publicDir` for the handbook. |
| `scripts/` | Token and handbook content build scripts (`npm run tokens:build`). |
| `handbook/` | Handbook app (designers / PMs / testers) — see [handbook/README.md](./handbook/README.md). |
| `packages/fms-ui` | Product library `@fms/ui` + Storybook. |
| `docs/` | Ant implementation rules, token mapping, per-component agent notes. |

## Commands

```bash
npm install                 # @fms/ui workspace (repo root)
npm run storybook           # Component review at http://localhost:6006
npm run fms-ui:typecheck
npm run tokens:build        # Regenerate token outputs from tokens/source
npm run handbook:dev        # Local handbook (run npm install in handbook/ first)
npm run handbook:build      # Production build → handbook/dist/ (gitignored)
```

## Deploy on Vercel

1. **Root Directory:** leave empty (repo root) *or* set to `handbook` — both include a `vercel.json`.
2. **Environment variable:** `FONTAWESOME_NPM_AUTH_TOKEN` — your [Font Awesome npm token](https://fontawesome.com/account/general) (required for `@awesome.me/kit` on install).
3. Redeploy after the variable is set. Output is `handbook/dist` (or `dist` when Root Directory is `handbook`).

Local Font Awesome auth (kit `cb852485b6`):

- **Handbook:** copy `handbook/.npmrc.example` → `handbook/.npmrc`
- **`@fms/ui` / Storybook:** copy `.npmrc.example` → `.npmrc` at the repo root, then `npm install`

Token: [Font Awesome npm token](https://fontawesome.com/account/general). `.npmrc` is gitignored.

## Conventions

- **Page copy:** JSON under `handbook/content/` (imported in React pages).
- **Handbook images:** `handbook/public/` — import paths in page components (Vite `publicDir` is `tokens/`, not `handbook/public/`).
- **Figma exports (optional):** `handbook/figma-exports/` for PNG/spec drops when not using MCP.
- **Authoring notes:** `handbook/docs/source/` — non-runtime reference (e.g. colour copy drafts).
