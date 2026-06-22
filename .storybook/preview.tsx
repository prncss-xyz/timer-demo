import { useEffect } from 'react'
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

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [withStyleX, withDarkMode],
}

export default preview
