# Figma access for pixel-accurate handbook

Design file: **6kT7I28zU5LC7cedwE87Ce** (FMS Design System Handbook)

| Component | Node |
|-----------|------|
| Handbook frame | `1:10873` |
| Colour Base Frame | `1:10452` |
| Global header | `1:10878` |
| Global header bar | `1:10453` |
| Main content | `1:11212` |
| Header tabs | `1:12912` |
| Header tab | `1:12914` |
| Side menu bar (search + nav) | `1:12439` |
| Foundations side menu (Typography) | `62:21857` |
| Typography — Text Styles page | `62:21858` |
| Page header | `1:10480` |
| Menu item (`web-menu-item` + interaction) | `1:10814` |
| Base colour table | `1:10488` |
| Tag (default) | `48:14196` |
| Tag — value with colour swatch | `58:15689` |
| Contrast | `1:10808` |
| Preview | `1:10805` |

Layout metrics live in `src/figma/metrics.ts`.

**Implementation process:** [FIGMA_IMPLEMENTATION.md](./FIGMA_IMPLEMENTATION.md)

## If the agent cannot read Figma

1. In Figma: **Share → Anyone with the link → can view** (no sign-in wall).
2. In Cursor: enable the **Figma MCP** plugin and authenticate.
3. Or export Dev Mode specs / PNG of each component into `handbook/figma-exports/`.

After access works, re-run a design pass to replace metrics and CSS with Dev Mode values.
