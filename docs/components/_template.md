# Component: \<Name\>

Status: `planned` | `in review` | `ready`  
Catalog id: \<id\>  
Public export: `FmsX`

## References

| Source | Location |
| --- | --- |
| Figma (Project Sense DS original) | file URL + component node id |
| Token files | `tokens/dist/components/<name>.resolved.json` (and `tokens/dist/foundation/*.resolved.json` if needed) |
| Code | `packages/fms-ui/src/...` |
| Storybook | `Components/<Name>` |

Review: designer sign-off date / link (or “not reviewed”).

## Use cases

- When to use this component (from Figma description / product context — 1–3 bullets).
- When **not** to use it (use a different catalog entry instead).

## Figma → code properties

| Figma property / variant | Code prop | Values | Ant mapping |
| --- | --- | --- | --- |
| e.g. Type | `variant` | `primary` \| `secondary` \| … | `type="primary"` \| `type="default"` \| … |
| Size | `size` | `base` \| `small` \| `x-small` | `large` \| `middle` \| `small` |

Default values: …

## States and behaviour

| State | Figma | Code | Notes (a11y / Ant) |
| --- | --- | --- | --- |
| Default | | | |
| Hover | | | Preserve Ant hover unless spec differs |
| Active / pressed | | | |
| Disabled | | `disabled` | |
| Loading | | `loading` | |
| Danger | | `danger` | |
| Focus | | | Keep visible focus ring |

Native / Ant behaviour to **keep**: keyboard, form attributes, …  
Behaviour that **differs** from Ant defaults: …

## Public import

```tsx
import { FmsX } from '@fms/ui';
```

## Usage examples

```tsx
<FmsX variant="primary" size="base">
  Label
</FmsX>
```

Add examples that match Figma samples or typical product patterns.

## Token exceptions

Link rows added in [token-mapping.md](../token-mapping.md) for this component (radius, padding, heights).

## Open questions

- [ ] Unresolved Figma vs Ant gaps
- [ ] Code Connect mapping (original library component → this export)