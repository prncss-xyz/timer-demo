import { Suspense, useEffect } from 'react'
import type { Preview, Decorator } from '@storybook/react'

import "../src/pages/reset.css"

/** Injects the StyleX-compiled CSS into the document head. */
const withStyleX: Decorator = (Story) => {
	useEffect(() => {
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = '/virtual:stylex.css'
		document.head.appendChild(link)

		// Trigger StyleX to collect all styles from the module graph
		import(/* @vite-ignore */ "virtual:stylex:css-only")

		return () => {
			link.remove()
		}
	}, [])

	return <Story />
}

const withDarkMode: Decorator = (Story, context) => {
	const theme = context.parameters.theme as 'light' | 'dark' | 'system' | undefined

	useEffect(() => {
		const html = document.documentElement

		if (theme === 'dark') {
			html.classList.add('dark')
		} else if (theme === 'light') {
			html.classList.remove('dark')
		}
		// 'system' or undefined: don't manage, let the story component decide

		return () => {
			html.classList.remove('dark')
		}
	}, [theme])

	return <Story />
}

/**
 * Wraps every story in <Suspense> so that async (server) components
 * can render. React 19 supports async components natively when they
 * are a descendant of a Suspense boundary.
 *
 * Stories for synchronous / client-only components are unaffected;
 * they pass through Suspense synchronously.
 */
const withSuspense: Decorator = (Story) => (
	<Suspense fallback={null}>
		<Story />
	</Suspense>
)

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [withSuspense, withStyleX, withDarkMode],
}

export default preview
