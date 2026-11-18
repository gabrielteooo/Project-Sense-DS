# Component: Badge

Status: `in review`  
Catalog id: `badge`  
Public export: `FmsBadge`

## References

| Source | Location |
| --- | --- |
| Figma — Badge set | [`399:66`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=399-66) — `*Badge* / Basic` |
| Tokens | `tokens/dist/components/badge.resolved.json` |
| Code | `packages/fms-ui/src/badge/` |
| Code Connect | `packages/fms-ui/src/badge/FmsBadge.figma.ts` → Figma `399:66` |
| Storybook | `Components/Badge` |

Review: not reviewed.

## Use cases

- Show a **numeric count** (unread messages, new alerts) on an icon, avatar, or control.
- Show a **dot** when presence matters but the exact count is not needed.
- Prefer **`colorVariant="default"`** (red) for urgent/unread notification counts; **`primary`** for informational teal counts aligned with brand.
- Do **not** use raw `antd` `Badge` in product screens.

## Figma → code properties

| Figma property / variant | Code prop | Values | Ant mapping |
| --- | --- | --- | --- |
| Colour=Default | `colorVariant` | `default` (default) | Error fill + white count text (Ant default count) |
| Colour=Primary | `colorVariant` | `primary` | `colorPrimaryBg` `#C7EBEA` fill, `colorPrimary` `#00636A` count text |
| Type=Base | `size` | `base` (default) | `size="default"` — indicator 20px, 14px label |
| Type=Small | `size` | `small` | `size="small"` — indicator 16px, 8px label (weight 400, centered) |
| Type=Dot | `dot` | `true` | `dot` — 8px dot |
| Type=Base 99+ / Small 99+ | `count` + `overflowCount` | e.g. `count={120}`, `overflowCount={99}` | Ant overflow (`99+`) |
| (wrapper target) | `children` | icon, avatar, button | Ant offset positioning on child |

Numeric count: pass `count`. Standalone pill (no anchor): omit `children`.

## States and behaviour

| State | Figma | Code | Notes |
| --- | --- | --- | --- |
| Default count | Base / Small | `count` | White border on default (Ant) |
| Zero | — | `showZero` | Ant `showZero`; off by default |
| Dot | Dot | `dot` | No `count` when dot; primary dot uses `colorPrimaryBg` fill + 1px `colorPrimary` border |
| Overflow | 99+ | `overflowCount` (default `99`) | |

Native / Ant behaviour to **keep**: count animation on change, offset when wrapping `children`, `title` tooltip on truncated counts.

Behaviour that **differs** from Ant defaults: Figma **Primary** colour uses light teal fill (`colorPrimaryBg`) rather than error red; count text uses **font-weight 400** with centered alignment on small indicators.

## Public import

```tsx
import { FmsBadge } from '@fms/ui';
```

## Usage examples

Notification icon (small count, default/red):

```tsx
import { FmsBadge, FmsIconFrame } from '@fms/ui';

<FmsBadge count={12} size="small" colorVariant="default">
  <FmsIconFrame name="bell" type="regular" size={16} tone="inherit" />
</FmsBadge>
```

Standalone overflow pill:

```tsx
<FmsBadge count={120} size="base" colorVariant="default" />
```

Primary dot on an icon:

```tsx
<FmsBadge dot colorVariant="primary" size="small">
  <FmsIconFrame name="envelope" type="regular" size={16} />
</FmsBadge>
```

## Token exceptions

See [token-mapping.md](../token-mapping.md) — Badge row. Component tokens set in `antdTheme.components.Badge` from `badge.resolved.json` (`indicatorHeight` 20, `indicatorHeightSM` 16, `dotSize` 8, `textFontSize` 14, `textFontSizeSM` 8). Primary variant: background `colorPrimaryBg` **`#C7EBEA`** (`tokens/dist/foundation/colors.resolved.json`), count text `colorPrimary` **`#00636A`** (`tokens/dist/antd/theme.json` seed).

## Open questions

- [ ] Whether product should expose Ant `offset` / `classNames.indicator` on the public API or keep them passthrough-only (currently passthrough via `...rest`).
- [x] Code Connect published to Figma `399:66` (`FmsBadge.figma.ts` → all variants). Re-run `npm run figma:connect:publish` after template edits (`FIGMA_ACCESS_TOKEN`).