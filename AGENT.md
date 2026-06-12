# AI Agent Guidelines (AGENT.md)

## Commands & Tasks

- `pnpm typegen` generates route types
- `vpr staged` formats and fixes code, and runs all checks (types, linting, tests etc.)
- `pnpm check:test` runs tests

## Coding Standards & Guidelines

### CSS & Styling

Always use StyleX's API:

```tsx
import * as stylex from '@stylexjs/stylex'
import { colors } from '@/layouts/tokens.stylex'

const styles = stylex.create({
  card: {
    backgroundColor: colors.background,
    padding: '1rem',
    borderRadius: '8px',
  }
})

// Applying props
<div {...stylex.props(styles.card)}>...</div>
```

### Layout Components

Do not define raw flex/grid containers manually if the layout components in `src/layouts/Box.tsx` suffice:

- `<Col>`: Vertical flexbox layout
- `<Row>`: Horizontal flexbox layout
- `<Box>`: Standard styled div block

## Boundaries & Guardrails

- **DO NOT** use default CSS selectors or add raw styles outside of StyleX, except when defining styles in layout reset/reset.css.
- **ALWAYS** run `vpr staged` before finishing tasks to ensure styling/formatting rules are fully complied with.
