import { defineVars } from '@stylexjs/stylex'

export const animationDurations = defineVars({
	fast: { default: '0.2s', '@media (prefers-reduced-motion: reduce)': '0s' },
	normal: { default: '0.25s', '@media (prefers-reduced-motion: reduce)': '0s' },
	slow: { default: '0.3s', '@media (prefers-reduced-motion: reduce)': '0s' },
})
