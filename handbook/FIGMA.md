# Figma access for pixel-accurate handbook

Design file: **6kT7I28zU5LC7cedwE87Ce** (FMS Design System Handbook)

| Component | Node |
|-----------|------|
| Handbook frame | `1:10873` |
| Colour Base Frame | `1:10452` |
| Colours — Overview | `91:1820` |
| Global header | `1:10878` |
| Global header bar | `1:10453` |
| Main content | `1:11212` |
| Header tabs | `1:12912` |
| Header tab | `1:12914` |
| Side menu bar (search + nav) | `1:12439` |
| Side menu | `151:2442` |
| hb-submenu-title (parent) | `1:10815` |
| hb-menu-item (child) | `150:2225` |
| menu-open (active child) | `151:2437` |
| Foundations side menu (Typography) | `62:21857` |
| Typography — Text system page | `62:21858` |
| Foundations — Overview (landing) | `136:12296` |
| Spacing — Overview | `91:539` |
| Spacing — Margin | `91:1117` |
| Spacing — Padding | `91:1701` |
| Icons — Overview | `92:8259` |
| Icons — Usage (Header frame) | `97:1041` |
| Icons — Designer guide | `97:1152` |
| Icons — Developer guide | *(handbook; implementation — see designer frame for Do/Don’t)* |
| Get started — Content Writing Guidelines | `100:2180` |
| Get started — Content formatting | `100:5465` |
| Get started — Numbers formatting | `101:5532` |
| Get started — Date time formatting | `101:5789` |
| Get started — Results formatting | `100:5465` |
| Get started — State persistence / Global filter | `135:10497` |
| Get started — State persistence / Charts | `142:14705` |
| Get started — State persistence / Table | `142:15069` |
| Get started — State persistence / Table interaction tooltip | `142:15837` |
| Get started — State persistence / Column preferences tooltip | `142:15876` |
| Get started — State persistence / Component state | `142:15219` |
| Get started — State persistence / Forms | `145:16286` |
| Page header | `1:10480` |
| Menu item (`web-menu-item` + interaction) | `1:10814` |
| Base colour table | `1:10488` |
| Tag (default) | `48:14196` |
| Tag — value with colour swatch | `58:15689` |
| Contrast | `1:10808` |
| Preview | `1:10805` |
| Components — overview landing | `152:2536` |
| Components — doc template (Design / Usage / Updates) | Design tab per component; JSON skeleton `handbook/content/design-tab/_template.designTab.json` (Button `115:606`) |
| Components — Button (Design tab) | `115:606` |
| Components — Button Design — Configuration dropdown | `239:4826` |
| Components — Button Design — Configuration canvas | `154:38773` |
| Components — Button Design — Colour canvas | `246:7974` |
| Components — Button Design — Colour table | `246:7978` |
| Components — Button anatomy figure | `153:7515` |
| Components — Button structure (Base) | `161:39626` |
| Components — Button Design — Structure table | `246:8057` |
| Components — Button Design — Size table | `251:10041` |
| Components — Button Design — Typography | `251:10769` |
| Components — Button matrix (text + label; sizes / variants / states) | `154:13254` |
| Components — Button matrix (icon-only; sizes / variants / states) | `154:13400` |
| Components — Button Design — States | `153:9515` |
| Components — Button Usage tab | `154:38298` |
| Components — Dropdown | *(TBD)* |
| Components — Radio | *(TBD)* |

Layout metrics live in `src/figma/metrics.ts`.

**Implementation process:** [FIGMA_IMPLEMENTATION.md](./FIGMA_IMPLEMENTATION.md)

## If the agent cannot read Figma

1. In Figma: **Share → Anyone with the link → can view** (no sign-in wall).
2. In Cursor: enable the **Figma MCP** plugin and authenticate.
3. Or export Dev Mode specs / PNG of each component into `handbook/figma-exports/`.

After access works, re-run a design pass to replace metrics and CSS with Dev Mode values.
