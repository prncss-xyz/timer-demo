# AI Agent Guidelines (AGENT.md)

## Commands & Tasks

- `pnpm typegen` generates route types
- `vpr pre_commit` formats and fixes code, and runs all checks (types, linting, tests etc.)
- `pnpm check:test` runs tests

## Coding Standards & Guidelines

### CSS & Styling

see `/docs/stylex-authoring.md`

### Layout Components

Do not define raw flex/grid containers manually if the layout components in `src/layouts/Box.tsx` suffice:

- `<Col>`: Vertical flexbox layout
- `<Row>`: Horizontal flexbox layout
- `<Box>`: Standard styled div block

## React

We use React compiler. **NEVER** use `useMemo` or `useCallback`.

## Boundaries & Guardrails

- **DO NOT** use default CSS selectors or add raw styles outside of StyleX, except when defining styles in layout reset/reset.css.
- **ALWAYS** run `vpr staged` before finishing tasks to ensure styling/formatting rules are fully complied with.
