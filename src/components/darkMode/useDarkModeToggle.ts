import { useEffect, useState } from 'react'
export type Theme = 'light' | 'dark' | 'system'

export function useDarkModeToggle() {
	const [theme, setTheme] = useState<Theme>('system')

	useEffect(() => {
		const savedTheme = (localStorage.getItem('theme') as Theme) || 'system'
		setTheme(savedTheme)
	}, [])

	const updateTheme = (next: Theme) => {
		setTheme(next)
		localStorage.setItem('theme', next)

		const dark =
			next === 'dark' ||
			(next === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList.toggle('dark', dark)
	}

	useEffect(() => {
		if (theme !== 'system') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) => {
			document.documentElement.classList.toggle('dark', e.matches)
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [theme])

	return { theme, updateTheme }
}
