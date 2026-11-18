# Ant Design implementation rules

FMS product UI is **Ant Design 5** plus a thin `@fms/ui` layer. Do not fork [ant-design](https://github.com/ant-design/ant-design). Do not rebuild primitives as native HTML when Ant already provides them.

Handbook previews (`FmsDocButton`, CSS in `handbook/src/styles/handbook.css`) are for documentation only.

## When to use what

| Approach | Use when | Examples |
| --- | --- | --- |
| **Theme tokens** (`FmsThemeProvider` / `antdTheme`) | Colour, type, radius, control height, and other seed values should apply to **all** Ant components | `colorPrimary`, `fontFamily`, `controlHeightLG` |
| **Wrapper** (`FmsButton`, …) | Figma names, variants, or composition differ from Ant’s API, or you must lock a default | Figma `secondary` → Ant `type="default"`; Figma size `base` → Ant `size="large"` |
| **Scoped styles** | A spec pixel (padding, gap, min-width) cannot be expressed as an Ant token or wrapper prop | CSS module or `className` on the **wrapper root** only |

Try tokens first, then a wrapper, then the smallest scoped override. If a new global token would fix several components, add it in `packages/fms-ui/src/theme/antdTheme.ts` and document it in [token-mapping.md](token-mapping.md).

## What wrappers must preserve

Ant (and native) behaviour stays unless the approved Figma spec explicitly changes it:

- Keyboard: Tab, Enter/Space on buttons, arrow keys in menus, typeahead in selects
- Focus rings and `:focus-visible` (do not set `outline: none` without a replacement)
- Form integration: `htmlType`, `name`, `disabled`, `id`, label association
- Loading / disabled (no pointer events, announced busy state)
- Links: `href` / `target` when the Figma component is a link variant
- Overflow, truncation, and scrolling that Ant already handles (dropdowns, tables)

Do **not** disable Ant motion (`wave`, CSS-in-JS animations) unless the spec says so.

## What wrappers may change

- Prop names to match Figma (variant, size labels)
- Defaults (FMS default Button size is **base / 40px**, not Ant’s middle / 32px)
- Which Ant variants are **exposed** (hide dashed/ghost unless Figma publishes them)
- Icon slot: prefer Font Awesome 6 classes to match Figma; still accept `ReactNode` if products need it

## Scoped styles — allowed and forbidden

**Allowed**

- A class on the FMS wrapper (e.g. `.fms-btn`) targeting that root and its labelled children
- CSS modules colocated with the wrapper
- Ant `classNames` / `styles` props on the wrapped component

**Forbidden**

- Global rules on `.ant-btn`, `.ant-input`, `.ant-layout`, etc. in product CSS
- `!important` to fight Ant
- One-off colour/height hacks on a screen that should have been a wrapper prop
- Copying Figma MCP generated CSS into `global.css`

## Theme boundary

```tsx
import { FmsThemeProvider } from '@fms/ui';

<FmsThemeProvider>
  <App />
</FmsThemeProvider>
```

- One provider at the app (and Storybook preview) root.
- Do not wrap each page in a new `ConfigProvider` to tweak colour.
- Product-only extras (e.g. a Select selected-option fill used in one app) belong in that app’s `theme` override passed **into** `FmsThemeProvider`, not in a second provider.

## Icons and fonts

- Typeface: **Inter** 400 / 500 / 600. Consuming apps and Storybook must load the font; the theme only sets `fontFamily`.
- Icons: **Font Awesome 6 Pro** via kit `@awesome.me/kit-cb852485b6`. `FmsThemeProvider` imports `icons/css/all.min.css`. Use Figma class names (`fa-regular`, `fa-solid`, `fa-light`). Do not switch an approved component to `@ant-design/icons` unless the spec uses those glyphs. Install needs Font Awesome npm auth (`.npmrc.example`).
- CSS variables `--fms-*` from `tokens/dist/css/foundation.css` are available in Storybook; prefer Ant tokens inside wrappers unless a variable maps 1:1.

## Light mode

FMS ships **light mode only** until tokens and Figma include a dark theme.
