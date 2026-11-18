# FMS Design System — agent instructions

This repository holds **tokens**, the **handbook** (human docs), and **`@fms/ui`** (the product component library). Fresh chats: read this file, then the linked docs for the task type.

| Layer | Path | Who uses it |
| --- | --- | --- |
| Tokens | `tokens/` → `tokens/dist/` | Build input for handbook CSS and `@fms/ui` theme |
| Handbook site | `handbook/` | Designers, PMs, testers — **not** product UI |
| Product library | `packages/fms-ui` (`@fms/ui`) | Storybook review + Cursor screen builds |
| Agent notes | `docs/components/*.md` | Per-component contract once a wrapper exists |

**Figma sources**

- Product components: **Project Sense DS (original)** — what designers instance in product files.
- Handbook pages: file `6kT7I28zU5LC7cedwE87Ce` (docs site chrome and component spec pages).
- Do not implement from the unused ds-sandbox-storybook file.

**Do not** fork `ant-design`. **Do not** copy `FmsDocButton` or other handbook previews into products. **Do not** restyle Ant with global `.ant-*` CSS.

---

## Screen-building agents

Build product screens from a written brief or a Figma frame (Figma MCP). Use **approved `@fms/ui` components only** for anything in the catalog.

### Setup (every screen)

```tsx
import { FmsThemeProvider, FmsButton } from '@fms/ui';

export function App() {
  return <FmsThemeProvider>{/* routes / screens */}</FmsThemeProvider>;
}
```

Wrap the app **once**. `FmsThemeProvider` loads Font Awesome Kit `cb852485b6` (Pro CSS). Load Inter (400/500/600) the same way the handbook does (Google Fonts or equivalent). Icons: Font Awesome 6 class names from Figma (`fa-regular fa-pen`, not `@ant-design/icons`).

### Lookup: Figma name or UI need → code

Check `packages/fms-ui/src/componentCatalog.ts` (`FMS_COMPONENT_CATALOG`) and `docs/components/<id>.md`. Status **`planned`** means the wrapper is not ready — do **not** invent a parallel Button/Input/etc.

| UI need / Figma name | Component | Import | Status |
| --- | --- | --- | --- |
| Button | `FmsButton` | `import { FmsButton } from '@fms/ui'` | ready |
| icon frame | `FmsIconFrame` | `import { FmsIconFrame } from '@fms/ui'` | ready — `tone="inherit"` inside other `Fms*` |
| Breadcrumb | `FmsBreadcrumbs` | `import { FmsBreadcrumbs } from '@fms/ui'` | ready |
| Badge | `FmsBadge` | `import { FmsBadge } from '@fms/ui'` | in review |
| Dropdown | `FmsDropdown` | `import { FmsDropdown } from '@fms/ui'` | planned |
| Input | `FmsInput` | `import { FmsInput } from '@fms/ui'` | planned |
| Side Menu Bar | `FmsSideMenu` | `import { FmsSideMenu } from '@fms/ui'` | planned |
| Header Bar | `FmsHeaderBar` | `import { FmsHeaderBar } from '@fms/ui'` | planned |
| App Shell | `FmsAppShell` | `import { FmsAppShell } from '@fms/ui'` | planned |
| Theme / ConfigProvider | `FmsThemeProvider` | `import { FmsThemeProvider } from '@fms/ui'` | ready |

Usage example:

```tsx
import { FmsButton } from '@fms/ui';

<FmsButton variant="primary" size="base" onClick={onSave}>
  Save
</FmsButton>
```

Use **`in review` and `ready`** catalog entries. If status is **`planned`**, stop and name the missing entry — do not invent a substitute. Do not paste Figma MCP CSS as a new primitive. Do not use raw `antd` `Button` / `Input` / `Dropdown` / `Layout` for those slots.

### Figma MCP

1. List component instances on the frame (`get_design_context` / metadata).
2. Map each instance name to `FMS_COMPONENT_CATALOG` (figmaName).
3. Compose the screen from those imports. Use MCP measurements only for **page layout** (gaps, grid, placement), not to restyle an approved component.

---

## Component-building agents

Implement or update wrappers in `packages/fms-ui`. Designers review in Storybook.

### Workflow

1. Read `docs/antd-implementation.md` and `docs/token-mapping.md`.
2. Copy `docs/components/_template.md` → `docs/components/<id>.md`. Fill **Figma** references and **token** paths (`tokens/dist/components/<name>.resolved.json`, foundation tokens as needed).
3. Inspect **Project Sense DS (original)** for the component (MCP or Dev Mode). Use resolved tokens and Figma variant props as the spec source — **do not** block on or require handbook spec pages (`handbook/` is not maintained for new components yet).
4. Prefer, in order: **Ant seed tokens** (`antdTheme`) → **thin wrapper** mapping Figma props onto `antd` → **scoped styles** on the wrapper only.
5. Export from `packages/fms-ui/src/index.ts`. Set catalog `status` to `ready` and add a Storybook story under `Components/<Name>`.
6. Record token exceptions in the mapping table in `docs/token-mapping.md`.
7. Keep `tokens/dist/antd/theme.json` generated. Convert only in `packages/fms-ui/src/theme/antdTheme.ts`.

### Completion criteria

- Public import: `import { FmsX } from '@fms/ui'`.
- Storybook stories cover Figma variants, sizes, and states (including disabled / loading / danger when specified).
- Keyboard, focus, form, and Ant native behaviour still work unless the spec forbids them.
- `docs/components/<id>.md` has property mapping, use cases, and open questions.
- `npm run fms-ui:typecheck` and `npm run storybook` succeed.
- Do **not** update `handbook/` or `FmsDoc*` previews unless the task explicitly asks for handbook work.

Phase 1 order: **Button → Dropdown → Input → Side Menu Bar → Header Bar → App Shell**.

---

## Commands

```bash
npm install                 # workspace: @fms/ui (from repo root)
npm run storybook           # http://localhost:6006
npm run fms-ui:typecheck
npm run tokens:build        # after Figma token exports change
npm run handbook:dev        # handbook site (install in handbook/ first)
```

Further reading: [docs/antd-implementation.md](docs/antd-implementation.md), [docs/token-mapping.md](docs/token-mapping.md), [tokens/README.md](tokens/README.md).
