# Design tokens

## Source (Figma exports)

Drop updated exports in `tokens/source/`:

| File | Figma export |
|------|----------------|
| `foundation.tokens.json` | Variables (Light) |
| `effects.tokens.json` | Gradients, grids, effect styles |
| `textstyles.json` | Text styles JSON |

## Build

```bash
npm run tokens:build
```

This runs: **split → normalize effects → text styles → resolve aliases → CSS → Ant Design theme**.

## Output layout

| Path | Description |
|------|-------------|
| `tokens/foundation/` | Split W3C tokens (aliases preserved) |
| `tokens/components/` | One file per component group |
| `tokens/effects/` | Normalized shadows & gradients |
| `tokens/layout/` | Layout grids from effects export |
| `tokens/typography/` | Composite text styles |
| `tokens/dist/` | Resolved JSON, `css/foundation.css`, `antd/theme.json` |

Icons use **Font Awesome 6 Free** in generated CSS (`--ps-typography-font-icons`); Figma may still reference Pro in source.
