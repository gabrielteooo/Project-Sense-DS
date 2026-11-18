# Token mapping

Verified path from Figma variables to runtime Ant Design styles. Add a row to the component table when a wrapper ships.

## Pipeline

```
Figma variables / text styles / effects
        │  export into tokens/source/
        ▼
npm run tokens:build          (scripts/tokens-build.mjs)
        │
        ├─ tokens/foundation/     split W3C (aliases kept)
        ├─ tokens/components/     per-component groups
        ├─ tokens/effects/        shadows, gradients
        ├─ tokens/typography/
        └─ tokens/dist/
              ├─ css/foundation.css     --fms-*  (handbook + Storybook)
              ├─ *.resolved.json
              └─ antd/theme.json        GENERATED — do not edit
                        │
                        ▼
         packages/fms-ui/src/theme/antdTheme.ts
              strip meta, convert seed, add control heights
                        │
                        ▼
         FmsThemeProvider → antd ConfigProvider
```

Sources: `tokens/source/foundation.tokens.json`, `effects.tokens.json`, `textstyles.json`.  
Builder: `scripts/build-antd-theme.mjs` writes `tokens/dist/antd/theme.json`.  
Runtime adapter: `packages/fms-ui/src/theme/antdTheme.ts`.

Handbook CSS uses `--fms-*` from `foundation.css`. Product Ant components use **ConfigProvider tokens**, not those CSS variables, unless a wrapper reads a `--fms-*` value on purpose.

## Generated `theme.json` vs ConfigProvider

`tokens/dist/antd/theme.json` is a **Figma-pixel seed** plus a `meta` object. Passing it straight into `ConfigProvider` is invalid / harmful:

| Issue | In generated file | Why it cannot be used as-is |
| --- | --- | --- |
| `meta` | `{ source, iconFontFamily, … }` | Not an Ant Design `ThemeConfig` key |
| `lineHeight` | `24` (px, from typography line height Base) | Ant seed `lineHeight` is a **unitless ratio**. Raw `24` would compute as `fontSize × 24` |
| `fontFamily` | `"Inter"` | Needs a system fallback stack |
| Control heights | omitted | FMS sizes live on `Size.Height.controlHeight*` in `tokens/dist/foundation/size.resolved.json` |

**Keep the generated file untouched.** Convert only in `antdTheme.ts`.

## Seed conversions (library-wide)

| Token | Source | Generated | Runtime (`antdTheme`) | Notes |
| --- | --- | --- | --- | --- |
| `colorPrimary` | Colors.Brand.Primary | `#00636A` | same | |
| `colorPrimaryBg` | Colors.Brand.Primary (`colors.resolved.json`) | — | `#C7EBEA` | Not on generated `theme.json` seed; added in `antdTheme.ts` for primary badges and other light-primary fills |
| `colorPrimaryHover` | same | `#008585` | same | Not a darkened `#004f55` |
| `colorPrimaryActive` | same | `#005055` | same | |
| `colorSuccess` | System.Success | `#509C22` | same | |
| `colorWarning` | System.Warning | `#D46B08` | same | |
| `colorError` | System.Error | `#A8071A` | same | |
| `colorErrorHover` | System.Error | `#FF7875` | same | Primary danger hover fill; secondary/tertiary/link danger hover text (Ant `Button`) |
| `colorErrorBg` | System.Error | `#FFF1F0` | same | Tertiary danger hover background (Ant `Button` text variant) |
| `colorErrorBgHover` | System.Error | `#FFCCC7` | same | Tertiary danger pressed background (`FmsButton` + Ant `colorErrorBgActive` seed alias) |
| `colorErrorBgActive` | System.Error (`colorErrorBgHover`) | `#FFCCC7` | same | Ant text-danger pressed fill; seeded from FMS error bg hover |
| `colorErrorActive` | System.Error | `#CF1322` | same | Danger pressed |
| `colorErrorBorderHover` | System.Error | `#F5222D` | same | Secondary danger hover border |
| `colorIcon` | Neutral.Icon | `rgba(0,0,0,0.55)` | same | `FmsIconFrame` default tone |
| `colorIconHover` | Neutral.Icon | `rgba(0,0,0,0.65)` | same | `FmsIconFrame` `hoverable` |
| `colorTextLightSolid` | Neutral.Text | `#FFFFFF` | same | `FmsIconFrame` `tone="onDark"` |
| `fontSizeIcon` | Typography.Font Size.Icon | `14` (seed) | same | Icon frame size (`--ant-font-size-icon`) |
| `colorInfo` | System.Info | `#0958D9` | same | |
| `colorText` | Neutral.Text | `rgba(0,0,0,0.88)` | same | |
| `colorBorder` | Neutral.Border | `#D9D9D9` | same | |
| `colorBgContainer` | Neutral.Bg | `#FFFFFF` | same | |
| `colorBgLayout` | Neutral.Bg | `#F5F5F5` | same | |
| `fontFamily` | Typography.Font.Inter | `Inter` | `Inter, -apple-system, BlinkMacSystemFont, sans-serif` | Apps must **load** Inter |
| `fontSize` | Typography.Font Size.Base | `16` | `16` | |
| `fontSizeSM` | SM | `14` | `14` | |
| `fontSizeLG` | LG | `20` | `20` (unverified on controls) | Ant’s default LG is ~16. Confirm against Button/Input in Storybook before changing |
| `lineHeight` | Line Height.Base | `24` (px) | `1.5` (`24 / 16`) | **Required conversion** |
| `borderRadius` | Border Radius.borderRadius | `6` | `6` | Button spec uses 8px on base/small — component override when `FmsButton` ships |
| `controlHeight` | Size.Height.controlHeight | — | `32` | Copied in `antdTheme.ts` (not imported) so the resolved JSON is not bundled. Ant `middle` / FMS **small** |
| `controlHeightLG` | Size.Height.controlHeightLG | — | `40` | Copied in `antdTheme.ts`. Ant `large` / FMS **base** |
| `controlHeightSM` | Size.Height.controlHeightSM | — | `24` | Copied in `antdTheme.ts`. Ant `small` / FMS **x-small** |
| `wireframe` | — | `false` | `false` | |
| `sizeUnit` / `sizeStep` | Size | `4` / `4` | same | |
| `lineWidth` | Size.Line Width | `1` | `1` | |
| `boxShadow*` | tokens/effects/shadows.json | CSS shadow strings | same | |
| `meta.iconFontFamily` | — | Font Awesome 6 Free | not passed to Ant | Documented for icon wrappers |

