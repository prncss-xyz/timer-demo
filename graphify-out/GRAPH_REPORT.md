# GRAPH_REPORT

## Corpus Summary

- Files: 85
- Words: ~13803
- Token cost: 0 input / 0 output
- Communities: 12

## Communities

- **Project Config** (12 files) — `(root)`
- **.content-collections** (1 files) — `.content-collections`
- **Generated Content** (3 files) — `.content-collections/generated`
- **Storybook Setup** (5 files) — `.storybook`
- **public** (1 files) — `public`
- **Blog Sources** (3 files) — `sources/blog`
- **Source Root** (8 files) — `src`
- **Shared Components** (4 files) — `src/components`
- **Fixtures & Test Data** (1 files) — `src/fixtures`
- **Layouts & Markdown** (33 files) — `src/layouts`
- **Pages & Routes** (9 files) — `src/pages`
- **Utilities & Messages** (4 files) — `src/utils`

## God Nodes

1. **src/layouts/Box.tsx** — Layouts & Markdown (11 inbound, 5 outbound, 6 cross-community)
2. **src/pages/\_layout.tsx** — Pages & Routes (0 inbound, 10 outbound, 10 cross-community)
3. **src/messages.ts** — Source Root (4 inbound, 2 outbound, 6 cross-community)
4. **src/meta.ts** — Source Root (4 inbound, 1 outbound, 4 cross-community)
5. **src/pages/index.tsx** — Pages & Routes (1 inbound, 5 outbound, 6 cross-community)
6. **src/pages/blog/[slug].tsx** — Pages & Routes (1 inbound, 4 outbound, 5 cross-community)
7. **src/pages/blog/index.tsx** — Pages & Routes (1 inbound, 4 outbound, 5 cross-community)

## Surprising Connections

1. **src/layouts/images/getResponsiveImage.ts** → **src/meta.ts** (imports) — Layouts & Markdown ↔ Source Root
2. **.storybook/preview.tsx** → **src/pages/reset.css** (imports) — Storybook Setup ↔ Pages & Routes
3. **.storybook/main.ts** → **stylex.config.ts** (imports) — Storybook Setup ↔ Project Config
4. **src/a11y.spec.tsx** → **src/fixtures/a11y.ts** (imports) — Source Root ↔ Fixtures & Test Data
5. **src/pages/blog/[slug].tsx** → **.content-collections/generated/index.js** (imports) — Pages & Routes ↔ Generated Content
6. **src/pages/blog/index.tsx** → **.content-collections/generated/index.js** (imports) — Pages & Routes ↔ Generated Content
7. **src/components/Menu.tsx** → **src/layouts/Box.tsx** (imports) — Shared Components ↔ Layouts & Markdown
8. **src/components/QR.tsx** → **src/layouts/Box.tsx** (imports) — Shared Components ↔ Layouts & Markdown

## Suggested Questions

1. How do markdown blog posts flow from sources/blog into the rendered blog pages?
2. Which layout modules are shared across the main pages and the blog routes?
3. How does Storybook wire into the app’s shared components and StyleX setup?
4. Which utility modules feed the routes and interactive features?

## Notes

- Audit trail: import/link edges are marked as extracted from file contents.
- Best-effort local graph built without the packaged graphify runtime.
