# `@fms/ui`

Product React library for the FMS design system (Ant Design 5 wrappers + theme).

Designers review components in **Storybook**. Product screens and Cursor agents import from `@fms/ui`. Agent instructions: repo-root [`AGENTS.md`](../../AGENTS.md).

## Setup

From the repository root. Font Awesome Kit **`cb852485b6`** is a dependency (`@awesome.me/kit-cb852485b6`). Copy `.npmrc.example` to `.npmrc` with your Font Awesome npm token, then:

```bash
npm install
npm run storybook          # http://localhost:6006
npm run fms-ui:typecheck
```

`FmsThemeProvider` loads the kit CSS (Pro Regular / Solid / Light). Use Figma class names such as `fa-regular fa-pen`.

If a Vite app fails to resolve `@awesome.me/kit-cb852485b6/icons/css/all.min.css`, alias it to that file in `node_modules` (Storybook does this in `.storybook/main.ts`).

## Public API

```tsx
import { FmsThemeProvider, FmsButton } from '@fms/ui';

<FmsThemeProvider>
  <FmsButton variant="primary" size="base">
    Save
  </FmsButton>
</FmsThemeProvider>
```

Storybook: **Components / Button**. Catalog: `src/componentCatalog.ts`. Remaining Phase 1 (Dropdown, Input, Side Menu Bar, Header Bar, App Shell) is still planned.

## Figma Code Connect

Button maps to [component set `376:26847`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=376-26847) via `src/button/FmsButton.figma.ts`. Badge maps to [`399:66`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=399-66) via `src/badge/FmsBadge.figma.ts`. After editing a template, publish from repo root (needs `FIGMA_ACCESS_TOKEN` or `--token`):

```bash
npx figma connect publish -c figma.config.json
```