## Component-specific mappings

Fill in as each wrapper is implemented. Leave rows blank rather than guessing.

| Component | Figma / tokens | Ant token or prop | Conversion / exception | Status |
| --- | --- | --- | --- | --- |
| Button | Project Sense set `376:26847`; handbook `/components/button` | `FmsButton` → Ant `Button` | Size `base`→`large` 40, `small`→`middle` 32, `x-small`→`small` 24. Type `secondary`→`type="default"`, `tertiary`→`text`, `link`→`link`. Radius **8 / 6 / 4** (Figma `borderRadiusLG` / `borderRadius` / `borderRadiusSM`) — handbook table says 8 / 8 / 6. Padding inline **16 / 12 / 8**. Disabled bg `#E4E4E4`. `colorLink` = `colorPrimary`. Tertiary colour forced to primary teal via `.fmsBtn.ant-btn-text` (non-danger only). Danger hover uses seed `colorErrorHover` / `colorErrorBg` (Ant dangerous styles). Link hugs content + underline. `cssVar: true` so scoped CSS can use `--ant-color-*`. | ready |
| Icon frame | Figma `icon frame` `472:11122` | `FmsIconFrame` | FA kit glyph; `type` solid/regular/brand; `tone` default (`colorIcon`), onDark (`colorTextLightSolid`), inherit. `size` 12/14/16. Optional `hoverable` → `colorIconHover`. Button uses `FmsIconFrame` with `inherit`. | ready |
| Breadcrumbs | Figma `446:26123` | `FmsBreadcrumbs` → Ant `Breadcrumb` | 14px; link `rgba(0,0,0,0.88)`; current `0.55`; separator `/`; separator margin 8; hover bg Ant `colorBgTextHover`. Items use `FmsIconFrame` 14px when `icon` + `iconName`. | ready |
| Badge | Figma `399:66` `*Badge* / Basic` | `FmsBadge` → Ant `Badge` | `colorVariant` default → Ant error count; `primary` → fill `colorPrimaryBg` `#C7EBEA`, count `colorPrimary` `#00636A` (foundation + seed; scoped CSS on wrapper). Size `base`→Ant `default` (indicator 20px, 14px type); `small`→Ant `small` (16px, 8px, weight 400, centered). Dot 8px. `overflowCount` default 99. Component metrics from `tokens/dist/components/badge.resolved.json`. | in review |
| Dropdown | handbook Dropdown | | | planned |
| Input | | | | planned |
| Side Menu Bar | handbook shell nodes in `handbook/FIGMA.md` | | Product chrome may differ from handbook site chrome | planned |
| Header Bar | | | | planned |
| App Shell | | | | planned |

## Refreshing tokens

1. Drop new Figma exports in `tokens/source/`.
2. `npm run tokens:build`.
3. Do not edit `tokens/dist/antd/theme.json`.
4. If a new seed key appears, extend `antdTheme.ts` and add a row here.
5. Visual-check Storybook (Setup/Theme tokens, then each `Fms*` story).
