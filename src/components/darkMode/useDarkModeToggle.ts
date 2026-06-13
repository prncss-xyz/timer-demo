import { useEffect, useState } from 'react'

import { themeKey } from './consts'

export type Theme = 'light' | 'dark' | 'system'
const init: Theme = 'system'

function parseDarkMode(u: unknown): Theme {
	switch (u) {
		case 'light':
			return 'light'
		case 'dark':
			return 'dark'
		default:
			return 'system'
	}
}

export function useDarkModeToggle() {
	const [theme, setTheme] = useState(init)

	useEffect(() => {
		setTheme(parseDarkMode(localStorage.getItem(themeKey)))
	}, [])

	const updateTheme = (next: Theme) => {
		setTheme(next)
		localStorage.setItem(themeKey, next)

		const dark =
			next === 'dark' ||
			(next === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList.toggle('dark', dark)
	}

	useEffect(() => {
		if (theme !== 'system') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) =>
			document.documentElement.classList.toggle('dark', e.matches)

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [theme])

	return { theme, updateTheme }
}
