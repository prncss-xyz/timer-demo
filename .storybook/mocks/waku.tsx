/**
 * Mock for the `waku` module used in Storybook.
 *
 * Waku depends on `react-server-dom-webpack` which references
 * `__webpack_require__` — a webpack global that doesn't exist in
 * Vite's bundler. This mock replaces the Waku client exports with
 * lightweight equivalents that work in the browser without the
 * Webpack RSC runtime.
 *
 * Components that depend on the Waku router context (useRouter)
 * will return a mock router that logs navigation attempts but
 * doesn't actually navigate.
 */

import { forwardRef, useCallback, type ReactNode } from 'react'

// ── Link ──────────────────────────────────────────────────────
// Renders a plain <a> tag. Navigation is not functional in Storybook
// since there's no Waku Router context.

export type LinkProps = {
	to: string
	children: ReactNode
	scroll?: boolean
	ref?: React.Ref<HTMLAnchorElement>
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	function Link({ to, children, scroll: _scroll, ...props }, ref) {
		return (
			<a {...props} href={to} ref={ref}>
				{children}
			</a>
		)
	},
)

// ── useRouter ─────────────────────────────────────────────────
// Returns a mock router with no-op methods.

export function useRouter() {
	const noop = useCallback(async () => {}, [])
	const noopSync = useCallback(() => {}, [])

	return {
		push: noop,
		replace: noop,
		reload: noop,
		back: noopSync,
		forward: noopSync,
		prefetch: noopSync,
		path: '/',
		query: '',
		hash: '',
		unstable_events: {
			on: noopSync,
			off: noopSync,
		},
	}
}

// ── Slice ──────────────────────────────────────────────────────

export function Slice({ children }: { children: ReactNode; id: string }) {
	return <>{children}</>
}
