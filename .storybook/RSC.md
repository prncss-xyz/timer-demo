# React Server Components in Storybook

This project uses [Waku](https://waku.gg/), a React Server Components
framework, with React 19. Storybook is configured with `@storybook/react-vite`
and supports RSC through React 19's built-in Suspense-based async rendering.

## How it works

React 19 allows async (server) components to render in the browser as long as
they are wrapped in a `<Suspense>` boundary. The global decorator
`withSuspense` in `.storybook/preview.tsx` wraps every story in:

```tsx
<Suspense fallback={null}>
  <Story />
</Suspense>
```

This means **async components render automatically** — no per-story boilerplate
needed.

## Writing stories for async components

Just write the story as normal. The async function will be awaited by React 19
inside the Suspense boundary:

```tsx
// components/MyServerComponent.tsx
export async function MyServerComponent({ id }: { id: string }) {
  const data = await fetchData(id)
  return <div>{data}</div>
}
```

```tsx
// components/MyServerComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyServerComponent } from './MyServerComponent'

const meta: Meta<typeof MyServerComponent> = {
  component: MyServerComponent,
}

export default meta

type Story = StoryObj<typeof MyServerComponent>

export const Default: Story = {
  args: { id: 'example' },
}
```

## Client component stories (`'use client'`)

Client components work exactly as before — no changes needed.

## Waku mock (`waku` → `.storybook/mocks/waku.tsx`)

Waku depends on `react-server-dom-webpack` which uses `__webpack_require__`
— a webpack global that Vite doesn't provide. To prevent this from breaking
Storybook, the Vite config in `main.ts` aliases `waku` to a lightweight mock
at `.storybook/mocks/waku.tsx`.

The mock provides:

- **`Link`** — renders as a plain `<a>` tag
- **`useRouter`** — returns a mock router with no-op methods
- **`Slice`** — passthrough component

Components that import from `waku` will get the mock in Storybook. The mock
exports match the real module's type signatures, so TypeScript is happy.

## Known limitations

### Router-dependent components

Components importing `useRouter` from `waku` still work — the mock returns
no-op methods — but they won't actually navigate. This is fine for visual
stories. If you need to test navigation behavior, pass a custom router mock
via a decorator.

### Server-only imports

Server components that import Node.js APIs (`fs`, `crypto`, database clients)
will fail in the browser. Either:

- **Mock the server module** using Vite aliases (same approach as the waku mock)
  in `main.ts`'s `viteFinal`.
- **Abstract the data layer** behind a boundary that can be swapped in tests.
- **Keep server-only logic** in separate modules and only import them from
  async components that you don't need in Storybook.

## Checking for issues

Run the Storybook build to verify everything compiles:

```bash
pnpm dev:storybook   # dev server
pnpm build:storybook # static build
```

## Example

See `src/components/QR.stories.tsx` — the `QRView` component renders an
async `QRCode` child that calls `qrcode.toString()`. This works in Storybook
thanks to the Suspense decorator.
