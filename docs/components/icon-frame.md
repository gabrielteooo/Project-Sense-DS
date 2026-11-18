# Component: Icon frame

Status: `ready`  
Catalog id: `icon-frame`  
Public export: `FmsIconFrame`

## References

| Source | Location |
| --- | --- |
| Figma (Project Sense Master Design System) | [icon frame set `472:11122`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=472-11122) |
| Handbook | Foundations → Icons designer guide (`handbook/content/foundation/icons-designer-guide.json`) |
| Code | `packages/fms-ui/src/icon-frame/FmsIconFrame.tsx` |
| Storybook | `Components/Icon frame` |

Review: **Approved** (design sign-off).

## Use cases

- Standalone UI icons (toolbar, list rows, empty states) using Font Awesome 6 Pro from kit `cb852485b6`.
- Embedded in **Button**, alerts, modals, status chips — use `tone="inherit"` so the parent component sets colour.
- On **dark surfaces** (primary fills, teal headers): `tone="onDark"` (white).
- Do **not** use raw `<i class="fa-…">` in product when a catalog icon is expected; do **not** use `@ant-design/icons` for FMS glyphs.

## Figma → code properties

| Figma property | Code prop | Values | Notes |
| --- | --- | --- | --- |
| Type | `type` | `solid` \| `regular` \| `brand` | `fa-solid` / `fa-regular` / `fa-brands` |
| Icon name | `name` | FA glyph name | e.g. `envelope`, `magnifying-glass` |
| Brand icon name | `name` when `type="brand"` | brand glyph | e.g. `github` |
| Primary=False | `tone="default"` (or omit) | — | `colorIcon` |
| Primary=True | `tone="primary"` | — | `colorPrimary` (teal) |
| On dark surfaces | `tone="onDark"` | — | `colorTextLightSolid` (white) — set in product, not a Figma variant |
| Size | `size` | `12` \| `14` \| `16` | Px; omit inside parents so control height sets size |
| Hover (optional) | `hoverable` | `boolean` | Standalone: `colorIconHover` on hover (not on published set) |
| *(nested)* | `tone="inherit"` | — | Parent component sets colour |

Defaults: `type="regular"`, `tone="default"`, `hoverable={false}`.

Pass full classes with `iconClass` when the caller already has `fa-regular fa-pen`.

## States and behaviour

| State | Figma | Code | Notes |
| --- | --- | --- | --- |
| Default | — | `tone="default"` | `var(--ant-color-icon)` ≈ `rgba(0,0,0,0.55)` |
| Hover | Hover=True | `hoverable` | `var(--ant-color-icon-hover)` |
| On dark | White glyph in Figma | `tone="onDark"` | `var(--ant-color-text-light-solid)` |
| In parent | Parent fill/text | `tone="inherit"` | `color: inherit` — Button, Alert, etc. |
| A11y | — | `aria-label` on meaningful standalone icons | Decorative icons stay `aria-hidden` |

Size follows `fontSizeIcon` / `fontSize` Ant tokens (16px body context in Storybook).

## Public import

```tsx
import { FmsIconFrame, fmsIconClass } from '@fms/ui';
```

## Usage examples

```tsx
<FmsIconFrame name="bell" type="regular" aria-label="Notifications" />

<FmsIconFrame name="circle-check" type="solid" tone="onDark" />

<FmsButton icon={<FmsIconFrame name="pen" type="regular" tone="inherit" />}>Edit</FmsButton>

// Helper for Code Connect / dynamic name + type
const classes = fmsIconClass('regular', 'magnifying-glass'); // fa-regular fa-magnifying-glass
```

## Token exceptions

Seed additions in `scripts/build-antd-theme.mjs`: `colorIcon`, `colorIconHover`, `colorTextLightSolid`, `fontSizeIcon`. See [token-mapping.md](../token-mapping.md).

## Resolved decisions

| Topic | Decision |
| --- | --- |
| Kit | Font Awesome 6 Pro via `@awesome.me/kit-cb852485b6` (loaded in `FmsThemeProvider`) |
| Nesting | Always `tone="inherit"` inside other `@fms/ui` components that own colour |
| Code Connect | `472:11122` → `FmsIconFrame` via `FmsIconFrame.figma.ts` (`npm run figma:connect:publish`) |