# Component: Breadcrumbs

Status: `ready`  
Catalog id: `breadcrumbs`  
Public export: `FmsBreadcrumbs`, `FmsBreadcrumbLink`

## References

| Source | Location |
| --- | --- |
| Figma — Breadcrumb set | [`446:26123`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=446-26123) — variant `376:10879` Type=Basic |
| Figma — Breadcrumb Link | [`376:10769`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=376-10769) |
| Figma — Breadcrumb Separator | [`358:3583`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=358-3583) |
| Tokens | `tokens/dist/components/breadcrumb.resolved.json` |
| Code | `packages/fms-ui/src/breadcrumbs/` |
| Storybook | `Components/Breadcrumbs` |

Review: **Approved** (design sign-off).

## Use cases

- Show hierarchy and support in-app navigation (e.g. Home → Section → Current page).
- Use on content pages under the header; last segment is **current** (not a link).
- **2nd (and 3rd) positions** use the same **Breadcrumb Link** primitive as other links (no separate ellipsis variant in the published Figma set).
- Optional home leading icon via `icon` + `iconName` on the first item.
- Do **not** use raw `antd` `Breadcrumb` in product screens.

## Figma → code properties

| Figma | Code | Notes |
| --- | --- | --- |
| Breadcrumb Link — Text | `item.label` / `FmsBreadcrumbLink` `label` | |
| Icon + Icon Name | `icon`, `iconName` | `FmsIconFrame` 14px, `tone="inherit"` |
| State=Default / Hover | `href` on item | Hover via Ant + `colorBgTextHover` |
| State=Current | `current: true` or last item without `href` | |
| 2nd breadcrumb link slot | Same as other links — `items[1]` with `href` | Figma layer name only; not a different component |
| Breadcrumb Separator `/` | `separator` (default `'/'`) | |
| Type=Basic | `FIGMA_BASIC_BREADCRUMB_ITEMS` / Storybook **Figma Basic** | Reference composition |

## States and behaviour

| State | Figma | Code | Notes |
| --- | --- | --- | --- |
| Link | Default / Hover | `<a href>` | 14px; `rgba(0,0,0,0.88)` |
| Hover | Hover | CSS | `colorBgTextHover` pill |
| Current | Current | last item | `rgba(0,0,0,0.55)` |
| Separator | `/` | `separator` | `rgba(0,0,0,0.55)` |

`FmsBreadcrumbLink` is for Dev Mode / Storybook preview of one segment. Product pages should use `FmsBreadcrumbs` `items` (Ant renders anchors).

## Public import

```tsx
import { FmsBreadcrumbs } from '@fms/ui';
```

## Usage examples

Figma **Type=Basic** (includes **2nd breadcrumb link**):

```tsx
import { FmsBreadcrumbs } from '@fms/ui';

<FmsBreadcrumbs
  items={[
    { label: 'Home', href: '/', icon: true, iconName: 'house' },
    { label: 'Breadcrumb Link', href: '/section' },
    { label: 'Breadcrumb Link', href: '/section/page' },
    { label: 'Breadcrumb Link', current: true },
  ]}
/>
```

## Token exceptions

See [token-mapping.md](../token-mapping.md) — `antdTheme.components.Breadcrumb`.

## Resolved decisions

| Topic | Decision |
| --- | --- |
| 2nd breadcrumb link | Standard **Breadcrumb Link** (`376:10769`); ellipsis/menu not in published Figma set — hold until design adds a truncated variant. |
| Handbook | No handbook spec changes until explicitly requested. |
| Code Connect | `446:26123` → `FmsBreadcrumbs`; `376:10769` → `FmsBreadcrumbLink`; `358:3583` separator nestable (`npm run figma:connect:publish`). |