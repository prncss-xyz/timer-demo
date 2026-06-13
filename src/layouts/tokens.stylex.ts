import { defineVars } from '@stylexjs/stylex'

export const colors = defineVars({
	background: 'var(--background)',
	text: 'var(--text)',
	textMuted: 'var(--text-muted)',
	primary: 'var(--primary)',
	primaryHover: 'var(--primary-hover)',
	cardBg: 'var(--card-bg)',
	border: 'var(--border)',
	btnBg: 'var(--btn-bg)',
	btnBgHover: 'var(--btn-bg-hover)',
	shadow: 'var(--shadow)',
})

export const fontFamilies = defineVars({
	base: 'nunito',
	heading: 'nunito',
})

export const fontWeights = defineVars({
	light: '300',
	normal: '400',
	semi: '600',
	bold: '700',
})

export const fontSizes = defineVars({
	1: '0.67rem',
	// small
	2: '0.83rem',
	3: '1rem',
	4: '1.17rem',
	5: '1.5rem',
	6: '2rem',
})

export const spaces = defineVars({
	none: '0px',
	1: '1px',
	2: '2px',
	3: '4px',
	4: '8px',
	5: '16px',
	6: '32px',
	7: '64px',
	8: '128px',
})

export const sizes = defineVars({
	none: '0rem',
	full: '100%',
	readable: '60ch',
	toggleButton: '38px',
	qrContainer: '16rem',
	halfScreenHeight: '50vh',
	descriptionMaxWidth: '480px',
	containerMaxWidth: '600px',
	screenHeight: '100svh',
})

export const borderRadius = defineVars({
	full: '9999px',
	circle: '50%',
})

export const borderWidth = defineVars({
	none: '0px',
	thin: '1px',
	thick: '0.25rem',
})

export const animationDurations = defineVars({
	fast: { default: '0.2s', '@media (prefers-reduced-motion: reduce)': '0s' },
	normal: { default: '0.25s', '@media (prefers-reduced-motion: reduce)': '0s' },
	slow: { default: '0.3s', '@media (prefers-reduced-motion: reduce)': '0s' },
})

export const animationTimings = defineVars({
	ease: 'ease',
	snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
})
