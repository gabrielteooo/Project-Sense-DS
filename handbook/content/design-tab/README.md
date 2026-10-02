# Design tab content

Component Design tabs are authored in **`content/components/<slug>.json`** under the **`designTab`** key.

See [component-doc-from-figma.md](../../docs/source/component-doc-from-figma.md) for the Figma → JSON mapping.

Interactive behaviour is **not** stored in JSON — reference **`demoId`** values defined in `src/components/design-tab/demos/designTabDemoRegistry.tsx`.
