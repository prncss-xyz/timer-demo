'use client'

import * as stylex from '@stylexjs/stylex'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

import { colors } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	container: {
		alignItems: 'center',
		display: 'inline-flex',
		backgroundColor: colors.btnBg,
		padding: '4px',
		borderRadius: '9999px',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: colors.border,
		boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
		position: 'relative',
		userSelect: 'none',
	},
	button: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
		zIndex: 2,
		height: '38px',
		width: '38px',
		borderRadius: '9999px',
		color: {
			default: colors.textMuted,
			':hover': colors.text,
		},
		cursor: 'pointer',
		outline: 'none',
		transition: 'color 0.2s ease',
	},
	activeButton: {
		color: colors.text,
	},
	indicator: {
		position: 'absolute',
		left: '4px',
		top: '4px',
		height: '38px',
		borderRadius: '9999px',
		width: '38px',
		backgroundColor: colors.cardBg,
		boxShadow: colors.shadow,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: colors.border,
		zIndex: 1,
	},
	indicatorAnimated: {
		transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
	},
	// Transforms for slide effect
	light: {
		transform: 'translateX(0px)',
	},
	dark: {
		transform: 'translateX(38px)',
	},
	system: {
		transform: 'translateX(76px)',
	},
	srOnly: {
		position: 'absolute',
		height: '1px',
		width: '1px',
		padding: '0',
		margin: '-1px',
		overflow: 'hidden',
		clip: 'rect(0, 0, 0, 0)',
		borderWidth: '0',
		whiteSpace: 'nowrap',
	},
})

export function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const savedTheme =
			(localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
		setTheme(savedTheme)
		setMounted(true)
	}, [])

	const updateTheme = (newTheme: 'light' | 'dark' | 'system') => {
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)

		const isDark =
			newTheme === 'dark' ||
			(newTheme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList.toggle('dark', isDark)
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

	return (
		<div
			{...stylex.props(styles.container)}
			role='radiogroup'
			aria-label='Choose appearance theme'
		>
			{mounted && (
				<div
					{...stylex.props(
						styles.indicator,
						styles.indicatorAnimated,
						styles[theme],
					)}
					aria-hidden='true'
				/>
			)}

			<button
				type='button'
				role='radio'
				aria-checked={mounted && theme === 'light'}
				onClick={() => updateTheme('light')}
				{...stylex.props(
					styles.button,
					mounted && theme === 'light' && styles.activeButton,
				)}
				title='Light theme'
			>
				<span {...stylex.props(styles.srOnly)}>Light theme</span>
				<FiSun size={18} />
			</button>

			<button
				type='button'
				role='radio'
				aria-checked={mounted && theme === 'dark'}
				onClick={() => updateTheme('dark')}
				{...stylex.props(
					styles.button,
					mounted && theme === 'dark' && styles.activeButton,
				)}
				title='Dark theme'
			>
				<span {...stylex.props(styles.srOnly)}>Dark theme</span>
				<FiMoon size={18} />
			</button>

			<button
				type='button'
				role='radio'
				aria-checked={mounted && theme === 'system'}
				onClick={() => updateTheme('system')}
				{...stylex.props(
					styles.button,
					mounted && theme === 'system' && styles.activeButton,
				)}
				title='System theme'
			>
				<span {...stylex.props(styles.srOnly)}>System theme</span>
				<FiMonitor size={18} />
			</button>
		</div>
	)
}
