# Component: Button

Status: `ready`  
Catalog id: `button`  
Public export: `FmsButton`

## References

| Source | Location |
| --- | --- |
| Figma (Project Sense Master Design System) | [Button set `376:26847`](https://www.figma.com/design/eQ5MZ0P3yMk6SMjGtfBbmS/Project-Sense-Master-Design-System?node-id=376-26847) — file `eQ5MZ0P3yMk6SMjGtfBbmS` |
| Handbook spec page | `/components/button` — file `6kT7I28zU5LC7cedwE87Ce`, node `115:606` |
| Handbook JSON | `handbook/content/components/button.json` |
| Token files | `tokens/dist/components/button.resolved.json` |
| Code | `packages/fms-ui/src/button/FmsButton.tsx` |
| Storybook | `Components/Button` |

Review: **Approved** (design sign-off).

## Use cases

- Trigger an operation (forms, dialogs, page actions).
- **Primary** — leading CTA; use sparingly.
- **Secondary** — supporting or alternative action (Cancel, extra filters).
- **Tertiary** — lower-priority optional action.
- **Link** — navigation or in-copy action (underlined).
- **Danger** — destructive actions (Delete, Reject).
- Do **not** use a raw `antd` `Button` or handbook `FmsDocButton` in product screens.

## Figma → code properties

Figma component properties on set `376:26847`: Type, Size, State, Content, Danger, Shape.

| Figma property / variant | Code prop | Values | Ant mapping |
| --- | --- | --- | --- |
| Type | `variant` | `primary` \| `secondary` \| `tertiary` \| `link` | `type="primary"` \| `"default"` \| `"text"` \| `"link"` |
| Size | `size` | `base` \| `small` \| `x-small` | `size="large"` (40) \| `"middle"` (32) \| `"small"` (24) |
| State = Default | *(CSS)* | — | default |
| State = Hover | *(CSS)* | — | `:hover` — do not pass a state prop |
| State = Pressed | *(CSS)* | — | `:active` |
| State = Disabled | `disabled` | `boolean` | `disabled` |
| Content = Basic | `children` | label | button text |
| Content = With icon | `icon` or `iconClass` + `children` | FA class or `ReactNode` | Ant `icon` + children. Figma exposes `icon` boolean on Basic variants |
| Content = Icon Only | `iconOnly` | `true` + `icon`/`iconClass` | Ant `icon` and no children; square hit area |
| Danger | `danger` | `boolean` | `danger` |
| Shape = Default | *(not exposed)* | Default only in this set | Ant default shape |
| Label | `children` | sentence case | — |

Defaults: `variant="primary"`, `size="base"`.

Also passed through from Ant: `loading`, `htmlType`, `href`, `onClick`, `block`, `className`. **`loading` is supported in product** (Ant spinner + `aria-busy`); it is handbook/Ant-only and is not a variant on Figma set `376:26847`.

## States and behaviour

| State | Figma | Code | Notes (a11y / Ant) |
| --- | --- | --- | --- |
| Default | State=Default | default | Primary fill `#00636A` |
| Hover | State=Hover | CSS | Primary hover `#008585`. Danger: primary fill `colorErrorHover` (`#FF7875`); secondary/tertiary/link label `colorErrorHover`; tertiary danger bg `colorErrorBg` (`#FFF1F0`) |
| Active / pressed | State=Pressed | CSS `:active` | Primary active `#005055`. Tertiary danger: bg `colorErrorBgHover` (`#FFCCC7`), text `colorErrorActive` (`#CF1322`) |
| Disabled | State=Disabled | `disabled` | Fill `#E4E4E4`, text `rgba(0,0,0,0.25)` |
| Loading | not in Figma set | `loading` | Ant spinner; `aria-busy` |
| Danger | Danger=True | `danger` | Error `#A8071A`, label white on primary |
| Focus | not drawn as a variant | `:focus-visible` | Keep Ant focus ring |

Native / Ant behaviour to **keep**: Tab, Enter/Space, `htmlType` for forms, `href` (renders `<a>`), disabled pointer-events, loading.

Behaviour that **differs** from Ant defaults:

- Default size is FMS **base / 40px** (`large`), not Ant middle / 32px.
- Figma names (`variant`, `size`) instead of Ant `type` / `size`.
- Tertiary label uses **primary teal**, not Ant text-button grey.
- Link is **always underlined** and hugs content (Figma base link is 24px tall, not 40).
- Ghost / dashed / circle are **not** published on this Figma set.

## Public import

```tsx
import { FmsButton } from '@fms/ui';
```

## Usage examples

```tsx
<FmsButton variant="primary" size="base" onClick={onSave}>
  Save
</FmsButton>

<FmsButton variant="secondary">Cancel</FmsButton>

<FmsButton variant="primary" danger>
  Delete
</FmsButton>

<FmsButton iconClass="fa-regular fa-pen">Edit</FmsButton>

<FmsButton iconOnly iconClass="fa-regular fa-magnifying-glass" aria-label="Search" />

<FmsButton variant="primary" loading>
  Saving…
</FmsButton>
```

## Token exceptions

See [token-mapping.md](../token-mapping.md) Button row: radius 8/6/4 by size, padding 16/12/8, disabled fill `#E4E4E4`, link `colorLink` = `colorPrimary`.

## Resolved decisions

| Topic | Decision |
| --- | --- |
| Corner radius (small / x-small) | Handbook table lists **8px / 6px**; Figma set uses **6px / 4px**. **`@fms/ui` and tokens follow Figma** until the handbook spec page is updated. |
| Tertiary padding (base) | Handbook **8px**; Figma **`paddingInlineLG` 16px**. **Follow Figma** in implementation. |
| x-small icon–label gap | Handbook **4px**; Figma **`marginXS` 8px**. **Follow Figma** in implementation. |
| Leading icon API | No third Figma **Content** value. **Basic** + Figma **`Icon`** boolean → `icon` or `iconClass` + `children`. **Icon Only** → `iconOnly` + icon + `aria-label`. |
| Shape | **Default** only in this set. Do **not** expose Ant `shape` (`circle` / `round`) until Figma publishes variants. |
| Loading | **Keep** Ant `loading` in product (documented in handbook; not on the Figma variant matrix). |
| Code Connect | `376:26847` → `FmsButton` via `packages/fms-ui/src/button/FmsButton.figma.ts` (`npm run figma:connect:publish` from repo root). |
| Font Awesome | Kit **`cb852485b6`** via `FmsThemeProvider`; product apps need FA npm auth for `@awesome.me/kit-cb852485b6`. |
