import { useEffect } from 'react'

import { themeKey } from './consts'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'light' | 'dark' | 'system'

function parseDarkMode(u: string | null): Theme {
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
	const [theme, setTheme] = useLocalStorage<Theme>(themeKey, parseDarkMode)

	useEffect(() => {
		const updateClass = () => {
			const dark =
				theme === 'dark' ||
				(theme === 'system' &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
			document.documentElement.classList.toggle('dark', dark)
		}

		updateClass()

		if (theme !== 'system') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => updateClass()

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [theme])

	return { theme, updateTheme: setTheme }
}
