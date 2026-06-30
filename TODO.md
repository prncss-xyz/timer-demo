- playwright
  - make build dependent of it
  - crawl the site for accessibility (instead of hard-coded list)
- bug: css lost when reloading from non-idex page
- images
  - fetch: retry
  - pooling
  - caching (processing)
  - image in markdown
  - why sharp as an os/arch specific dependency
- tweak markdown styling
- RSS
- JSON Dump component
- bluesky comments integration
- embbed waku components in markdown
  - possibly https://github.com/remark-embedder/core
- ai: improve guidance
- backpressure
  - max length for file (chars, tokens)
  - no UUID in files
  - react compiler linting when available
  - enforce style tokens

## Reference

html styling:

- https://github.com/prncss-xyz/optics-talk/blob/main/src/components/markdown.tsx
- https://github.com/prncss-xyz/zknext/blob/main/src/theme.css.ts
